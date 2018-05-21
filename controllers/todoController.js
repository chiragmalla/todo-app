
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connect to the database

mongoose.connect('mongodb://test:test@ds129670.mlab.com:29670/todo');

//create schema - this is like a blueprint

var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);

var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app){

    app.get('/todo',function(req,res){
        Todo.find({}, function (err, data){

          if(err) throw err;
            res.render('todo',{todos: data});
        });


    });

    app.post('/todo', urlencodedParser ,function(req, res){

        var newTodo = Todo(req.body).save(function(err,data){
          if (err) throw err;
            res.json(data);
        });


    });

    app.delete('/todo/:item',function(req,res){
      Todo.find({item: req.params.item.replace(/\-/g," ")}).remove(function(err,data){
        if (err) throw err;
        res.json(data);
      });
        
    });
};
