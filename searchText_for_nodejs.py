# -*- coding: UTF-8 -*-

from whoosh.filedb.filestore import FileStorage
from whoosh.index import create_in, open_dir
from whoosh.fields import *
from whoosh.qparser import QueryParser
from whoosh.qparser import MultifieldParser
import whoosh.qparser as qparser
import chinese
import os, glob, codecs, sys

analyzer = chinese.ChineseAnalyzer()
schema = Schema(title=TEXT(stored=True), sub_title=TEXT(stored=True),
	author=TEXT(stored=True), content=TEXT(stored=True, analyzer=analyzer))

storage = FileStorage("indexdir")
ix = storage.open_index()
writer = ix.writer()

_string = sys.argv[1]
_mode = sys.argv[2]
normal = (_mode == "normal")

_distance = 0
if(normal is False):
	_distance = int(sys.argv[3])

with ix.searcher() as searcher:
	og = qparser.OrGroup.factory(0.9)
	parser = MultifieldParser(["title", "sub_title", "author", "content"], schema=ix.schema, group=og)
	# parser = qparser.QueryParser("content", ix.schema)
	parser.remove_plugin_class(qparser.PhrasePlugin)
	parser.add_plugin(qparser.SequencePlugin())

	if (normal):
		string = _string
		query = parser.parse(string)
	else:
		# proximity
		distance = _distance
		proximty_query = "\"" + _string + "\"" + '~' + str((1+distance)*3)
		query = parser.parse(proximty_query)

	print(query)
	print(">>>>>>OUTPUT start<<<<<<")
	results = searcher.search(query)
	for result in results:
		print(">>>>>> data start:")

		print(">>>>>> title start:")
		print(result["title"])
		print(">>>>>> title end:")

		print(">>>>>> sub_title start:")
		print(result["sub_title"])
		print(">>>>>> sub_title end:")

		print(">>>>>> author start:")
		print(result["author"])
		print(">>>>>> author end:")

		print(">>>>>> content start:")
		print(result["content"])
		print(">>>>>> content end:")

		print(">>>>>> data end:")
	print(">>>>>>OUTPUT end<<<<<<")
