import {FC, PropsWithChildren, useContext} from 'react';
import { AppDataContext } from './AppDataContext';

const AppDataProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const { models } = useContext(AppDataContext);
  const { collections, setCollections } = useContext(AppDataContext);
  const { model, setModel } = useContext(AppDataContext);
  const { collection, setCollection } = useContext(AppDataContext);
  const { topic, setTopic } = useContext(AppDataContext);

  const value = {
    models: models,
    collections: collections,
    setCollections: setCollections,
    model: model,
    setModel: setModel,
    collection: collection,
    setCollection: setCollection,
    topic: topic,
    setTopic: setTopic
  }

  return (
    <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
  );
};

export default AppDataProvider;

