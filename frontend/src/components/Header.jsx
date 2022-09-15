import { useContext } from 'react'
import { InfoContext } from '../Context/InfoContext'
import Cookies from 'js-cookie'
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
  word-break: break-all;
  align-items: center;
  margin-bottom: 50px;
`
const ImgStyled = styled.img`
  width: 80%;
  max-width: 450px;
  padding-left: 20px;
  @media (max-width: 630px) {
    padding: 10px;
    width: 100%;
  }
`
const DivUser = styled.div`
  min-width: 150px;
  max-width: 300px;
  height: 80px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 630px) {
    align-items: center;
    max-width: 100%;
    width: 100%;
    flex-direction: row;
    padding: 0 10px;
  }
`
const LinkStyled = styled(Link)`
  text-decoration: none;
  color: ${colors.white};
  padding: 8px;
  border-radius: 10px;
  margin: 0 10px;
  background-color: ${colors.tertiary};
  &:hover {
    background: ${colors.primary};
  }
`

// Composant --------------------------------------------------
export default function Header() {
  const { infoUser, connexion, setConnexion } = useContext(InfoContext)

  const navigate = useNavigate()

  function deconnection() {
    console.log({ message: 'Déconnexion' })
    setConnexion(false)
    localStorage.clear()
    Cookies.remove('token')
    navigate('/')
  }

  // Syntaxe JSX --------------------------------------------------
  return (
    <HeaderStyled>
      <Link to="/">
        <ImgStyled src={logo} alt="Logo Groupomania" />
      </Link>

      {infoUser && connexion && (
        <DivUser>
          <h3>😊Hello {infoUser}</h3>
          <LinkStyled to="/" onClick={deconnection}>
            Déconnection
          </LinkStyled>
        </DivUser>
      )}
    </HeaderStyled>
  )
}
