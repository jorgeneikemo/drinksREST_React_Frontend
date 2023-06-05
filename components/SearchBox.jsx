import { useState } from "react";
import styles from "./SearchBox.module.css";

const SearchBox = (props) => {
  return (
    <div>
      <h2 className={styles.heading}>Search for cocktail</h2>
      <input
        className={styles["search-box"]}
        onChange={(e) => {
          props.onSearch(e.target.value);
        }}
      ></input>
    </div>
  );
};

export default SearchBox;
