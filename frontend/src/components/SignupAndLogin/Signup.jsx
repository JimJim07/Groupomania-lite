import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import fetchData from '../../Fetch/fetchData.js';
import "./S-L.css";

export default function Signup({ signupOrLogin, setSignupOrLogin }) {
  const navigate = useNavigate();
  const [user, setUser] = useState({ pseudo: '', email: '', password: '' });
  const [txtError, setTxtError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setTxtError('');
  };

  const signup = async (e) => {
    e.preventDefault();
    try {
      const url = 'http://localhost:7000/api/user/signup';
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      };
      await fetchData(url, options);
      await loginAfterSignup(user);
    } catch (error) {
      console.error(error);
      setTxtError(`Une erreur s'est produite lors de la connexion. Veuillez réessayer.`);
    }
  };

  const loginAfterSignup = async (user) => {
    try {
      const url = 'http://localhost:7000/api/user/login';
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      };

      const data = await fetchData(url, options);
      localStorage.setItem('userId', data.userId);
      Cookies.set('token', data.token, { expires: 1, secure: true });
      navigate('/home');

    } catch (error) {
      console.error(error);
      setTxtError("Une erreur s'est produite lors de la connexion. Veuillez réessayer.");
    }
  };

  return (
    <div className='S-L'>
      <p className='S-L__title'>Inscription</p>
      <form className='S-L__form' onSubmit={signup}>
        <label>
          <input
            type="text"
            name="pseudo"
            minLength={5}
            maxLength={30}
            placeholder="Pseudo"
            value={user.pseudo}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          <input
            type="email"
            name="email"
            placeholder="Adresse e-mail"
            autoComplete="email"
            value={user.email}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          <input
            type="password"
            minLength={5}
            placeholder="Mot de passe"
            name="password"
            autoComplete="current-password"
            value={user.password}
            onChange={handleInputChange}
            required
          />
        </label>
        <button className='S-L__btn'>Créer un nouveau compte</button>
      </form>
      {txtError && <p className='TxtErr'>{txtError}</p>}
      <div className='Separator'></div>
      <button className='S-L__btn' onClick={() => setSignupOrLogin(!signupOrLogin)}>Se connecter</button>
    </div>
  );
}
