// require express and other modules
const express = require('express');
const app = express();

// parse incoming urlencoded form data
// and populate the req.body object
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/

const db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

//Show all
app.get('/api/cards', (req, res) => {
  db.Card.find((err,cards)=>{
    if(err){console.log(err)}
    res.json({data:cards});
  })
});

//Show one
app.get('/api/cards/:id', (req, res) => {
  let cardId = req.params.id
  db.Card.findOne({_id: cardId},(err,cards)=>{
    if(err){console.log(err)}
    res.json({data:cards});
  })
});

//Create one
app.post('/api/cards', (req, res) => {
  // create a temp variable with form data (`req.body`)
  var newCard = new db.Card({
    cardType: req.body.cardType,
    name: req.body.name,
    type: req.body.type,
    Attribute: req.body.Attribute,
  })
  // create new todo in db
  db.Card.create(newCard, (err, savedCard) => {
      if(err) { return console.log(err) }
      console.log("saved new cards: ", savedCard.name);
      res.json({data:savedCard});  
  });
});

//Update
app.put("/api/cards/:id", (req,res)=>{
  let cardToUpdateId = req.params.id;
  console.log(req.body);
  
  let newCard = req.body
  db.Card.findOneAndUpdate(
    {_id: cardToUpdateId},
    newCard,
    {new:true},(err,updatedCard)=>{
      if (err){return console.log(err)}
      res.json({data:updatedCard});
    });
});

app.delete('/api/cards/:id', (req, res) => {
  let cardId = req.params.id
  db.Card.deleteOne({ _id: cardId }, (err,deletedCard)=>{
    if(err){console.log(err)}
    res.json({data: deletedCard})
  });
});

/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000);
