import { useState, useEffect } from 'react';

export const useFetch = (url, ...dependencies) => {

  const [drills, setDrills] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
        fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
            setError(data.error);
            setDrills(null);
            setLoading(false);
            } else {
            setDrills(data);
            setError(null);
            setLoading(false);
            }
        });
    }, dependencies);

    return {
        drills: [drills, setDrills],
        loading: [loading, setLoading],
        error: [error, setError]
    }
};