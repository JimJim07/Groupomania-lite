import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../styles/colors'
import logo from '../assets/icon-color.png'

// Styled-components --------------------------------------
const HomeContainer = styled.div`
  text-align: center;
  color: ${colors.primary};
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`
const Img = styled.img`
  max-width: 400px;
  width: 90%;
`
const Container = styled.div`
  background-color: ${colors.backgroundLight};
  width: 90%;
  max-width: 500px;
  padding: 40px;
  border-radius: 20px;
  text-align: center;
`
const Title = styled.h1`
  text-align: center;
  padding-bottom: 20px;
  color: ${colors.primary};
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`
const Label = styled.label`
  padding: 5px 0;
  display: flex;
  justify-content: space-between;
`
const Input = styled.input`
  width: 100%;
  font-size: 18px;
  padding: 15px;
  border-radius: 10px;
`
const LinkBTN = styled.button`
  color: white;
  background: ${colors.tertiary};
  font-size: 18px;
  padding: 15px;
  margin-bottom: 25px;
  text-decoration: none;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background: ${colors.primary};
  }
`
const TxtErr = styled.p`
  color: ${colors.primary};
  margin-bottom: 10px;
`
const Separator = styled.div`
  border-top: 1px solid black;
`
const LinkStyled = styled(Link)`
  text-decoration: none;
  font-size: 18px;
  color: white;
  display: inline-block;
  padding: 15px;
  border-radius: 10px;
  margin-top: 25px;
  background: ${colors.tertiary};
  &:hover {
    background: ${colors.primary};
  }
`

// Composant --------------------------------------------------
export default function Signup() {
  const [pseudo, setPseudo] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [txtError, setTxtError] = useState('')

  const navigate = useNavigate()

  function addUser(e) {
    e.preventDefault()
    const infoUser = {
      pseudo: pseudo,
      email: email,
      password: password,
    }

    // Appel APi pour l'inscription
    fetch('http://localhost:7000/api/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(infoUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error)
          setTxtError('Email déjà utilisé, Utilisateur non enregistré.')
        } else {
          console.log(data)
          towardsLogin(infoUser)
        }
      })
      .catch((err) => console.log(err))
  }

  function towardsLogin(infoUser) {
    fetch('http://localhost:7000/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(infoUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error)
        } else {
          // console.log(data)
          localStorage.setItem('userId', data.userId)
          localStorage.setItem('token', data.token)
          navigate('/home')
        }
      })
      .catch((err) => console.log(err))
  }

  // Syntaxe JSX --------------------------------------------------
  return (
    <HomeContainer>
      <Container>
        <Title>Inscription</Title>
        <Form onSubmit={addUser}>
          <Label>
            <Input
              type="text"
              name="pseudo"
              minLength={3}
              maxLength={30}
              placeholder="Pseudo"
              value={pseudo}
              onChange={(e) => {
                setPseudo(e.target.value)
                setTxtError('')
              }}
              required
            />
          </Label>

          <Label>
            <Input
              type="email"
              name="email"
              placeholder="Adress e-mail"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setTxtError('')
              }}
              required
            />
          </Label>

          <Label>
            <Input
              type="password"
              //   minLength={6}
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setTxtError('')
              }}
              required
            />
          </Label>

          <LinkBTN>Créer un nouveau compte</LinkBTN>
        </Form>
        <TxtErr>{txtError}</TxtErr>
        <Separator></Separator>
        <LinkStyled to="/">Se connecter</LinkStyled>
      </Container>
      <Img src={logo} alt="Logo Groupomania" />
    </HomeContainer>
  )
}
