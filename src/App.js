import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './styles/style.css';

import RecipeList from "./RecipeList";
import Recipe from "./Recipe";
import NewRecipe from "./NewRecipe";
import EditRecipe from "./EditRecipe";
import NotFound from "./NotFound";

class App extends Component {

    constructor(props) {
        super(props);

        // TODO: Move this data to the server
        this.state = {
            recipes: []
        }
    }

    componentDidMount() {
        console.log("App component has mounted");
        this.getData();
    }

    getData() {
        fetch('http://localhost:8080/recipes')
            .then(response => response.json()) // Turn into JSON     )
            .then(recipes => this.setState({ recipes }))

    }

    addData(text) {
        fetch('http://localhost:8080/recipes', {
            method: 'POST',
            body: JSON.stringify({
                title: text.title,
                description: text.description,
                ingredients: text.ingredients,
                prep_time: text.prep_time,
                total_time: text.total_time
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json => {
                console.log("Result of posting a new recipe:");
                console.log(json);
            });
    }

    editData(text) {
        fetch('http://localhost:8080/recipes/'+ text.id, {
            method: 'PUT',
            body: JSON.stringify({
                title: text.title,
                description: text.description,
                ingredients: text.ingredients,
                prep_time: text.prep_time,
                total_time: text.total_time
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json => {
                console.log("Result of posting a new recipe:");
                console.log(json);
            });
    }

    getRecipeFromId(id) {
        return this.state.recipes.find((elm) => elm.id === Number(id));
    }

    filterByIngredient(ingredient) {
        return this.state.recipes.filter((elm) => elm.ingredients.includes(ingredient))
    }

    render() {
        return (
            <Router>
                <div className="container">
                    <h1 className="text">Cooking Recipes</h1>

                    <Switch>
                        <Route exact path={'/'}
                               render={(props) =>
                                   <RecipeList {...props}
                                         recipes={this.state.recipes}
                                         header={'All recipes'}/>}
                        />

                        <Route exact path={'/recipe/add'}
                               render={(props) => <NewRecipe {...props}
                                         addData={this.addData}/>}
                        />

                        <Route exact path={'/recipe/:id'}
                               render={(props) => <Recipe {...props}
                                        recipe={this.getRecipeFromId(props.match.params.id)}/>}
                        />

                        <Route exact path={'/recipe/edit/:id'}
                               render={(props) => <EditRecipe {...props}
                                        recipe={this.getRecipeFromId(props.match.params.id)}
                                        editData={this.editData}/>}
                        />

                        <Route exact path={'/recipe/with/:ingredient'}
                               render={(props) => <RecipeList {...props}
                                        recipes={this.filterByIngredient(props.match.params.ingredient)}
                                        header={`Recipes with ${props.match.params.ingredient}`}/>}
                        />

                        <Route component={NotFound} />
                    </Switch>

                </div>
            </Router>
        );
    }
}

export default App;
