import { useState } from 'react'
import { createContext } from 'react'

export const InfoContext = createContext()

const InfoContextProvider = (props) => {
  const [pseudoCtx, setPseudoCtx] = useState('')

  return (
    <InfoContext.Provider value={{ pseudoCtx, setPseudoCtx }}>
      {props.children}
    </InfoContext.Provider>
  )
}

export default InfoContextProvider
