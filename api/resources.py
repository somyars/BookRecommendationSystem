# RESTful API need resources, hence Tastypie creates resources classes. 
# These classes are subclass of ModelResource. 
# Class Meta is defined inside the resource to specify : allowed_methods, queryset, resource_name, filtering, ordering, authorization, etc.
# Reference: https://buildmedia.readthedocs.org/media/pdf/django-tastypie/latest/django-tastypie.pdf
from tastypie.resources import ModelResource
from api.models import Books, Users, Reviews, BookGenreMapping
import django_filters
from tastypie.authorization import Authorization
from tastypie.resources import ALL, ALL_WITH_RELATIONS
from tastypie.fields import ForeignKey, ToManyField, ToOneField

# Resource class BookGenreMappingResource is created specifying filter by genre as allowed
class BookGenreMappingResource(ModelResource):
    fields = ['genre','book_id']
    class Meta:
        allowed_methods = ['get']
        queryset = BookGenreMapping.objects.all()
        excludes = ['mapping_id']
        resource_name = 'mapping'
        filtering = {
            'genre' : ALL_WITH_RELATIONS	
        }
    def filter_data_items(bundle):
        res = DataResource()
        new_bundle = Bundle(request=bundle.request)
        objs = res.obj_get_list(new_bundle)
        return objs.filter(parent_id=bundle.obj.pk)
    def dehydrate(self, bundle):
        return bundle

# Resource class BookResource is created specifying the filtering and ordering fields which are required
# This resource maps to BookGenreMappingResource to fetch the corresponding genre
class BookResource(ModelResource):
    genres = ToManyField('api.resources.BookGenreMappingResource', 'genres', full=True)
    class Meta:
        queryset = Books.objects.all().exclude(image_url="https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png")
        resource_name = 'books'
        allowed_methods = ['get']
        ordering =	['average_rating','ratings_count','publication_year','publication_month']
        filtering = {
			'average_rating' : ALL,
            'genres' : ALL_WITH_RELATIONS,
			'publication_year' : ALL,
			'title' : ALL
        }
    def get_object_list(self, request):
        results = super(BookResource, self).get_object_list(request)
        return results
    def dehydrate(self, bundle):
        return bundle	

# UserResource is created with authorization for a POST and GET
class UserResource(ModelResource):
    class Meta:
        allowed_methods = ['get', 'post']
        authorization = Authorization()
        queryset = Users.objects.all()
        filtering = {
			'email' : ALL,
            'password' : ALL
        }
        resource_name = 'users'

# ReveiwsResource is created with authorization for a POST and GET. It maps to BookResource to fetch Book inforamation.
class ReviewsResource(ModelResource):
    book = ForeignKey(BookResource, 'book', full= True, null=True)
    class Meta:
        allowed_methods = ['get', 'post']
        authorization = Authorization()
        queryset = Reviews.objects.all()
        resource_name = 'reviews'
    def obj_create(self, bundle, **kwargs):
        print (bundle.data)
        return super(ReviewsResource, self).obj_create(bundle, **kwargs)

