import styles from "./NewCocktailForm.module.css";
import PropTypes from "prop-types";
import { useState } from "react";

const NewCocktailForm = (props) => {
  const [cocktailName, setCocktailName] = useState("");
  const [cocktailDescription, setCocktailDescription] = useState("");
  const [cocktailImg, setCocktailImg] = useState("");
  const [ingredients, setIngredients] = useState([{ name: "", quantity: "" }]);

  //Add a new ingredient field
  const addIngredient = () => {
    const lastIngredient = ingredients[ingredients.length - 1];
    //Only allow adding a new ingredient if the previous is complete
    if (lastIngredient.name && lastIngredient.quantity) {
      setIngredients([...ingredients, { name: "", quantity: "" }]);
    } else {
      console.log(
        "Please complete the previous ingredient before adding a new one."
      );
    }
  };

  const handleIngredientChange = (index, field) => (e) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = e.target.value;
    setIngredients(newIngredients);
  };

  //Handler for POSTING the new cocktail to the API
  const submitHandler = (e) => {
    e.preventDefault();
    if (!cocktailName || !cocktailDescription || !cocktailImg) {
      console.log("Cant post empty");
      return;
    }

    // Filter out empty ingredients
    const nonEmptyIngredients = ingredients.filter(
      (ingredient) => ingredient.name && ingredient.quantity
    );

    // Map over ingredients to create post body
    const formattedIngredients = nonEmptyIngredients.map((ingredient) => ({
      name: ingredient.name,
      cocktailIngredient: {
        quantity: ingredient.quantity,
      },
    }));

    //Create the new cocktail
    const newCocktail = {
      name: cocktailName,
      description: cocktailDescription,
      img: cocktailImg,
      ingredients: formattedIngredients,
    };

    //Call the api with the new cocktail
    fetch("http://localhost:3000/cocktails", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCocktail),
      cache: "default",
    }).then(() => {
      props.refreshData();
    });

    //Remove the window after completion
    props.onCancel();
  };

  return (
    <div className={styles.container}>
      <form className={styles["cocktail-form"]} onSubmit={submitHandler}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          onChange={(e) => setCocktailName(e.target.value)}
          value={cocktailName}
        ></input>
        <label htmlFor="imageurl">Image Url</label>
        <input
          id="imageurl"
          type="text"
          onChange={(e) => setCocktailImg(e.target.value)}
          value={cocktailImg}
        ></input>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          onChange={(e) => setCocktailDescription(e.target.value)}
          value={cocktailDescription}
        ></textarea>
        <label>Ingredient, Quantity</label>
        {/* Iterate over all the ingredients in thee ingredients */}
        {ingredients.map((ingredient, index) => (
          <div key={index}>
            <input
              id={`ingredient-${index}-name`}
              type="text"
              placeholder="Ingredient"
              value={ingredient.name}
              onChange={handleIngredientChange(index, "name")}
            />
            <input
              id={`ingredient-${index}-quantity`}
              type="text"
              placeholder="Quantity"
              value={ingredient.quantity}
              onChange={handleIngredientChange(index, "quantity")}
            />
          </div>
        ))}
        <button
          type="button"
          className="button info small"
          onClick={addIngredient}
        >
          Add Ingredient
        </button>
        <div className={styles["button-container"]}>
          <button type="submit" className="button success">
            Submit
          </button>
          <button
            type="button"
            className="button negative"
            onClick={props.onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

NewCocktailForm.propTypes = {
  refreshData: PropTypes.func,
  onCancel: PropTypes.func,
};

export default NewCocktailForm;
