const express = require("express")
const app = express();
const quoteReaderCSV = require("./modules/QuoteReader");
const bodyParser = require("body-parser");

// const quotes = require("./quotes.json");
const port = process.env.port || 8080;
const quotesFileName = "./Quotes.csv";
//quotes from https://github.com/akhiltak/inspirational-quotes

const router = express.Router();

app.use(bodyParser.json());
app.use("/api/inspire", router);


var quotes = null;

router.get("/", (req, res) => {
    res.redirect("quote");
});

router.get("/quote", (req, res) => {
    res.json(quotes[Math.floor((Math.random()*quotes.length)+1)]);
});

router.get("/quote/:id", (req, res) => {
    
    if(!/^\d+$/.test(req.params.id)){
        return res.status(400).send("The id must be an integer.");
    };

    const quotesId = parseInt(req.params.id);
    
    let quote = quotes.filter((q) => q.id === quotesId)[0];

    if(!quote){
        return res.status(404).send("A quote with that id does not exist");
    }

    res.json(quote);
})

router.post("/", (req, res) => {
    res.redirect("quote");
});

router.post("/quote", (req, res) => {
    console.log(req.body);

    if(!req.body.quote || !req.body.author) return res.status(500).send("Empty request fields");

    let quote = {
        id : quotes.length + 1,
        quote : req.body.quote,
        author : req.body.author,
    };

    quotes.push(quote);

    res.json(quote);
}); 


router.put("/quote", (req, res) => {
    if(!req.body) return res.status(400).send("No request body");

    if(!req.body.id ||
        !req.body.quote ||
        !req.body.author) 
        return res.status(500).send("Empty request fields");

    if(req.body.id < 1 || 
        req.body.id > quotes.length) return res.status(500).send("id out of bounds");

    const new_quote = quotes[parseInt(req.body.id)-1];

    new_quote.quote = req.body.quote;
    new_quote.author = req.body.author;

    res.json(new_quote);
});


router.delete("/quote/:id", (req, res) => {
    if(!req.params.id) return res.status(404).send("Please include a quote id");

    if(!quotes[parseInt(req.params.id)-1]){
        return res.status(404).send("A quote with that id does not exist");
    }

    const quote = quotes[parseInt(req.params.id)-1];
    quotes.splice(parseInt(req.params.id)-1,1);

    res.json(quote);

});

app.listen(port, () => {
    console.log("API now listening");
    quoteReaderCSV.GetQuotesFromCSV(quotesFileName).then((returnedQuotes) => {
        quotes = returnedQuotes;
    })
    .catch((err) => {
        console.log(`error in opening quotes file - ${err}`);
    });
});

