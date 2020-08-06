"use strict"

const express = require('express')
const path = require('path');

const port = 3000;
const app = express();
const expressLayouts = require('express-ejs-layouts');

app.use(expressLayouts);

app.get('/:aaa', function (req, res) {
    res.send('Hello ' + req.query.name);
  })

app.listen(port, () => {
  console.log('Running at Port 3000...');
});

// 静的ファイルのルーティング
app.use(express.static(path.join(__dirname, 'public')));

// その他のリクエストに対する404エラー
app.use((req, res) => {
  res.sendStatus(404);
});
