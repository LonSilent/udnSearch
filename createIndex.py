from whoosh.filedb.filestore import FileStorage
from whoosh.index import create_in,open_dir
from whoosh.fields import *  
from whoosh.qparser import QueryParser
from whoosh.qparser import MultifieldParser
import whoosh.qparser as qparser
import chinese
import os, glob, codecs

analyzer= chinese.ChineseAnalyzer() 
schema = Schema(title=TEXT(stored=True), sub_title=TEXT(stored=True),
	author=TEXT(stored=True), content=TEXT(stored=True, analyzer=analyzer))

storage = FileStorage("indexdir")
ix = storage.create_index(schema)
writer = ix.writer()

# add index

allFile = []
os.chdir('source')
allDir = glob.glob('*')

for path in allDir:
	os.chdir(path)
	allFile = glob.glob('*.txt')
	for everyFile in allFile:
		if(everyFile[0] == 's'):
			f = codecs.open(everyFile,'r','utf-8')
			title = f.readline().replace('\n','')
			sub_title = f.readline().replace('\n','')
			author = f.readline().replace('\n','')
			content = f.readline().replace('\n','')
			writer.add_document(title=title, sub_title=sub_title,
				author=author,content=content)
	os.chdir('../')
os.chdir('../')
writer.commit()
