import axios from 'axios';
import { AppConfigUrls } from '../AppConfigs';

interface CollectionDataModel {
  path: string,
  name: string
}

const sendCollectionData = () => {
  const send = async (path: string, name: string) => {

    const body: CollectionDataModel = { 'path': path, 'name': name };

    await axios.post(
        AppConfigUrls.baseUrl + AppConfigUrls.collection.setup,
        body
    );
  };

  return { send };
}

export default sendCollectionData;
