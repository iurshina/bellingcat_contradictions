import axios from 'axios';
import { useMemo } from 'react';

export const useAxios = () => {

  const client = useMemo(() => {
    const client = axios.create({
      withCredentials: true,
      baseURL: "/",
      headers: { "Content-Type": "application/json" }
    });

    return client;
  }, []);

  return { axios: client };
};
