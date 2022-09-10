import styled from 'styled-components'
import colors from '../../utils/style/colors'
import logoError from './logoError.png'
import { Link } from 'react-router-dom'

// Styled-components -------------------------------------------------
const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
`

const Title = styled.h1`
  color: ${colors.primary};
  padding: 15px;
`
const ErrorIMG = styled.img`
  height: 80px;
  width: 80px;
`
const LinkStyled = styled(Link)`
  text-decoration: none;
  color: white;
  padding: 8px;
  border-radius: 10px;
  margin-top: 50px;
  background-color: ${colors.tertiary};
  &:hover {
    background: ${colors.primary};
  }
`
// Composant ErrorPage ------------------------------------
export default function ErrorPage() {
  // Syntaxe JSX --------------------------------------------------
  return (
    <ErrorContainer>
      <Title>Wops, cette page n'existe pas.</Title>
      <ErrorIMG src={logoError} alt="logo erreur" />
      <LinkStyled to="/">Retour a la page de connexion</LinkStyled>
    </ErrorContainer>
  )
}
