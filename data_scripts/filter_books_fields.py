import pandas as pd
f=pd.read_csv("combined_books.csv")
keep_col = ['isbn','text_reviews_count','series','country_code','asin','is_ebook','average_rating','kindle_asin','publisher','num_pages','publication_day','isbn13','publication_month','publication_year','image_url','book_id','ratings_count','title','title_without_series','genre']
new_f = f[keep_col]
new_f.to_csv("Books_Final.csv", index=False)