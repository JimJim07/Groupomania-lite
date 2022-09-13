import React, { useState } from 'react'
import Cookies from 'js-cookie'
import styled from 'styled-components'
import colors from '../styles/colors'
// import iconPicture from '../assets/pictures.png'

// Styled-components -------------------------------------------------
const FormStyled = styled.form`
  max-width: 800px;
  width: 95%;
  margin: auto;
  display: flex;
  flex-direction: column;
`
const Input = styled.input`
  font-size: 18px;
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
`
const Textarea = styled.textarea`
  font-size: 18px;
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  font-family: Arial, Helvetica, sans-serif;
`
const Button = styled.button`
  font-size: 16px;
  padding: 10px 15px;
  width: 200px;
  background: transparent;
  border: 1px solid rgba(0, 0, 0, 0.8);
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    background: ${colors.backgroundLight};
  }
`

// Composant --------------------------------------------------
export default function FormHome(props) {
  const token = Cookies.get('token')

  const [post, setPost] = useState('')

  const [picture, setPicture] = useState('')

  function onSubmitHandler(e) {
    e.preventDefault()

    const data = new FormData()
    data.append('image', picture)
    data.append('post', post)

    fetch('http://localhost:7000/api/post', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setPost('')
        props.callApiPost(token)
      })
      .catch((err) => console.log({ message: err }))
  }

  // Syntaxe JSX --------------------------------------------------
  return (
    <FormStyled onSubmit={onSubmitHandler}>
      <label>
        <Input
          type="file"
          name="file"
          accept=".jpg,.jpeg,.png,"
          onChange={(e) => setPicture(e.target.files[0])}
          required
        />
      </label>

      <label>
        <Textarea
          type="text"
          name="post"
          maxLength={250}
          placeholder="Votre post"
          value={post}
          onChange={(e) => setPost(e.target.value)}
          required
        ></Textarea>
      </label>
      <Button>Publier le post</Button>
    </FormStyled>
  )
}
