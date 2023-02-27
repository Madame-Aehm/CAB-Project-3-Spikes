import React, { useEffect, useState } from 'react'

function useFetch(url, all) {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchFunction = async() => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const result = await response.json();
      result.error ? setError(result.error) : all ? setResult(result.results) : setResult(result);
      setLoading(false);
    } catch (err) {
      setError(err)
      setLoading(false);
    }
    
  }

  useEffect(() => {
    fetchFunction()
  }, [url]);
  

  return { result, error, loading }
}

export default useFetch