import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';

const formSchema = yup.object().shape({
    name: yup
    .string()
    .required("Name is a required field"),
    email: yup
    .string()
    .email("Must be a valid email address")
    .required("Must include email address"),
    password: yup
    .string()
    .min(7, "Password must be at least 7 characters long")
    .required("Must include password"),
    terms: yup
    .boolean()
    .oneOf([true], "Please agree to Terms & Conditions")
});

export default function Form() {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        password: "",
        terms: false
    });

    const [buttonDisabled, setButtonDisabled] = useState(true);

    const [user, setUser] = useState([]);

    useEffect(() => {
        formSchema.isValid(formState)
        .then(valid => {
            setButtonDisabled(!valid);
        })
    }, [formState]);

    const [errorState, setErrorState] = useState({
        name: "",
        email: "",
        password: "",
        terms: ""
    });

    const validate = e => {
      let value = 
        e.target.type === "checkbox" ? e.target.checked : e.target.value;
      yup
        .reach(formSchema, e.target.name)
        .validate(value)
        .then(valid => {
            setErrorState({
                ...errorState,
                [e.target.name]: ""
            });
        })

        .catch(err => {
            setErrorState({
                ...errorState,
                [e.target.name]: err.errors[0]
            });
        });
    }

    const inputChange = e => {
        e.persist();
        console.log("Input changed!", e.target.value, e.target.checked);
        validate(e);
        let value = 
        e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setFormState({ ...formState, [e.target.name]: value });
    };

    const formSubmit = e => {
        e.preventDefault();
        console.log("Form Submitted");
        axios
          .post("https://reqres.in/api/users", formState)
          .then(response => {
              setUser(response.data);
              console.log("Success", response)
          })
          .catch(err => console.log(err.response))
    };

    return (
        <form onSubmit={formSubmit}>
            <label htmlFor="name">
                Name:
                <input
                type="text"
                name="name"
                id="name"
                value={formState.name}
                onChange={inputChange}
                />
            </label>
            <label htmlFor="email">
                Email:
                <input
                type="email"
                name="email"
                id="email"
                value={formState.email}
                onChange={inputChange}
                />
                {errorState.email.length > 0 ? ( <p className="error">{errorState.email}</p>) : null}
            </label>
            <label htmlFor="password">
                Password:
                <input
                type="password"
                name="password"
                id="password"
                value={formState.password}
                onChange={inputChange}
                />
                {errorState.password.length > 7 ? (<p className="error">{errorState.password}</p>) : null}
            </label>
            <label htmlFor="terms">
                <input
                type="checkbox"
                name="terms"
                id="terms"
                checked={formState.terms}
                onChange={inputChange}
                />
                Terms & Conditions
                {errorState.terms.length > 0 ? (<p className="error">{errorState.terms}</p>) : null}
            </label>
            <pre>{JSON.stringify(user, null, 2)}</pre>
            <button disabled={buttonDisabled}>Submit</button>
        </form>
    )
}

