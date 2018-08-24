// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

const db = require('./models');

const cards = [
    {
        cardType:"monster",
        name: "Blue Eyes White Dragon",
        type: "Dragon",
        Attribute: "Light",
        image:""
    },
    {
        cardType:"monster",
        name: "Black Magician",
        type: "SpellCaster",
        Attribute: "Dark",
        image:""
    },
    {
        cardType:"Spell",
        name: "ScapeGoats",
        type: "",
        Attribute: "",
        image:""
    },
    {
        cardType: "Trap",
        name: "Escalation fo the Monarchs",
        type: "",
        Attribute: "",
        image:""
    },
    {
        cardType: "monster",
        name: "Ancient Gear Golem",
        type: "Machine",
        Attribute: "Earth",
        image:""
    },
    {
        cardType: "monster",
        name: "Ash Blossom and Joyous Spring",
        type: "Zombie",
        Attribute: "Light",
        image:""
    }
];

db.Card.deleteMany( {}, (err, card) => {
    if (err){
        console.log(err);
    } 
    console.log('removed all cards from data base');
    db.Card.create(cards, (err, cards) => {
        if (err){return console.log("Error:", err);}
        console.log("Created", cards.length , "cards");
        process.exit(); // we're all done! Exit the program.
    });
})