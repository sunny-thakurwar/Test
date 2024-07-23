import React, { useState } from "react";

const Form = ({ setIsLoading, handleFetch, setError, isLoading }) => {
  const [formValues, setFormValues] = useState({
    name: "",
    streetAddress: "",
    city: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    fetch(`https://669e81a59a1bda368006cea4.mockapi.io/list`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(formValues),
    })
      .then(() => {
        handleFetch();
      })
      .catch((err) => {
        setError(err);
      });
  };

  const handleInput = (e) => {
    setFormValues((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  return (
    <form onSubmit={handleSubmit} className="container__add-contact-form">
      <h1>Add Contact</h1>
      <label>name</label>
      <input
        name="name"
        id="name"
        value={formValues.name}
        onChange={handleInput}
      />
      <label>streetAddress</label>
      <input
        name="streetAddress"
        id="streetAddress"
        value={formValues.streetAddress}
        onChange={handleInput}
      />
      <label>city</label>
      <input
        name="city"
        id="city"
        value={formValues.city}
        onChange={handleInput}
      />

      <button type="submit" disabled={isLoading}>
        Add Button
      </button>
    </form>
  );
};

export default Form;
