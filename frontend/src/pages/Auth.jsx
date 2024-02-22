import { useState } from 'react'
import logo from '../assets/icon-white.svg'
import Login from '../components/SignupAndLogin/Login'
import Signup from '../components/SignupAndLogin/Signup'
import './Auth.css'

export default function Auth() {
  const [signupOrLogin, setSignupOrLogin] = useState(true)

  return (
    <main className='Auth'>
      <img className='Auth__img' src={logo} alt="Logo groupomania" />
      {signupOrLogin ?
        <Login
          setSignupOrLogin={setSignupOrLogin}
          signupOrLogin={signupOrLogin} /> :
        <Signup
          setSignupOrLogin={setSignupOrLogin}
          signupOrLogin={signupOrLogin} />
      }
    </main>
  )
}
