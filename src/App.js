import React, { useState, useEffect } from "react";
import axios from "axios";

import Country from "./components/country";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    let countryObject = {};
    if (name) {
      axios
        .get(`https://restcountries.com/v3.1/name/${name}`)
        .then((response) => {
          let country = response.data[0];
          setCountry({
            ...countryObject,
            name: country.name.common,
            capital: country.capital,
            population: country.population,
            flag: country.flags.png,
            found: true,
          });
        })
        .catch(() => {
          setCountry({ found: false });
        });
    }
  }, [name]);

  return country;
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
