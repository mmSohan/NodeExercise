var http = require('http');
var express = require('express');
var app = express();
var server = http.Server(app);
var bodyParser = require('body-parser');
var mongoose =  require('mongoose')
let articles = [];

var db,url = "mongodb+srv://sohanUser:masbahul12345@cluster0-yjzcp.mongodb.net/test?retryWrites=true&w=majority"

mongoose.connect(url,
  {useNewUrlParser:true, useUnifiedTopology:true})
  mongoose.connection.on('error', function(){
    console.log('Could not connect to MongoDB')
  })

var articleSchema = new mongoose.Schema(
  {
    title: {
      type : String,
      required: "Title is required"
    },
    content: {
      type: String,
      required: "Content is required"
    }
  }
)
var Article = mongoose.model('Article', articleSchema)

//mongo.MongoClient.connect(url,
  
  //{userNewUrlParse:true, useUnifiedTopology:true},

  //function(err, clientnode){
    //if(err){
      //console.log('Could not connect to MongoDb')
    //}
    //else{
    //  db = client.db('node-cw9')
    //}

  //})


var save = function(form_data){
  db.createCollection('articles', function(err, collection){
    var collection = db.collection('articles')
    collection.save(form_data);

  })


}

app.use(bodyParser.urlencoded({extended:true}));

app.post('/new_article', function(request, response){

  //save(request.body)
  let article = new Article(request.body)
  article.save(function(err, data){
    if(err){
      response.status(400).json({msg: "all fields are required"})
    }
    response.status(200).json({article:data})
  })
  //articles.push(request.body);
  //console.log(articles);
  response.json({msg: "Successfully recieved"});
})

app.get('/article/:index', function(request, response){
  if(articles[request.params.index]){
    response.render('article.ejs',{
     article:articles[request.params.index] 
    })
  }
  else{
    response.json({msg:"Article not found"});
  }


})


app.get('/',function(request,response){
  response.sendFile(__dirname+'/views/index.html');
});


app.get('/second',function(request,response){
  response.sendFile(__dirname+'/views/index_2.html')
});

app.get('/new_article',function(request,response){
  response.sendFile(__dirname+'/views/form.html');
});

server.listen(3000, 'localhost', function(){
  console.log('Server running');
});
