# InspireAPI
A project to learn Javascript, NodeJS and ExpressJS by creating an API that sends out motivational quotes. Released under an MIT licence.

Currently, all requests are made to a single endpoint *api/inspire/quotes*.

The following requests are supported -

## GET

`GET /quotes`

- returns a single quote (picked at random from the file Quotes.csv from [Akhil Tak's Inspirational Quotes Project](https://github.com/akhiltak/inspirational-quotes)) in the json format -

```
{
  "id":(a unique integer),
  "quote":(quote text),
  "author":(author or attributed to)
}
```
For example -

```
{
  "id":49095,
  "quote":"Crave for a thing, you will get it. Renounce the craving, the object will follow you by itself.",
  "author":"Swami Sivananda"
}
```

`GET /quotes/:id`

- returns a quote corresponding to the quote ID entered in as a parameter (the "id" filed in the json output above).

The request types POST, PUT and DELETE are not yet finished and will currently result in an error.
