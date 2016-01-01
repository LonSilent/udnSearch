#udnSearch
A simple search engine implemented by whoosh, nodejs

##Features
```
1. simple search
2. multiple words search (Default logic is OR)
3. logic search: AND, OR, NOT
4. simple proximity search
```
##Required packages
```
1. Install nodejs
2. Install python3 & its packages whoosh, jieba
```
##Usage
Only test in Linux/Mac
```
git clone https://github.com/LonSilent/udnSearch.git
cd udnSearch
node nodejs_backend/app.js
localhost:3000 (type in your browser)
```
It still has some problem with Windows.
##example url query
```
http://localhost:3000/api?q=客家 小吃&m=normal
http://localhost:3000/api?q=客家 小吃&m=proximity&d=3
```
