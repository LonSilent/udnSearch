from whoosh.filedb.filestore import FileStorage
from whoosh.index import create_in,open_dir
from whoosh.fields import *  
from whoosh.qparser import QueryParser
from whoosh.qparser import MultifieldParser
import whoosh.qparser as qparser
import chinese
import os, glob, codecs
import csv

csv.field_size_limit(sys.maxsize)

analyzer= chinese.ChineseAnalyzer() 
schema = Schema(title=TEXT(stored=True), sub_title=TEXT(stored=True),
	author=TEXT(stored=True), content=TEXT(stored=True, analyzer=analyzer))

storage = FileStorage("indexdir")
ix = storage.create_index(schema)
writer = ix.writer()

# add index

count = 0 

url_list = []

allFile = []
allFile = glob.glob('*.csv')
print(allFile)
for file in allFile:
	print(file)
	with open(file, newline='') as csvfile:
		csvreader = list(csv.reader(csvfile))
		for row in csvreader:
			title = row[0]
			content = row[9]
			sub_title = row[1]
			author = row[3]
			if(row[1] in url_list):
				pass
			else:
				url_list.append(row[1])
				writer.add_document(title=title, sub_title=sub_title,
				author=author,content=content)
			count+=1
			if(count%1000 == 0):
				print(count)
		del url_list[:]
		count = 0
# for path in allDir:
# 	os.chdir(path)
# 	allFile = glob.glob('*.txt')
# 	for everyFile in allFile:
# 		if(everyFile[0] == 's'):
# 			print(everyFile)
# 			f = codecs.open(everyFile,'r','utf-8')
# 			title = f.readline().replace('\n','')
# 			sub_title = f.readline().replace('\n','')
# 			author = f.readline().replace('\n','')
# 			content = f.readline().replace('\n','')
# 			writer.add_document(title=title, sub_title=sub_title,
# 				author=author,content=content)
# 	os.chdir('../')
print("finish")
writer.commit()