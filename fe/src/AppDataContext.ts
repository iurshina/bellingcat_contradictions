import { createContext } from "react";


export interface IAppDataContext {
  models: string[];
  collections: string[];
  setCollections: (collections: string[]) => void;
  model: string,
  setModel: (model: string) => void;
  collection: string,
  setCollection: (collection: string) => void;
  topic: string,
  setTopic: (topic: string) => void
}


const initialContext: IAppDataContext = {
  models: ["openAI", "llama"],
  collections: [],
  setCollections: () => null,
  model: "",
  setModel: () => null,
  collection: "",
  setCollection: () => null,
  topic: "",
  setTopic: () => null,
};

export const AppDataContext = createContext<IAppDataContext>(initialContext);
