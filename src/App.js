import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  // function for the countries
  const [countries, setCountries] = useState([]);

  // for error handling
  const [error, setError] = useState(null);

  // fetching the countries data
  useEffect(() => {
    axios
      .get("https://xcountries-backend.azurewebsites.net/all")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((err) => {
        console.error("Error while fetching data: ", err);
        setError("Failed to load country data.");
      });
  }, []);

  window.addEventListener("unhandledrejection", (event) => {
    console.error("Unhandled promise rejection:", event.reason);
    setError("Error while fetching data.");
  });

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error("Interceptor caught error:", error);
      setError("Error while fetching data.");
      return Promise.reject(error);
    }
  );

  return (
    <div className="App">
      <h1>Flags of Different Countries of the World</h1>
      {error && <p>{error}</p>}

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
    </div>
  );
}

export default App;
