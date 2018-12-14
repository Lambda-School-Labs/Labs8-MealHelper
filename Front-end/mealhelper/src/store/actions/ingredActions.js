import axios from "axios";

//Ingredient
export const ADDING_INGREDIENT = "ADDING_INGREDIENT";
export const ADDED_INGREDIENT = "ADDED_INGREDIENT";
export const ADDING_INGREDIENT_ERROR = "ADDING_INGREDIENT_ERROR";
export const GETTING_INGREDIENT = "GETTING_INGREDIENT";
export const GOT_INGREDIENT = "GOT_INGREDIENT";
export const GETTING_INGREDIENT_ERROR = "GETTING_INGREDIENT_ERROR";
export const UPDATING_INGREDIENT = "UPDATING_INGREDIENT";
export const UPDATED_INGREDIENT = "UPDATED_INGREDIENT";
export const UPDATING_INGREDIENT_ERROR = "UPDATING_INGREDIENT_ERROR";

//Route to sign up a user

export const addMultipleIngredients = (
  ingredient,
  userId,
  countIngredients,
  recipe_id
) => dispatch => {
  for (let i = 0; i < countIngredients; i++) {
    dispatch({ type: ADDING_INGREDIENT });
    const id = userId;
    console.log("this is the recipe id" + recipe_id);
    ingredient[i]["recipe_id"] = recipe_id;
    console.log(ingredient[i]);
    const promise = axios.post(
      `https://labs8-meal-helper.herokuapp.com/ingredients/${id}`,
      ingredient[i]
    );
    promise
      .then(response => {
        console.log(response);
        dispatch({ type: ADDED_INGREDIENT, payload: response.data });
      })
      .catch(err => {
        dispatch({ type: ADDING_INGREDIENT_ERROR, payload: err });
      });
  }
};
//Route to login a user
// export const getIngredient = (ingredient, id) => dispatch => {
//   dispatch({ type: GETTING_INGREDIENT });
//   const id = ingredient.id;
//   axios
//     //Passes credentials to the /login Route.
//     .get(`https://labs8-meal-helper.herokuapp.com/ingredients/${id}`)
//     .then(response => {
//       dispatch({ type: GOT_INGREDIENT, payload: response.data });
//     })
//     .catch(err => {
//       dispatch({ type: GETTING_INGREDIENT_ERROR, payload: err });
//     });
// };

export const getIngredients = id => dispatch => {
  dispatch({ type: GETTING_INGREDIENT });
  axios
    //Passes credentials to the /login Route.
    .get(`https://labs8-meal-helper.herokuapp.com/ingredients/${id}`)
    .then(response => {
      dispatch({ type: GOT_INGREDIENT, payload: response.data });
    })
    .catch(err => {
      dispatch({ type: GETTING_INGREDIENT_ERROR, payload: err });
    });
};

export const updateMultipleIngredients = (
  ingredient,
  countIngredients,
  recipe_id
) => dispatch => {
  console.log("ingredient coming in: " + JSON.stringify(ingredient));
  for (let i = 0; i < countIngredients; i++) {
    dispatch({ type: UPDATING_INGREDIENT });

    console.log("this is the recipe id" + recipe_id);

    ingredient[i]["recipe_id"] = recipe_id;
    console.log(ingredient[i]);
    const promise = axios.put(
      `https://labs8-meal-helper.herokuapp.com/ingredients/recipe/${recipe_id}`,
      ingredient[i]
    );
    promise
      .then(response => {
        console.log(response);
        dispatch({ type: UPDATED_INGREDIENT, payload: response.data });
      })
      .catch(err => {
        dispatch({ type: UPDATING_INGREDIENT_ERROR, payload: err });
      });
  }
};
