import PropTypes from "prop-types";
import styles from "./Cocktail.module.css";
import { useState } from "react";

const Cocktail = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmBtnText, setConfirmBtnText] = useState("Delete?");

  const ClickHandler = () => {
    if (!isVisible) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  //Call the API with DELETE to delete the given cocktail
  const deleteCocktail = (id) => () => {
    //Change the button to require a confirmation click before deletion
    if (!confirmDelete) {
      setConfirmBtnText("Are You Sure?");
      setConfirmDelete(true);
    } else {
      //If clicked again delete the cocktail
      fetch(`http://localhost:3000/cocktails/${id}`, { method: "DELETE" })
        .then(() => {
          console.log(`Cocktail with id ${id} deleted`);
          //After deletion make a new api call to refresh the page
          props.refreshData();
        })
        .catch(() => console.log("Error deleting cocktail"));
    }
  };

  return (
    <div className={styles.card}>
      <h3>{props.title}</h3>
      <img src={props.img}></img>
      <p>{props.description}</p>
      <button
        className={`${styles.button} ${styles.success}`}
        onClick={ClickHandler}
      >
        {!isVisible ? "Show Ingredients" : "Hide Ingredients"}
      </button>
      <div className={!isVisible ? styles.hidden : ""}>
        <h4>Ingredients</h4>
        <ul>
          {props.ingredients.map((ingredient, index) => (
            <li key={index}>
              {ingredient.name}: {ingredient.cocktailIngredient.quantity}
            </li>
          ))}
        </ul>
        <button
          className={`${styles.button} ${styles.negative}`}
          onClick={deleteCocktail(props.id)}
        >
          {confirmBtnText}
        </button>
      </div>
    </div>
  );
};

Cocktail.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  ingredients: PropTypes.array.isRequired,
  refreshData: PropTypes.func,
};

export default Cocktail;
