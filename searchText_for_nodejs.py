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
schema = Schema(title=TEXT(stored=True, analyzer=analyzer), 
	sub_title=TEXT(stored=True, analyzer=analyzer),
	author=TEXT(stored=True, analyzer=analyzer), 
	content=TEXT(stored=True, analyzer=analyzer))

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
	# og = qparser.OrGroup.factory(0.9)
	parser = MultifieldParser(["title", "sub_title", "author", "content"], schema=ix.schema)
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

	# sys.stdout.buffer.write(query)
	sys.stdout.buffer.write(">>>>>>OUTPUT start<<<<<<".encode('utf-8'))
	# print(query)
	results = searcher.search(query, limit=20)
	results.fragmenter.maxchars = 100
	# Show more context before and after
	results.fragmenter.surround = 40
	for result in results:

		sys.stdout.buffer.write(">>>>>> data start:".encode('utf-8'))

		sys.stdout.buffer.write(">>>>>> title start:".encode('utf-8'))
		txt = result["title"].encode('utf-8')
		sys.stdout.buffer.write(txt)
		sys.stdout.buffer.write(">>>>>> title end:".encode('utf-8'))

		sys.stdout.buffer.write(">>>>>> sub_title start:".encode('utf-8'))
		txt = result["sub_title"].encode('utf-8')
		sys.stdout.buffer.write(txt)
		sys.stdout.buffer.write(">>>>>> sub_title end:".encode('utf-8'))

		sys.stdout.buffer.write(">>>>>> author start:".encode('utf-8'))
		txt = result["author"].encode('utf-8')
		sys.stdout.buffer.write(txt)
		sys.stdout.buffer.write(">>>>>> author end:".encode('utf-8'))

		sys.stdout.buffer.write(">>>>>> content start:".encode('utf-8'))
		txt = result["content"].encode('utf-8')
		sys.stdout.buffer.write(txt)
		sys.stdout.buffer.write(">>>>>> content end:".encode('utf-8'))

		sys.stdout.buffer.write(">>>>>> highlights start:".encode('utf-8'))
		txt = result.highlights("content").encode('utf-8')
		sys.stdout.buffer.write(txt)
		sys.stdout.buffer.write(">>>>>> highlights end:".encode('utf-8'))

		sys.stdout.buffer.write(">>>>>> data end:".encode('utf-8'))
	sys.stdout.buffer.write(">>>>>>OUTPUT end<<<<<<".encode('utf-8'))
