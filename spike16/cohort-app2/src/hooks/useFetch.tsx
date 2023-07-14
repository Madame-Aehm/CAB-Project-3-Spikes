import { useState, useEffect } from 'react'
import { RickAndMorty } from '../@types/api';

const useFetch = (url: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const [data, setData] = useState<RickAndMorty>();

  
  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await fetch(url);
        const result = await response.json() as RickAndMorty;
        setData(result);
      } catch (e) {
        console.log(e);
        const { message } = e as Error
        setError(message);
      }
    }

    fetchData()
      .catch((e) => {
        const { message } = e as Error
        setError(message)
      })
      .finally(() => setLoading(false))
  }, [url]);

  // useEffect(() => {
  //   setLoading(true);
  //   console.log("use effect running")

  //   fetch(url)
  //   .then((res) => res.json())
  //   .then((res) => {
  //     setData(res as RickAndMorty);
  //     setError(null);
  //   })
  //   .catch((e: Error) => {
  //     console.log(e);
  //     setError(e.message)
  //   })
  //   .finally(() => setLoading(false));
  // }, [url])

  return { data, error, loading }
}

export default useFetch