const express = require('express');
const cookieSession = require('cookie-session');
var app = express();

var list = ["Faire les courses", "Nourrir le chat",
          "Arroser les plantes"];

app.use(cookieSession({
  nam: 'session',
  keys: ['key1','key2'] // Meaning unsure..
}));
//app.use(session({secret: 'todotopsecret'}));

// Set view engine to ejs.
app.set("view engine", "ejs");

app.get('/', function(req, res) {
  if(isNaN(req.session.list)){
    req.session.list = list;
  }
  let currentList = req.session.list;
  res.render('list',{
    list: currentList
  });
});

app.get('/add', function(req, res) {
  var devoir = req.query.todo;  // Note query!
  req.session.list.push(devoir);
  res.render('list',{
    list: req.session.list
  });
});

app.get('/remove', function(req, res) {
  var id = req.query.id;  // Note query!
  console.log("id= "+id);
  req.session.list.splice(id, 1);
  res.render('list',{
    list: req.session.list
  });
});

// ... Tout le code de gestion des routes (app.get) se trouve au-dessus
/*app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/html');
    res.status(404).send('Page introuvable !');
});*/

app.use(function(req, res, next){
    res.redirect('/');
});


app.listen(8081);
