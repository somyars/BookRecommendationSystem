import pandas as pd
csv_input = pd.read_csv('books_romance_json.csv')
csv_input['genre'] = 'Romance'
csv_input.to_csv('books_romance_json-output.csv', index=False)