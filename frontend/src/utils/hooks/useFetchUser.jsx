import { useState, useEffect } from 'react'

export function useFetchUser(url, method, token, body) {
  const [dataUser, setDataUser] = useState({})

  const [isLoadingUser, setLoadingUser] = useState(true)

  const [errorUser, setErrorUser] = useState(false)

  useEffect(() => {
    if (!url) return

    setLoadingUser(true)

    async function fetchDataUser() {
      try {
        const response = await fetch(url, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
          body: JSON.stringify(body),
        })

        const data = await response.json()

        setDataUser(data)
      } catch (err) {
        console.log(err)
        setErrorUser(true)
      } finally {
        setLoadingUser(false)
      }
    }

    fetchDataUser()
  }, [url, method, token, body])

  return { isLoadingUser, dataUser, errorUser }
}
