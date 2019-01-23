const lineReader = require("line-reader");

const getQuotes = (quotesFileName) => {
    return new Promise((resolve, reject) => {

        let quotesList = new Array();
        let i = 1;
        let targetQuoteTypesArray = ["motivational",
                                        "courage",
                                        "inspirational",
                                        "failure",
                                        "leadership",
                                        "learning",
                                        "positive",
                                        "thankful",
                                        "wisdom"];

        lineReader.eachLine(quotesFileName, (line, last) => {
            line = line.split(";",3);
            if (targetQuoteTypesArray.includes(line[2]))
            {
                quotesList.push({ id: i, quote : line[0], author : line[1]});
                i++;
            };
        }, (err) => {
            if(err) reject(err);
            console.log("quotes loaded - done!");
            console.log(`QuotesList.length = ${quotesList.length}`);
            resolve(quotesList);
        });
    });
};

exports.GetQuotesFromCSV = getQuotes;