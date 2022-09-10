import React, { useState } from 'react'
import styled from 'styled-components'
import colors from '../utils/style/colors'

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

export default function FormHome(props) {
  console.log(props)
  const userId = localStorage.getItem('userId')
  const token = localStorage.getItem('token')

  const [imageUrl, setImageUrl] = useState('')
  const [post, setPost] = useState('')

  function submitForm(e) {
    e.preventDefault()
    const infoPost = {
      posterId: userId,
      imageUrl: imageUrl,
      post: post,
    }

    console.log(infoPost)

    fetch('http://localhost:7000/api/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(infoPost),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
      })
  }
  return (
    <FormStyled>
      <label>
        <Input
          type="text"
          id="image"
          placeholder="Entrez votre Url image"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </label>

      <label>
        <Textarea
          type="text"
          id="post"
          maxLength={250}
          placeholder="Votre post"
          value={post}
          onChange={(e) => setPost(e.target.value)}
          required
        ></Textarea>
      </label>
      <Button onClick={submitForm}>Publier le post</Button>
    </FormStyled>
  )
}
