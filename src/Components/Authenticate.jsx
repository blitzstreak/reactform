import { useState } from "react";

export default function Authenticate({ token }) {
  const [message, setMessage] = useState(null);

  async function handleClick() {
    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      setMessage(result.message);
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <div>
      <h2>Authenticate</h2>
      {message && <p>{message}</p>}
      <button onClick={handleClick}>Authenticate Token!</button>
    </div>
  );
}