import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

var app = express();

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({extended: true, limit: '100mb'}));
app.use(bodyParser.json());

app.get('*', function(req, res, next) {
    res.redirect('/');
});

app.listen('1114', () => {
    console.log('App listen on 1114');
});