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
    {
        id: 0,
        title: "Apple pie",
        description: "Apple pie is best served warm with a scoop of vanilla ice-cream",
        ingredients: ['apples', 'eggs', 'butter', 'flour', 'sugar', 'cinnamon'],
        prep_time: 20,
        total_time: 80
    },
    {
        id: 1,
        title: "Cherry pie",
        description: "American classic from good old times",
        ingredients: ['cherries', 'egg', 'butter', 'flour', 'sugar'],
        prep_time: 10,
        total_time: 60
    },
    {
        id: 2,
        title: "Lemon meringue pie",
        description: "For fans of strong experiences",
        ingredients: ['lemons', 'oranges', 'egg', 'butter', 'flour', 'sugar', 'cinnamon'],
        prep_time: 40,
        total_time: 80
    },
    {
        id: 3,
        title: "Pizza",
        description: "Pizza is nice",
        ingredients: ['cheese', 'tomato', 'onion'],
        prep_time: 20,
        total_time: 30
    },
    {
        id: 4,
        title: "Vegetable Quiche",
        description: "Nice with shredded zucchini",
        ingredients: ['cheese', 'zucchini', 'onion'],
        prep_time: 30,
        total_time: 90
    },
    {
        id: 5,
        title: "Baked Potato with Fried Eggs",
        description: "Served with bakes beans",
        ingredients: ['potato', 'beans', 'egg'],
        prep_time: 10,
        total_time: 70
    }
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
// GET
app.get('/recipes', (req, res) => res.json(data));

app.get('/recipes/:id', (req, res) => {
    res.json(data.filter(elm => elm.id === parseInt(req.params.id)));
    res.json({ msg: `You have sent this id: ${req.params.id}`});
});

app.get('/recipes/with/:ingredients', (req, res) => {
    res.json(data.filter((elm) => elm.ingredients.includes(req.params.ingredients)));
    res.json({ msg: `You have sent this ingredient: ${req.params.ingredients}`});
});


// POST
app.post('/recipes', (req, res) => {
    // res.send(req.body);
    const newRecipe = {
        id: findNextId(),
        title: req.body.title,
        description: req.body.description,
        ingredients: req.body.ingredients,
        prep_time: req.body.prep_time,
        total_time: req.body.total_time
    };
    if(!newRecipe.title || !newRecipe.description || !newRecipe.ingredients || !newRecipe.prep_time || !newRecipe.total_time) {
        return res.status(400).json({ msg: 'Please include title, description, list of ingredients for recipe, as well as preparation and total time' });
    }
    data.push(newRecipe);
    // res.json(data);
    res.json({ msg: `You have posted this recipe: ${req.body.title}`});
});


// PUT
app.put('/recipes/:id', (req, res) => {

    // finding object in data by id
    const found = data.some(elm => elm.id === parseInt(req.params.id));

    if (found) {
        const updData = req.body;
        const elm = data[req.params.id];

        elm.name = updData.name ? updData.name : elm.name;
        elm.description = updData.description ? updData.description : elm.description;
        elm.ingredients = updData.ingredients ? updData.ingredients : elm.ingredients;
        elm.prep_time = updData.prep_time ? updData.prep_time : elm.prep_time;
        elm.total_time = updData.total_time ? updData.total_time : elm.total_time;

        // res.json(data);
        res.json({ msg: `Recipe ${req.body.title} was updated`})
    } else {
        res.status(400).json({ msg: `No task with id ${req.params.id}`})
    }
});

app.listen(port, () => console.log(`Cooking API running on port ${port}!`));

