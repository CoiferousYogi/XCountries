import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  // function for the countries
  const [countries, setCountries] = useState([]);

  // for error handling
  const [error, setError] = useState(null);

  // fetching the countries data
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://xcountries-backend.azurewebsites.net/all"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching data: ", error.message);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div className="App">
      <h1>Flags of Different Countries of the World</h1>
      {error ? (
        <p className="error-message">Error: {error}</p>
      ) : (
        <div className="flag-container">
          {countries.map((country) => (
            <div key={country.name} className="flag-item">
              <div className="flags">
                <img
                  src={country.flag}
                  alt={`Flag of ${country.name}`}
                  className="flag-img"
                ></img>
              </div>
              <p className="country-name">{country.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
