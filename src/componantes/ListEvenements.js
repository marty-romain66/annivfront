import React, { useEffect } from "react";
import axios from "axios";
import Post from "./Post";
const ListEvenements = () => {
  const [toggle, setToggle] = React.useState(false);
  const [data, setData] = React.useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [evenements, setEvenements] = React.useState([]);
  const [userInEvens, setUserInEvens] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [evenementId, setEvementId ] = React.useState("")

  useEffect(() => {
    setEvenements(data.user.Evenements);
    axios
      .get("http://localhost:3001/api/evenuser/" + data.user.id)
      .then((res) => {
        console.log(res);
        setUserInEvens(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [data]);

  const handleCode = (e) => {
    setCode(e.target.value);
  };

  const handleJoin = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3001/api/evenements/${code}joinevenement`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const toggleLink = () => {
    
    setToggle(!toggle);
  };

  return (
    <div>
      {toggle ? (
        <Post id={evenementId} />
      ) : (
        <div>
          <h1>Mes evenements</h1>
          <ul>
            {evenements.map((evenement) => (
              <li
                style={{ cursor: "pointer" }}
                onClick={()=> {setEvementId(evenement.id) ; toggleLink()}}
               
                key={evenement.id}
              >
                {evenement.evenementName}
              </li>
            ))}
          </ul>
          <h2>Rejoindre un evenement</h2>
          <form>
            <input
              type="text"
              placeholder="Code evenement"
              onChange={handleCode}
            />
            <button onClick={handleJoin}>Rejoindre</button>
          </form>
          <h2>Liste des évenements ou je suis présents</h2>
          <ul>
            {userInEvens !== false ? (
              userInEvens.map((evenement) => (
                <li key={evenement.id}>{evenement.Evenement?.evenementName}</li>
              ))
            ) : (
              <li>Vous n'êtes inscrit à aucun évenement</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ListEvenements;
