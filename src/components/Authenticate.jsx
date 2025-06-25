import React, { useState } from "react";

const Authenticate = ({ token }) => {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [usernameLocal, setUsernameLocal] = useState(null);

  //   let userNameLocal = "";

  async function handleClick() {
    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      console.log("result: ", result);

      //   userNameLocal = result.data.username;
      setUsernameLocal(result.data.username.username);

      setMessage(result.message);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div style={{ marginTop: "80px" }}>
      <h2>Authenticate</h2>
      {message && <p>{message}</p>}
      {message && <p>Username is: {usernameLocal}</p>}
      {error && <p>{error}</p>}
      <button onClick={handleClick}>Authenticate Token</button>
    </div>
  );
};

export default Authenticate;
