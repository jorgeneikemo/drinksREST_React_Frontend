import styles from "./NewCocktail.module.css";
import { useState } from "react";
import NewCocktailForm from "./NewCocktailForm";
import PropTypes from "prop-types";

const NewCocktail = (props) => {
  const [isEditing, setIsEditing] = useState(false);

  const startEditingHandler = () => {
    setIsEditing(true);
  };

  const stopEditingHandler = () => {
    setIsEditing(false);
  };

  return (
    <div className={styles["new-cocktail"]}>
      {/* If not editing show the addcocktail button */}
      {!isEditing && (
        <button onClick={startEditingHandler}>Add New Cocktail</button>
      )}
      {/* If editing show the form for creating a new cocktail */}
      {isEditing && (
        <NewCocktailForm
          onCancel={stopEditingHandler}
          refreshData={props.refreshData}
        />
      )}
    </div>
  );
};

NewCocktail.propTypes = {
  refreshData: PropTypes.func,
};
export default NewCocktail;
