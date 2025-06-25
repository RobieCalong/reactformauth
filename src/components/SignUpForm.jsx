import React, { useState } from "react";

const SignUpForm = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const [isUserValid, setIsUserValid] = useState(null);
  const [isPasswordValid, setIsPasswordValid] = useState(null);

  async function handleSubmit(evt) {
    evt.preventDefault();

    try {
      if (username.length >= 8 && password.length >= 10) {
        setIsUserValid(true);
        setIsPasswordValid(true);
        const response = await fetch(
          "https://fsa-jwt-practice.herokuapp.com/signup",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: { username },
              password: { password },
            }),
          }
        );

        const data = await response.json();
        console.log("jsonData: ", data);

        setToken(data.token);
      }
      if (username.length <= 7) {
        setIsUserValid(false);
      }
      if (password.length <= 9) {
        setIsPasswordValid(false);
      }
      //
    } catch (error) {
      setError(error.message);
    }
  }

  //   function validateUser() {
  //     if (username.length >= 8) {
  //       setIsUserValid(true);
  //     }
  //     if (username.length > 0 && username.length <= 7) {
  //       setIsUserValid(false);
  //     }
  //   }

  return (
    <div
      style={{
        border: "2px solid orange",
        borderRadius: "25px",
        padding: "20px",
      }}
    >
      <h2>Sign Up</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label style={{ display: "block", padding: "10px" }}>
          Username:{" "}
          <input
            type="text"
            value={username}
            onChange={(evt) => {
              setUsername(evt.target.value);
            }}
            name="username"
          />
        </label>
        {isUserValid === false && (
          <p style={{ color: "red" }}>
            Username needs to be 8 characters or more
          </p>
        )}
        <label style={{ display: "block", padding: "10px" }}>
          Password:{" "}
          <input
            type="password"
            value={password}
            onChange={(evt) => {
              setPassword(evt.target.value);
            }}
            name="password"
          />
        </label>
        {isPasswordValid === false && (
          <p style={{ color: "red" }}>
            Password needs to be 10 characters or more
          </p>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignUpForm;
