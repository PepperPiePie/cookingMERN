import React, {Component} from 'react';
import {Link} from "react-router-dom";

class NewRecipe extends Component {
    constructor(props) {
        super(props);

        this.state = {
            input: []
        };
    }

    addRecipe = (e) => {
        e.preventDefault();

        this.setState({
            input: {
                title: this.refs.title.value,
                description: this.refs.description.value,
                ingredients: this.refs.ingredients.value.split(", "),
                prep_time: this.refs.prep_time.value,
                total_time: this.refs.total_time.value}
        }, function () {
            console.log({...this.state.input});
            this.props.addData(this.state.input);
        });


        // nullyfying value after submitting
        this.refs.title.value = null;
        this.refs.description.value = null;
        this.refs.ingredients.value = null;
        this.refs.prep_time.value = null;
        this.refs.total_time.value = null;
    };

    render() {

        return(
            <div>
                <form onSubmit={this.addRecipe}>
                    <fieldset>
                        <legend>New recipe</legend>

                        <input ref='title' type='' placeholder='Name your dish'/>
                        <input ref='description' type='' placeholder='Describe your dish'/>
                        <input ref='ingredients' type='' placeholder='List needed ingredients' onChange={this.onChange}/>
                        <input ref='prep_time' type='' placeholder='Preparation time in minutes'/>
                        <input ref='total_time' type='' placeholder='Total time in minutes'/>

                        <button className="button" type='submit'>Add new recipe</button>
                    </fieldset>
                </form>
                <Link className="back" to='/'>Back</Link>
            </div>
        )
    }
}

export default NewRecipe;