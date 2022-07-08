import react from "react";
import { useState, useEffect } from "react";

import "./form.css";

const Form = () => {
  const userDetails = { username: "", email: "", password: "" };
  const [formValues, setFormvalues] = useState(userDetails);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormvalues({ ...formValues, [name]: value });
    console.log(formValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.username) {
      errors.username = "Username is required";
    } else if (values.username.length < 4) {
      errors.username = "Username is Too Short";
    } else if (values.username.length > 10) {
      errors.username = "USername cannot be this long";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4 || values.password.length > 10) {
      errors.password = "This is not a valid Password";
    }
    return errors;
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
        <h1>Form </h1>
        <label htmlFor="username">Username</label>
        <br />
        <input
          type="text"
          name="username"
          id="username"
          value={formValues.username}
          onChange={handleChange}
        />
        <br />
        <p>{formErrors.username}</p>
        <label htmlFor="email">Email</label>
        <br />
        <input
          type="text"
          name="email"
          id="email"
          value={formValues.email}
          onChange={handleChange}
        />
        <br />
        <p>{formErrors.email}</p>
        <label htmlFor="password">Password</label>
        <br />
        <input
          type="password"
          name="password"
          id="password"
          value={formValues.password}
          onChange={handleChange}
        />
        <br />
        <p>{formErrors.password}</p>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Form;
