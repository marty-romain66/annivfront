import logo from "./logo.svg";
import "./App.css";
import React, { useEffect } from "react";
import axios from "axios";
import Login from "./componantes/Login";
import CreateEvenement from "./componantes/CreateEvenement";
import ListEvenements from "./componantes/ListEvenements";

function App() {
  const [isConnected, setIsConnected] = React.useState(false);
  const [toogleEvenement, setToogleEvenement] = React.useState(false);
  const [token, setToken] = React.useState(false);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      setToken(user.token);
    }

    if (token !== false) {
      axios
        .get("http://localhost:3001/api/testtoken", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res);
          setIsConnected(true);
        })
        .catch((err) => {
          console.log(err);
          setIsConnected(false);
        });
    }
  }, [isConnected, token]);

  return (
    <div className="App">
      {isConnected ? (
        <div>
          <button onClick={() => setToogleEvenement(!toogleEvenement)}>
            Creér un evenement
          </button>
          {toogleEvenement ? (
            <>
              <CreateEvenement />
              <ListEvenements  />
            </>
          ) : null}
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