# This Resouce is used for the personalized recommendation. 
# It uses numpy libraries to perform item-based collaborative filtering.
# Reference link for recommendation engine: https://medium.com/sfu-big-data/recommendation-systems-user-based-collaborative-filtering-using-n-nearest-neighbors-bf7361dc24e0
class RecommendationResource(ModelResource):
    print("I am called")
    class Meta:
        queryset = Books.objects.all()
        resource_name = 'recommend'
    def get_object_list(self, request):
        def recommendBooks(id):
            import numpy as np
            import pandas as pd
            import matplotlib.pyplot as plt
            from sklearn.metrics import pairwise_distances
            from sklearn.metrics.pairwise import cosine_similarity
            books = pd.DataFrame(list(Books.objects.all()))
            reviews = pd.DataFrame(list(Reviews.objects.all()))
            #books = pd.read_csv('C:/Users/Somya Sharma/notable_django/Dataset_Books_new.csv', encoding='latin-1')
            #reviews = pd.read_csv('C:/Users/Somya Sharma/notable_django/Dataset_Reviews_new.csv', encoding='latin-1')
            #Considering only the books that have been rated atleast 200 times
            books_1 = books[books['ratings_count'] > 200]
            # Considering only the books with avg rating greater than or equal to 4.5
            books_2 = books_1[books_1['average_rating'] >= 4.5]
            reviews_new = reviews[reviews.book_id.isin(books_2.book_id)]
            #Will recommend the books only to the users who have rated at least two books
            counts1 = reviews_new['user_id'].value_counts()
            reviews_3 = reviews_new[reviews_new['user_id'].isin(counts1[counts1 >= 2].index)]
            ratings_matrix = reviews_3.pivot(index='user_id', columns='book_id', values='rating')
            user_id = ratings_matrix.index
            book_id = ratings_matrix.columns
            final_ratings = ratings_matrix.fillna(ratings_matrix.mean(axis=0))
            #finding similarity between the users based on ratings using cosine similarity
            cosine = cosine_similarity(final_ratings)
            np.fill_diagonal(cosine, 0)
            similarity_with_book = pd.DataFrame(cosine, index=final_ratings.index)
            similarity_with_book.columns = final_ratings.index
            # Function to find and return k neighbors based on the similarity score
            def find_n_neighbours(df, n):
                order = np.argsort(df.values, axis=1)[:, :n]
                df = df.apply(lambda x: pd.Series(x.sort_values(ascending=False)
                                          .iloc[:n].index,
                index=['top{}'.format(i) for i in range(1, n + 1)]), axis=1)
                return df
            Mean = reviews_3.groupby(by="user_id", as_index=False)['rating'].mean()
            reviews_3 = reviews_3.astype({"book_id": str})
            book_user = reviews_3.groupby(by='user_id')['book_id'].apply(lambda x: ','.join(x))
            #Function to recommend books by similar users using content based collaborative filtering
            def Recommend_books(user):
                Books_read_by_user = ratings_matrix.columns[ratings_matrix[ratings_matrix.index == user].notna().any()].tolist()
                # Finding similar users based on similarity score
                user_closest_neighbours = similarity_with_book.loc[similarity_with_book.index.isin([user])]
                sim_user_50_m = find_n_neighbours(user_closest_neighbours, 10)
                a = sim_user_50_m[sim_user_50_m.index == user].values
                b = a.squeeze().tolist()
                d = book_user[book_user.index.isin(b)]
                l = ','.join(d.values)
                # List of books read by similar users
                Books_read_by_similar_users = l.split(',')
                # Finding the books that not read by the user but similar users
                Books_under_consideration = list(set(Books_read_by_similar_users) - set(list(map(str, Books_read_by_user))))
                Books_under_consideration = list(map(int, Books_under_consideration))
                score = []
                for item in Books_under_consideration:
                    c = final_ratings.loc[:, item]
                    d = c[c.index.isin(b)]
                    f = d[d.notnull()]
                    avg_user = Mean.loc[Mean['user_id'] == user, 'rating'].values[0]
                    index = f.index.values.squeeze().tolist()
                    corr = similarity_with_book.loc[user, index]
                    fin = pd.concat([f, corr], axis=1)
                    fin.columns = ['agg_score', 'correlation']
                    fin['score'] = fin.apply(lambda x: x['agg_score'] * x['correlation'], axis=1)
                    nume = fin['score'].sum()
                    deno = fin['correlation'].sum()
                    final_score = avg_user + (nume / deno)
                    score.append(final_score)
                data = pd.DataFrame({'book_id': Books_under_consideration, 'score': score})
                # finding and sorting the top rated books by similar users
                top_10_recommendations = data.sort_values(by='score', ascending=False).head(10)
                Book_Name = top_10_recommendations.merge(books_2, how='inner', on='book_id')
                Book_Names = Book_Name.book_id.values.tolist()
                # returning the Book Ids 
                return list(set(Book_Names))
            predicted_books = Recommend_books(id)
            return predicted_books
        results = super(RecommendationResource, self).get_object_list(request).filter(book_id__in=recommendBooks(request.GET['user_id'])).exclude(image_url="https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png")
        return results



