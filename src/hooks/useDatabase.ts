// Firebase desabilitado
import { useEffect, useState } from 'react';

export function useDatabase<T>(path: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const updateData = async (newData: Partial<T>) => {
    return true;
  };

  return { data, loading, error, updateData };
}