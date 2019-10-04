import pandas as pd
f=pd.read_csv("combined_reviews.csv")
keep_col = ['user_id','book_id','review_id','rating','date_added','date_updated','read_at','started_at','n_votes','n_comments']
new_f = f[keep_col]
new_f.to_csv("Reviews_Final_without_comments.csv", index=False)