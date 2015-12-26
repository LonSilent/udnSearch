import jieba
import os
import codecs
import glob

# os.chdir('source/201202/')
os.chdir('source')
allFile = []
result = []
segList = []
temp = []
i = 0

allDir = glob.glob('*')
for path in allDir:
	os.chdir(path)
	allFile = glob.glob('*.txt')
	# print(allFile)
	for everyFile in allFile:
		if(everyFile[0]=='聯'):
			# print(everyFile)
			f = codecs.open(everyFile,'r','utf-8')
			for line in codecs.open(everyFile):
				line = f.readline()
				line = line.replace('\r\n','').replace('\n','')
				result.append(line)
			w = codecs.open('seg_' + everyFile,'w')
			w.write(result[0]+'\n')
			w.write(result[1]+'\n')
			w.write(result[4]+'\n')
			while(i<len(result)):
				w.write(result[i])
				i += 1
			# for sentence in result:
			# 	if(len(sentence) > 0):
			# 		seg_list = jieba.cut(sentence, cut_all=False)
			# 		temp.append ("".join(seg_list))	
			# for seg in temp:
			# 	w.write(seg)
			f.close()
			w.close()
			i=6
			del result[:]
			del temp[:]	
	os.chdir('../')

# f = codecs.open('聯20120701.txt','r','utf-8')

# for line in codecs.open('聯20120701.txt'):
# 	line = f.readline()
# 	line = line.replace('\r\n','')
# 	result.append(line)

# print(result)
# for sentence in result:
# 	if(len(sentence) > 0):
# 		seg_list = jieba.cut(sentence, cut_all=False)
# 		temp.append (" ".join(seg_list))

# w = codecs.open('test.txt','w')
# for seg in temp:
# 	print(seg)
# 	w.write(seg+' ')

# w.close()