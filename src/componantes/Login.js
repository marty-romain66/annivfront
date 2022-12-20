import React from "react";
import axios from "axios";
const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/api/auth/login/", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
// add res.data to localStorage
        localStorage.setItem("user", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form action="">
        <input type="text" placeholder="email" onChange={handleEmail} />
        <input
          type="password"
          placeholder="password"
          onChange={handlePassword}
        />
        <button type="submit" onClick={handleSubmit}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
