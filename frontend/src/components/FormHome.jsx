import React, { useState } from 'react'
import Cookies from 'js-cookie'
import fetchData from '../Fetch/fetchData.js'
import './FormHome.css';

export default function FormHome({ update, setUpdate }) {
  const token = Cookies.get('token')

  const [post, setPost] = useState('')
  const [picture, setPicture] = useState('')

  const onSubmitHandle = async (e) => {
    try {
      e.preventDefault();
      setUpdate(!update)
      console.log(update);

      const formData = new FormData();
      formData.append('image', picture);
      formData.append('post', post);

      const url = 'http://localhost:7000/api/post';
      const options = {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      };

      const dataFetch = await fetchData(url, options);
      console.log(dataFetch);
    } catch (error) {
      console.log(error);
    }
  };


  // Syntaxe JSX --------------------------------------------------
  return (
    <form className='FormHome' onSubmit={onSubmitHandle}>
      <label>
        <input className='FormHome__input'
          type="file"
          name="file"
          accept=".jpg,.jpeg,.png,"
          onChange={(e) => setPicture(e.target.files[0])}
          required
        />
      </label>

      <label>
        <textarea className='FormHome__textarea'
          type="text"
          name="post"
          maxLength={250}
          placeholder="Votre post"
          value={post}
          onChange={(e) => setPost(e.target.value)}
          required
        ></textarea>
      </label>
      <button className='FormHome__btn'>Publier le post</button>
    </form>
  )
}
