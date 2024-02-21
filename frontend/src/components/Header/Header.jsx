// import { useContext } from 'react'
// import { InfoContext } from '../Context/InfoContext'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/icon-white.svg'
import './Header.css'

// Composant --------------------------------------------------
export default function Header() {
  // const { pseudoCtx } = useContext(InfoContext)
  const token = Cookies.get('token')
  const navigate = useNavigate()

  function deconnection() {
    Cookies.remove('token')
    localStorage.clear()
    navigate('/')
  }

  return (
    <header className='Header'>
      <img className='Header__img' src={logo} alt="Logo Groupomania" width={450} height={69} />

      {token && (
        <div className='Header__container--user'>
          <h3>😊Hello Pseudo</h3>
          <button className='Header__btn cursor__pointer' onClick={deconnection}>
            Déconnection
          </button>
        </div>
      )}
    </header>
  )
}
