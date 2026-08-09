import { useEffect, useState } from 'react';

export function useProfileList(getProfiles) {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCurrent = true;

    async function loadProfiles() {
      setLoading(true);
      setError(null);

      try {
        const data = await getProfiles();
        if (isCurrent) setProfiles(data);
      } catch (requestError) {
        if (isCurrent) setError(requestError.message);
      } finally {
        if (isCurrent) setLoading(false);
      }
    }

    loadProfiles();
    return () => { isCurrent = false; };
  }, [getProfiles]);

  return { profiles, loading, error };
}
