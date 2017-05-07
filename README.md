# udnSearch
A simple search engine implemented by whoosh, nodejs

## Features
```
1. simple search
2. multiple words search (Default logic is AND)
3. logic search: AND, OR, NOT
4. simple proximity search
```
## Required packages
```
1. Install nodejs
2. Install python3 & its packages whoosh, jieba
```
## Usage
### you should copy your corpus to the directory, and modify/run the createIndex.py to index documents.
Run in Linux/Mac
```
git clone https://github.com/LonSilent/udnSearch.git
cd udnSearch/nodejs_backend
npm install
cd ..
python3 createIndex.py (you may modify first)
node nodejs_backend/app.js
localhost:3000 (type in your browser)
```
If you run in Windows...(not recommended), change line 21 in api.js to 
```
var command = ['python', path.resolve(__dirname, '../searchText_for_nodejs.py'), '\"' + query + '\"', mode, distance].join(' ');
```
and change every '\n' to '\r\n' in stdout2json.js.
## example url query
```
http://localhost:3000/api?q=客家 小吃&m=normal
http://localhost:3000/api?q=客家 小吃&m=proximity&d=3
```
