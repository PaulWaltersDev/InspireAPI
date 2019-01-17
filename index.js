const express = require("express")
const app = express();

const quotes = require("./quotes.json");
const port = process.env.port || 8080;

app.use(express.json());

app.get("/", (req, res) => {
    res.redirect("/quote");
});

app.get("/quote", (req, res) => {
    res.json(quotes.quotes[Math.floor((Math.random()*3)+1)]);
});

app.post("/", (req, res) => {
    res.redirect("/quote");
});

app.post("/quote", (req, res) => {

    console.log(req.body);

    if(!req.body.quote || !req.body.author || !req.body.publication) return res.status(500).send("Empty request fields");

    let quote = {
        id : quotes.quotes.length + 1,
        quote : req.body.quote,
        author : req.body.author,
        publication : req.body.publication
    };

    quotes.quotes.push(quote);
    
    console.log(quotes.quotes);
    res.json(quote);
}); 

app.put("/quote", (req, res) => {


    if(!req.body.id ||
        !req.body.quote ||
        !req.body.author ||
        !req.body.publication) return res.status(500).send("Empty request fields");

    if(req.body.id < 1 || 
        req.body.id > quotes.quotes.length) return res.status(500).send("id out of bounds");

    const new_quote = quotes.quotes[parseInt(req.body.id)-1];


    new_quote.quote = req.body.quote;
    new_quote.author = req.body.author;
    new_quote.publication = req.body.publication;

    console.log(quotes.quotes);
    res.json(new_quote);

});

app.delete("/quote/:id", (req, res) => {
    if(!req.params.id) return res.status(404).send("Please include a quote id");

    if(!quotes.quotes[parseInt(req.params.id)-1]){
        return res.status(404).send("A quote with that id does not exist");
    }

    const quote = quotes.quotes[parseInt(req.params.id)-1];
    quotes.quotes.splice(parseInt(req.params.id)-1,1);
    console.log(quotes.quotes);

    res.json(quote);

});

app.listen(port, () => {
    console.log("API now listening");
});

