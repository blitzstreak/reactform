import { useState } from "react";

export default function SignUpForm({ token, setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Sign up failed.");
      }

      const result = await response.json();
      setToken(result.token); // Assuming the server returns a token
      console.log(result);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div id="sign">
      <h2>Sign Up</h2>
      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            className="user"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <br />

        <label>
          Password:
          <input
            className="pass"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />

        <button type="submit">Submit</button>

        <div id="message">
          <h3>Password must contain the following:</h3>
          <p id="length">Contains <b>8 characters</b></p>
        </div>
      </form>
    </div>
  );
}