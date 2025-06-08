import { ref, onValue, off, set, DatabaseReference } from 'firebase/database';
import { database } from '../integrations/firebase/client';
import { useEffect, useState } from 'react';

export function useDatabase<T>(path: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const dbRef = ref(database, path);
    setLoading(true);
    
    const listener = onValue(
      dbRef, 
      (snapshot) => {
        setData(snapshot.val());
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => off(dbRef, 'value', listener);
  }, [path]);

  const updateData = async (newData: Partial<T>) => {
    try {
      const dbRef = ref(database, path);
      await set(dbRef, newData);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      return false;
    }
  };

  return { data, loading, error, updateData };
}