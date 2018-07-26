//process.env.NODE_ENV = 'test';
let books = require('../seed/books.js');
let server = require('../app.js');
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();



chai.use(chaiHttp);

describe('Testing /books route', () => {
  beforeEach(function(done){
    databasePopulator(() => { done(); });
  });
  afterEach(function(done){
    databaseDepopulator(() => { done(); });
  });
  describe('/GET books', ()=>{
    it('it should respond with all books', (done)=>{
      chai.request(server)
        .get('/books')
        .end((err, res)=>{
          res.should.have.status(200);
          res.body.should.have.property('data');
          res.body.data.should.be.a('array');
        done();
        });
      });
    it('it should respond with one book', (done) => {
      chai.request(server)
        .get('/books/1908')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data[0].should.have.property('id');
          res.body.data[0].should.have.property('name');
          res.body.data[0].should.have.property('price');
          res.body.data[0].id.should.equal('1908');
          res.body.data[0].name.should.equal('The Alchemist');
          done();
        });
    });
  });

  describe('/PUT books', () => {
    it('it should respond with success', (done) => {
      let body = {
                   "id" : "1234" ,
                   "name" : "Sample Book" ,
                   "price" : "10"
                 }
      chai.request(server)
        .put('/books')
        .send(body)
        .end((err,res) => {
          res.body.response.should.be.a('object');
          res.body.should.have.property('response');
          res.body.should.have.property('error');
          res.body.error.should.equal('');
        });
        done();
    });
  });

  describe('/DELETE', () => {
    it('it should respond with success', (done) => {

      chai.request(server)
      .delete('/books/1234')
      .end((err, res) => {
        res.body.response.should.be.a('object');
        res.body.should.have.property('response');
        res.body.should,have.property('error');
        res.body.error.should.equal('');
      });
      done();
    });
  });

})

let databasePopulator = function(done){
  for( var i = 0 ; i < books.length ; i++){
    query = `INSERT INTO books VALUES("${books[i].id}","${books[i].name}", "${books[i].price}")`;
    connection.query(query, (err, result) => {
    });
  }
  done();
}


let databaseDepopulator = function(done){
  query = 'DELETE FROM books';
  connection.query(query,(err, result) => {});
  done();
}


