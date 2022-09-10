import React from 'react'
import styled from 'styled-components'

// styled-components -----------------------------
const ContainerCard = styled.div`
  max-width: 800px;
  width: 95%;
  padding: 20px;
  margin: 10px auto;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  min-height: 200px;
  text-align: left;
  display: flex;
  flex-wrap: wrap;
`
export default function Card(props) {
  //   console.log(props)
  return (
    <ContainerCard>
      <img src={props.imageUrl} alt="Images du Post" width={200} />
      <p>{props.post}</p>
    </ContainerCard>
  )
}
