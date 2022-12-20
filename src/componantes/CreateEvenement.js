import React from 'react';
import axios from 'axios';

const CreateEvenement = () => {

    const [nomEvenement, setNomEvenement] = React.useState('');

    const handleName = (e) => {
        setNomEvenement(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/api/evenements/', {
            evenementName: nomEvenement
        })
            .then(res => {
                console.log(res);
            }
            )
            .catch(err => {
                console.log(err);
            }
            )

    }


    return (
        <div>
            <h1>Créer un evenement</h1>
            <form action="">
                <input type="text" placeholder="Nom de l'evenement" onChange={handleName} />
            <input type='submit' value='Créer evenement' onClick={handleSubmit } />

            </form>
        </div>
    );
};

export default CreateEvenement;