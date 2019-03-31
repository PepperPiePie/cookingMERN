import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Recipe extends Component {

    render() {
        let recipe = this.props.recipe;
        let list = [];

        recipe.ingredients.forEach((elm) => {
            list.push(<li key={elm}>
                <Link className="link" to={`/recipe/with/${elm}`}>{elm}</Link>
            </li>)
        });

        let difficulty = 'easy';
        if (recipe.prep_time > 20) {
            difficulty = 'hard';
        }

        return (
            <div>
                <div id="description">
                    <h3 id="title">{recipe.title}</h3>
                    <p>{recipe.description}</p>
                    <p><span>Difficulty:</span> {difficulty}</p>
                    <p><span>Total time:</span> {recipe.total_time}</p>
                    <p><span>Preparation time:</span> {recipe.prep_time}</p>
                </div>

                <p className="header">Ingredients</p>
                <ul className="recipe-list">
                    {list}
                </ul>

                <Link className="back" to={`/recipe/edit/${recipe._id}`}>Edit recipe</Link>
                <Link className="back" to='/'>Back</Link>
            </div>
        );
    }
}

export default Recipe;
