import React, { Component } from "react";
import { connect } from "react-redux";
//change the route for this
import { addUser } from "../../store/actions/userActions";
import { withRouter, Link, Route } from "react-router-dom";
import { getRecipe, deleteRecipe } from "../../store/actions/recipeActions";
import { Alert } from "reactstrap";
import axios from "axios";

import "./recipes.css";

class SingleRecipe extends Component {
  state = {
    recipe: [],
    ingredients: [],
    nutrition: [],
    visible: false
  };
  componentDidMount() {
    if (localStorage.getItem("token")) {
      console.log(this.props);
      localStorage.setItem("recipe_id", this.props.match.params.id);
      axios
        .get(
          `https://labs8-meal-helper.herokuapp.com/recipe/single/${
            this.props.match.params.id
          }`
        )
        .then(response => {
          this.setState({ recipe: response.data });
          const recipe_id = this.state.recipe.id;

          axios
            .get(
              `https://labs8-meal-helper.herokuapp.com/ingredients/recipe/${recipe_id}`
            )
            .then(response => {
              this.setState({ ingredients: response.data });
              axios
                .get(
                  `https://labs8-meal-helper.herokuapp.com/nutrients/${recipe_id}`
                )
                .then(response => {
                  this.setState({ nutrition: response.data });
                });
            });
        });
    } else {
      this.props.history.push("/");
    }
  }
  onDismiss() {
    this.setState({ visible: false });
  }
  alert = () => {
    this.setState({ visable: true });
  };
  deleteRecipe = () => {
    const userid = localStorage.getItem("user_id");
    const id = this.state.recipe.id;

    this.props.deleteRecipe(id, userid);
    setTimeout(this.alert, 4000);
    this.props.history.push("/homepage");
  };
  routeChange = () => {
    this.props.history.push(`/recipe/${this.state.recipe.id}/edit`);
  };
  render() {
    return (
      <div className="single-recipe-container">
        <Alert
          color="success"
          isOpen={this.state.visible}
          toggle={this.onDismiss}
        >
          Successfully Deleted Recipe! Redirecting...
        </Alert>
        <div>
          <h1 className="single-recipe-name">{this.state.recipe.name}</h1>
          <h2>Servings: {this.state.recipe.servings}</h2>
        </div>
        <h2>Ingredients: </h2>
        <div className="single-recipe-ingredient-container">
          {this.state.ingredients.map(ingredient => (
            <div className="ingredient-name">{ingredient.name}</div>
          ))}
        </div>
        <h2>Nutrition: </h2>
        <div className="single-recipe-nutrient-container">
          {this.state.nutrition.map(nutrient => (
            <div className="single-recipe-view-nutrients">
              {nutrient.nutrient} {nutrient.value} {nutrient.unit}
            </div>
          ))}
        </div>
        <div className="single-recipe-buttons">
          <button
            onClick={this.routeChange}
            className="single-recipe-edit-button"
          >
            Edit Recipe
          </button>
          <button
            className="single-recipe-delete-button"
            onClick={this.deleteRecipe}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userReducer.user,
  meals: state.mealsReducer.meals,
  recipes: state.recipesReducer.recipes
});

export default connect(
  mapStateToProps,
  { addUser, deleteRecipe, getRecipe }
)(withRouter(SingleRecipe));
