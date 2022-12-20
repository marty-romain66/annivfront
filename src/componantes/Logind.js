import React from 'react';
import axios from 'axios';

const Login = () => {
//function Login()

const [email , setEmail] = React.useState('');
const [password , setPassword] = React.useState('');

const handleEmail = (e) => {
    setEmail(e.target.value);
}
const handlePassword = (e) => {
    setPassword(e.target.value);
}
const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password
    );
    axios.post('http://localhost:3001/api/login', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    })
}




    return (
        <div>
            <form action="">
                <input type="text" placeholder="email"  onChange={handleEmail}/>
                <input type="password" placeholder="password" onChange={handlePassword} />
                <button type="submit" onClick={handleSubmit}>Login</button>
            </form>
            
        </div>
    );
};

export default Login;