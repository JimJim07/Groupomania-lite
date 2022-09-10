import { useState, useEffect } from 'react'

export function useFetchPost(url, method, token, body) {
  const [dataPost, setDataPost] = useState({})

  const [isLoadingPost, setLoadingPost] = useState(true)

  const [errorPost, setErrorPost] = useState(false)

  useEffect(() => {
    if (!url) return

    setLoadingPost(true)

    async function fetchDataPost() {
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

        setDataPost(data)
      } catch (err) {
        console.log(err)
        setErrorPost(true)
      } finally {
        setLoadingPost(false)
      }
    }

    fetchDataPost()
  }, [url, method, token, body])

  return { isLoadingPost, dataPost, errorPost }
}
