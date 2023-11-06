import { useState } from "react";

export default function App() {
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const user = { username, email, password };
    console.log(user);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          placeholder="username"
          required
          name="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button>Sign Up!</button>
      </form>

      <hr />

      {/* POST FORM */}
      <h1> Post A Photo </h1>
      <form>
        <label> Caption </label>
        <input placeholder="Enter title of blog" />
        <textarea />
        <select>
          <option> </option>
        </select>
        <input type="file" />
        <button> Post </button>
      </form>
    </div>
  );
}
