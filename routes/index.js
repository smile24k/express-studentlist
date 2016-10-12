var express = require('express');
var router = express.Router();
var url = require('url');
var mysql = require('mysql');
var userSql = require('../read.js');
/* GET home page. */
// var students = [];

// for (var i = 1; i < 11; i++) {
//     var student = {};
//     student.name = "张三" + i;
//     student.age = 10 + i;
//     student.sex = (i % 2 == 0) ? "男" : "女";
//     student.id = i;
//     students.push(student);
// };
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'student'
});

connection.connect();
// students.forEach(function(item) {
//     var oneSql = `INSERT INTO users(name,age,sex,id) VALUES('${item.name}',${item.age},'${item.sex}',${item.id})`;
//     connection.query(oneSql, function(err, rows, fields) {
//         if (err) throw err;
//     });
// })

// connection.query('SELECT * FROM users', function(err, rows, fields) {
//     var students = rows;
//     if (err) throw err;
//     router.get('/student', function(req, res, next) {
//         res.render('index', { title: 'Express', data: students });
//     });
//     router.get('/student/detail', function(req, res, next) {
//         var urlObj = url.parse(req.url, true).query;
//         var detailData = students[urlObj.id - 1];
//         res.render('detail', { title: 'Express', data: detailData });
//     });
// });




router.get('/student', function(req, res, next) {
    connection.query(userSql.queryAll,function(err,rows,fields){
        if(err) throw err;
        var students = rows;
        res.render('index', { title: 'Express', data: students });
    })
    connection.end();
});

router.get('/student/detail', function(req, res, next) {
    var urlObj = url.parse(req.url, true).query;
    connection.query(userSql.queryAll,function(err,rows,fields){
        if(err) throw err;
        var students = rows;
        var detailData = students[urlObj.id - 1];
        res.render('detail', { title: 'Express', data: detailData });
    })
    connection.end();
});
router.get('/student/remove', function(req, res, next) {
    var urlObj = url.parse(req.url, true).query;
    console.log(urlObj.id);
    var delSql = `DELETE FROM users WHERE id = '${urlObj.id}'`;
     connection.query(delSql,function(err,rows,fields){
        if(err) throw err;
    })
    res.redirect('/student');
    connection.end();
});
router.get('/student/add', function(req, res, next) {
    res.render('add', { title: 'Express' });
});
router.post('/postdata', function(req, res) {
        if (req.body.name != "" && req.body.id != "") {
            var chanru = `INSERT INTO users(name,age,sex,id) VALUES('${req.body.name}',${req.body.age},'${req.body.sex}',${req.body.id})`;
            connection.query(chanru,function(err,rows,fields){
            if(err) throw err;
            
        })
    }
    res.redirect('/student');
    connection.end();
});
router.get('/student/edit', function(req, res, next) {
    var urlObj = url.parse(req.url, true).query;
    connection.query(userSql.queryAll,function(err,rows,fields){
        if(err) throw err;
        var students = rows;
        var detailData = students[urlObj.id - 1];
        res.render('edit', { title: 'Express', data: detailData });
    })
    connection.end();
});
// router.post('/editdata', function(req, res) {
//     console.log(req.body)
//     if (req.body.name != "" && req.body.id != "") {
//         students.unshift(req.body)
//     }
//     res.redirect('/student');
// });
module.exports = router;
