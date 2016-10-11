var express = require('express');
var router = express.Router();
var url = require('url');

/* GET home page. */
var students = [];

for(var i = 1; i < 11; i++){
  var student = {};
  student.name = "张三"+i;
  student.age = 10+i;
  student.sex = (i%2 == 0)? "男":"女";
  student.id = i;
  students.push(student);
}
router.get('/student', function(req, res, next) {
  res.render('index', { title: 'Express',data: students});
});
router.get('/student/detail', function(req, res, next) {
  var urlObj = url.parse(req.url,true).query;
  var detailData = students[urlObj.id-1];
  res.render('detail', { title: 'Express',data: detailData});
});
router.get('/student/remove', function(req, res, next) {
  var urlObj = url.parse(req.url,true).query;
  students.splice(urlObj.id-1,1);
  console.log(students[0]);
  res.redirect('/student');
});
router.get('/student/add', function(req, res, next) {
   res.render('add', { title: 'Express'});
});
router.post('/postdata', function(req, res) {
   if(req.body.name != "" && req.body.id != ""){
     students.push(req.body);
   }
   res.redirect('/student');
});
router.get('/student/edit', function(req, res, next) {
  var urlObj = url.parse(req.url,true).query;
  var detailData = students[urlObj.id-1];
  students.splice(urlObj.id-1,1);
   res.render('edit', { title: 'Express',data: detailData});
});
router.post('/editdata', function(req, res) {
  console.log(req.body)
   if(req.body.name != "" && req.body.id != ""){
     students.unshift(req.body)
   }
   res.redirect('/student');
});
module.exports = router;
