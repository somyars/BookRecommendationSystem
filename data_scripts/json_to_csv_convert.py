import simplejson
import json
import csv

# Reference https://coderwall.com/p/xdonta/how-to-convert-json-to-csv-excel
# Contains the output json file
resultfile = open('Books.csv', 'wt', encoding='utf-8')
csvwriter = csv.writer(resultfile)

i=0
data = []
with open('goodreads_books.json', encoding ='utf-8') as f:
    for line in f:
        j=json.loads(line)	
        if i == 0:
	        header = j.keys()
	        csvwriter.writerow(header)
        csvwriter.writerow(j.values())
        print (i)
        i=i+1	

resultfile.close()