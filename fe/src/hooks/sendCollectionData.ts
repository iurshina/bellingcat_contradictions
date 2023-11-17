import axios from 'axios';
import { AppConfigUrls } from '../AppConfigs';

interface CollectionDataModel {
  path: string,
  collection_name: string
}

const sendCollectionData = () => {
  const send = async (path: string, name: string) => {

    const body: CollectionDataModel = { 'path': path, 'collection_name': name };

    const config = {
      withCredentials: true,
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };

    return await axios.post(
        AppConfigUrls.baseUrl + AppConfigUrls.collection.setup,
        body,
        config
    );
  };

  return { send };
}

export default sendCollectionData;
