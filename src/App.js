import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

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
        console.error("Error fetching data:", error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div className="App">
      <h1>Country Flags</h1>
      {error ? (
        <p className="error-message">Error: {error}</p>
      ) : (
        <div className="flag-container">
          {countries.map((country) => (
            <div className="flag-item" key={country.name}>
              <div>
                <img
                  src={country.flag}
                  alt={`${country.name} flag`}
                  className="flag-img"
                />
              </div>
              <p>{country.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
