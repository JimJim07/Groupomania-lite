import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../styles/colors'
import logo from '../assets/icon-white.svg'

// Styled-components -------------------------------------------------
const HeaderStyled = styled.header`
  background-color: ${colors.secondary};
  min-height: 150px;
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 70px;
`
const ImgStyled = styled.img`
  width: 80%;
  max-width: 500px;
  padding-left: 20px;
`
const Nav = styled.nav`
  display: flex;
  flex-wrap: wrap;
`
const LinkStyled = styled(Link)`
  text-decoration: none;
  color: white;
  padding: 8px;
  border-radius: 10px;
  margin: 0 10px;
  background-color: ${colors.tertiary};
  &:hover {
    background: ${colors.primary};
  }
`
const LinkStyledRed = styled(Link)`
  text-decoration: none;
  color: white;
  padding: 8px;
  border-radius: 10px;
  margin: 0 10px;
  background-color: ${colors.primary};
  &:hover {
    background: ${colors.tertiary};
  }
`

// Composant --------------------------------------------------
export default function Header() {
  const navigate = useNavigate()

  function deleteAllUsers() {
    fetch('http://localhost:7000/api/user/', {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
  }

  function deleteAllPost() {
    fetch('http://localhost:7000/api/post/', {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
  }

  function deconnection() {
    console.log({ message: 'Déconnection' })
    localStorage.clear()
    navigate('/')
  }

  // Syntaxe JSX --------------------------------------------------
  return (
    <HeaderStyled>
      <Link to="/">
        <ImgStyled src={logo} alt="Logo Groupomania" />
      </Link>
      <Nav>
        <LinkStyled to="/">Connexion</LinkStyled>
        <LinkStyled to="/signup">Inscription</LinkStyled>
        <LinkStyled to="/home">Home</LinkStyled>
        <LinkStyledRed to="/" onClick={deleteAllUsers}>
          Delete all users
        </LinkStyledRed>
        <LinkStyledRed to="/" onClick={deleteAllPost}>
          Delete all posts
        </LinkStyledRed>
        <LinkStyled to="/" onClick={deconnection}>
          Déconnection
        </LinkStyled>
      </Nav>
    </HeaderStyled>
  )
}
