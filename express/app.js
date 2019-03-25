const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

/****** Configuration *****/
const port = (process.env.PORT || 8080);

// Additional headers to avoid triggering CORS security errors in the browser
// Read more: https://en.wikipedia.org/wiki/Cross-origin_resource_sharing
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

    // intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
        // respond with 200
        console.log("Allowing OPTIONS");
        res.sendStatus(200);
    } else {
        // move on
        next();
    }
});

/****** Data *****/
// TODO: Add some data
const data = [

];

/****** Helper functions *****/
function getRecipeFromId(id) {
    return data.find((elm) => elm.id === Number(id));
}

function filterByIngredient(ingredient) {
    return data.filter((elm) => elm.ingredients.includes(ingredient))
}

function findNextId() {
    const reducer = (acc, curr) => Math.max(acc, curr);
    let nextId = data.map(el => el.id).reduce(reducer) + 1;
    return nextId;
}

/****** Routes *****/
// TODO: Croute route handlers!

app.listen(port, () => console.log(`Cooking API running on port ${port}!`));

