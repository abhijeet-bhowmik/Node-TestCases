router = require('express').Router();



router
.get('/', function(req, res, next) {
  connection.query("SELECT * FROM books", function(err, result){
    console.log(err);
    res.json({data : result, error : err});
  });
})
.get('/:id', function(req, res, next) {
  connection.query("SELECT * FROM books where id = ?", [req.params.id], function(err, result){
    res.json({data : result , error : err});
  });
})
.put('/', function(req, res, next) {
  let query = `INSERT INTO books VALUES("${req.body.id}","${req.body.name}",${req.body.price})`;
  connection.query(query, function(err, result){
    res.json({response : result , error : err});
  })
})
.delete('/', function(req, res, next) {
  res.end("Will delete all the books");
})
.delete('/:id', function(req, res, next) {
  let query = `DELETE FROM books WHERE id='${req.params.id}'`;
  connection.query(query, function(err, result){
    res.json({response : result , error : err});
  });
})



module.exports = router;
