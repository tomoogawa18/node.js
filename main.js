"use strict"

const express = require('express')
const path = require('path');

const port = 3000;
const app = express();

app.get("");

app.listen(port, () => {
  console.log('Running at Port 3000...');
});

// 静的ファイルのルーティング
app.use(express.static(path.join(__dirname, 'public')));å

// その他のリクエストに対する404エラー
app.use((req, res) => {
  res.sendStatus(404);
});
