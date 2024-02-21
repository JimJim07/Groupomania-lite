import { useState } from 'react'
import { createContext } from 'react'

export const InfoContext = createContext()

const InfoContextProvider = (props) => {
  const [pseudoCtx, setPseudoCtx] = useState('')
  const [ifAdmin, setIfAdmin] = useState(false)

  return (
    <InfoContext.Provider value={{ pseudoCtx, setPseudoCtx, ifAdmin, setIfAdmin }}>
      {props.children}
    </InfoContext.Provider>
  )
}

export default InfoContextProvider
