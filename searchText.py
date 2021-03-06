# -*- coding: UTF-8 -*-

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
ix = storage.open_index()
writer = ix.writer()

string = "桐花 樂團"
normal = False

with ix.searcher() as searcher:
	# og = qparser.OrGroup.factory(0.9)
	parser = MultifieldParser(["title","sub_title","author","content"], schema=ix.schema)
	# parser = qparser.QueryParser("content", ix.schema)
	parser.remove_plugin_class(qparser.PhrasePlugin)
	parser.add_plugin(qparser.SequencePlugin())

	if (normal):
		query = parser.parse(string)
	else:
		# proximity
		distance = 50
		proximty_query = "\"" + string + "\"" + '~' + str((1+distance)*3)
		query = parser.parse(proximty_query)

	print(query)
	results = searcher.search(query)
	# Allow larger fragments
	results.fragmenter.maxchars = 100
	# Show more context before and after
	results.fragmenter.surround = 30
	for result in results:
		print(result["title"])
		print(result.highlights("content"))	
