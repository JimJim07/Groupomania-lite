import { useState } from 'react'
import { createContext } from 'react'

export const InfoContext = createContext()

const InfoContextProvider = (props) => {
  const [infoUser, setInfoUser] = useState('')
  const [connexion, setConnexion] = useState(false)

  return (
    <InfoContext.Provider
      value={{ infoUser, setInfoUser, connexion, setConnexion }}
    >
      {props.children}
    </InfoContext.Provider>
  )
}

export default InfoContextProvider
