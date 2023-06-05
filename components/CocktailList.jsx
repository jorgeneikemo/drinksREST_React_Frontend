import Cocktail from "./Cocktail";
import PropTypes from "prop-types";
import styles from "./CocktailList.module.css";

const CocktailList = (props) => {
  return (
    <div className={styles.container}>
      {props.cocktails.map((cocktail) => {
        return (
          <Cocktail
            key={cocktail.id}
            id={cocktail.id}
            title={cocktail.name}
            description={cocktail.description}
            img={cocktail.img}
            ingredients={cocktail.ingredients}
            refreshData={props.refreshData}
          />
        );
      })}
    </div>
  );
};

CocktailList.propTypes = {
  cocktails: PropTypes.array.isRequired,
  refreshData: PropTypes.func,
};

export default CocktailList;
