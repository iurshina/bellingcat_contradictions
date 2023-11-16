import { createContext } from "react";


export interface IAppDataContext {
  models: string[];
  collections: string[];
  setCollections: (collections: string[]) => void;
}


const initialContext: IAppDataContext = {
  models: ["OpenAi", "OpenOrca-Platypus2-13B-Q4_K_M"],
  collections: [],
  setCollections: () => null
};

export const AppDataContext = createContext<IAppDataContext>(initialContext);
