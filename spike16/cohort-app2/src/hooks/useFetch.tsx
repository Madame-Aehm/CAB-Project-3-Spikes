import { useState, useEffect } from 'react'

// interface ReturnData<T> {
//   loading: boolean;
//   data: T | null;
//   error: string;
// }

type ReturnArray<T> = [T | null, boolean, string]

interface NotOk {
  error: string
}

// const useFetch = <Placeholder,> (url: string): ReturnData<Placeholder> => {
export default function useFetch <Placeholder> (url: string): ReturnArray<Placeholder> {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState<Placeholder | null>(null);

  const handleError = (e: Error) => {
    console.log(e);
    setError(e.message);
  }
  
  useEffect(() => {
    setLoading(true);
    const fetchData = async() => {
      setError("");
      try {
        const response = await fetch(url);
        if (response.ok) {
          const result = await response.json() as Placeholder;
          setData(result);
        } else {
          const result = await response.json() as NotOk;
          setError(result.error);
        }
      } catch (e) {
        handleError(e as Error)
      }
    }

    fetchData()
      .catch((e) => {
        handleError(e as Error)
      })
      .finally(() => setLoading(false))
  }, [url]);

  return [ data, loading, error ]
}