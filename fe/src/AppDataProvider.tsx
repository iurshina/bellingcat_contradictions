import {FC, PropsWithChildren, useContext, useEffect} from 'react';
import { AppDataContext } from './AppDataContext';
import { useAxios } from './useAxios';
import { listCollections } from "./functions/listCollections";

const AppDataProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const { models } = useContext(AppDataContext);
  const { collections, setCollections } = useContext(AppDataContext);
  const { axios } = useAxios();

  const value = {
    models: models,
    collections: collections,
    setCollections: setCollections
  }

  useEffect(() => {

    Promise.all([listCollections(axios)])
      .then(([response]) => {
        setCollections(response.data)
      })
      .catch(function (err) {
        console.log(err.message);
      });
  }, []);

  return (
    <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
  );
};

export default AppDataProvider;

