const express = require("express")
const app = express();
const lineReader = require("line-reader");

// const quotes = require("./quotes.json");
const port = process.env.port || 8080;
const quotesFileName = "./Quotes.csv";
//quotes from https://github.com/akhiltak/inspirational-quotes

app.use(express.json());
var quotes = null;

const getQuotes = (quotesFileName) => {
    return new Promise((resolve, reject) => {

        let quotesList = new Array();
        let i = 1;

        lineReader.eachLine(quotesFileName, (line, last) => {
                    line = line.split(";",3);
                    if (line[2]=="motivational") quotesList.push({ id: i, quote : line[0], author : line[1]});
                    i++;
        }, ((err) => {
            if(err) reject(err);
            console.log("quotes loaded - done!");
            })
        );

        resolve(quotesList);
    });
};

app.get("/", (req, res) => {
    res.redirect("/quote");
});

app.get("/quote", (req, res) => {
//    console.log(quotes);
    res.json(quotes[Math.floor((Math.random()*quotes.length)+1)]);
});

app.post("/", (req, res) => {
    res.redirect("/quote");
});

app.post("/quote", (req, res) => {

    console.log(req.body);

    if(!req.body.quote || !req.body.author) return res.status(500).send("Empty request fields");

    let quote = {
        id : quotes.quotes.length + 1,
        quote : req.body.quote,
        author : req.body.author,
    };

    quotes.quotes.push(quote);
    
    console.log(quotes.quotes);
    res.json(quote);
}); 

app.put("/quote", (req, res) => {


    if(!req.body.id ||
        !req.body.quote ||
        !req.body.author) 
        return res.status(500).send("Empty request fields");

    if(req.body.id < 1 || 
        req.body.id > quotes.quotes.length) return res.status(500).send("id out of bounds");

    const new_quote = quotes.quotes[parseInt(req.body.id)-1];


    new_quote.quote = req.body.quote;
    new_quote.author = req.body.author;

    res.json(new_quote);

});

app.delete("/quote/:id", (req, res) => {
    if(!req.params.id) return res.status(404).send("Please include a quote id");

    if(!quotes[parseInt(req.params.id)-1]){
        return res.status(404).send("A quote with that id does not exist");
    }

    const quote = quotes[parseInt(req.params.id)-1];
    quotes.splice(parseInt(req.params.id)-1,1);
    console.log(quotes.quotes);

    res.json(quote);

});

app.listen(port, () => {
    console.log("API now listening");
    getQuotes(quotesFileName).then((returnedQuotes) => {
        quotes = returnedQuotes;
    })
    .catch((err) => {
        console.log(`error in opening quotes file - ${err}`);
    });
});

