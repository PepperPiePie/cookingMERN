import React, {Component} from 'react';
import {Link} from "react-router-dom";

class EditRecipe extends Component {
    constructor(props) {
        super(props);

        this.state = {
            input: []
        };
    }

    editRecipe = (e) => {
        e.preventDefault();
        let recipe = this.props.recipe;
        this.setState({
            input: {
                _id: recipe._id,
                title: this.refs.title.value ? this.refs.title.value : recipe.title,
                description: this.refs.description.value ? this.refs.description.value : recipe.description,
                ingredients: this.refs.ingredients.value ? this.refs.ingredients.value.split(", ") : recipe.ingredients,
                prep_time: this.refs.prep_time.value ? this.refs.prep_time.value : recipe.prep_time,
                total_time: this.refs.total_time.value ? this.refs.total_time.value : recipe.total_time}
        }, function () {
            console.log({...this.state.input});
            this.props.editData(this.state.input);
        });


        // nullyfying value after submitting
        this.refs.title.value = null;
        this.refs.description.value = null;
        this.refs.ingredients.value = null;
        this.refs.prep_time.value = null;
        this.refs.total_time.value = null;
    };

    render() {

        let recipe = this.props.recipe;

        return(
            <div>
                <form onSubmit={this.editRecipe}>
                    <fieldset>
                        <legend>Edit recipe</legend>

                        <input ref='title' placeholder={recipe.title}/>
                        <input ref='description' placeholder={recipe.description}/>
                        <input ref='ingredients' placeholder={recipe.ingredients} onChange={this.onChange}/>
                        <input ref='prep_time' placeholder={recipe.prep_time}/>
                        <input ref='total_time' placeholder={recipe.total_time}/>

                        <button className="button" type='submit'>Send update</button>
                    </fieldset>
                </form>
                <Link className="back" to='/'>Back</Link>
            </div>
        )
    }
}

export default EditRecipe;