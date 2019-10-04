# This is an auto-generated Django model module.
# It can be generated from the Database schema using 'python manage.py inspectdb > models.py' command
# Reference: https://buildmedia.readthedocs.org/media/pdf/django-tastypie/latest/django-tastypie.pdf
from django.db import models

#Book_Genre_Mapping was created to normalize the database. It has mapping_id as PK, book_id as FK and genre
class BookGenreMapping(models.Model):
    book = models.ForeignKey('Books', models.DO_NOTHING, related_name='genres')
    genre = models.CharField(max_length=50)
    mapping_id = models.AutoField(primary_key=True)

    class Meta:
        managed = False
        db_table = 'Book_Genre_Mapping'

#Reviews model maps to the Book_Reviews table in the database. It review_id as PK and book_id as FK.
class Reviews(models.Model):
    user_id = models.CharField(max_length=50)
    book = models.ForeignKey('Books', models.DO_NOTHING,null = True,blank = True)
    review_id = models.CharField(primary_key=True, max_length=50)
    rating = models.CharField(max_length=50)
    date_added = models.CharField(max_length=50, blank=True, null=True)
    date_updated = models.CharField(max_length=50, blank=True, null=True)
    read_at = models.CharField(max_length=50, blank=True, null=True)
    started_at = models.CharField(max_length=50, blank=True, null=True)
    n_votes = models.CharField(max_length=50, blank=True, null=True)
    n_comments = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Book_Reviews'

#Books model maps to the Books table in the database. It has book_id as the PK.
#We have specified Genre here, so that Django understands the relationship between models
class Books(models.Model):
    isbn = models.CharField(max_length=50, blank=True, null=True)
    text_reviews_count = models.IntegerField()
    series = models.CharField(max_length=50)
    country_code = models.CharField(max_length=50)
    asin = models.CharField(max_length=50, blank=True, null=True)
    is_ebook = models.BooleanField()
    average_rating = models.FloatField()
    kindle_asin = models.CharField(max_length=50, blank=True, null=True)
    publisher = models.CharField(max_length=200, blank=True, null=True)
    num_pages = models.CharField(max_length=50, blank=True, null=True)
    publication_day = models.CharField(max_length=50, blank=True, null=True)
    isbn13 = models.CharField(max_length=50, blank=True, null=True)
    publication_month = models.CharField(max_length=50, blank=True, null=True)
    publication_year = models.CharField(max_length=50, blank=True, null=True)
    image_url = models.TextField()
    book_id = models.CharField(primary_key=True, max_length=50)
    ratings_count = models.IntegerField()
    title = models.TextField(blank=True, null=True)
    title_without_series = models.TextField(blank=True, null=True)
    genre = models.ManyToManyField(BookGenreMapping)

    class Meta:
        managed = False
        db_table = 'Books'

#Users model maps to Users table in the database. It has user_d as the PK.
class Users(models.Model):
    user_id = models.CharField(primary_key=True, max_length=50)
    first_name = models.CharField(max_length=50, blank=True, null=True)
    last_name = models.CharField(max_length=50, blank=True, null=True)
    email = models.CharField(max_length=50, blank=True, null=True)
    password = models.CharField(max_length=50)
    interest = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'Users'
