import React, {Component} from 'react';
import { Link } from "react-router-dom";

class RecipeList extends Component {

    render() {
        let list = [];

        this.props.recipes.forEach((elm) => {
            list.push(<li key={elm.title}>
                <Link className="link" to={`/recipe/${elm.id}`}>{elm.title}</Link>
            </li>)
        });

        return (
            <div>
                <h3 className="header text">{this.props.header}</h3>
                <ul className="recipe-list">
                    {list}
                </ul>
                <Link className="button" id="add" to={'/recipe/add'}>Add new recipe</Link>
            </div>
        );
    }
}

export default RecipeList;
