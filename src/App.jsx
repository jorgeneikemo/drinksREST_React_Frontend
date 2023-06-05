import { useState, useEffect } from "react";
import CocktailList from "../components/CocktailList";
import NewCocktail from "../components/NewCocktail";
import SearchBox from "../components/SearchBox";
import "./Global.css";

function App() {
  const [cocktails, setCocktails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  //Get the cocktails from the API
  const dataFetch = () => {
    fetch("http://localhost:3000/cocktails")
      .then((response) => response.json())
      .then((data) => {
        //Sort the cocktails by name
        const sortedData = [...data].sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
        setCocktails(sortedData);
      });
  };

  useEffect(() => {
    dataFetch();
  }, []);

  //Filter the cocktails by the search term
  const filteredCocktails = cocktails.filter((cocktail) =>
    cocktail.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="main">
      <div className="content">
        <NewCocktail refreshData={dataFetch} />
        <SearchBox onSearch={setSearchTerm} />
        <CocktailList cocktails={filteredCocktails} refreshData={dataFetch} />
      </div>
    </div>
  );
}

export default App;
