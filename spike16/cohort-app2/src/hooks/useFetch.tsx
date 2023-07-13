import { useState, useEffect } from 'react'

const useFetch = (url: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const [data, setData] = useState<any>();



  // useEffect(() => {
  //   const fetchData = async() => {
  //     try {
  //       const response = await fetch(url);
  //       const result = await response.json();
  //       setData(result);
  //     } catch (e) {
  //       console.log(e);
  //       const { message } = e as Error
  //       setError(message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   fetchData();
  // }, []);

  useEffect(() => {
    setLoading(true);
    console.log("use effect running")

    fetch(url)
    .then((res) => res.json())
    .then((res) => {
      setData(res);
      setError(null);
    })
    .catch((e: Error) => {
      console.log(e);
      setError(e.message)
    })
    .finally(() => setLoading(false));
  }, [url])

  return { data, error, loading }
}

export default useFetch