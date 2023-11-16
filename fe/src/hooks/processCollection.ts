import axios from 'axios';
import { AppConfigUrls } from '../AppConfigs';

interface ProcessCollectionDataModel {
    model_type: string,
    topic: string,
    collection_name: string
}

const processCollection = () => {
    const process = async (model: string, topic: string, name: string) => {

        const body: ProcessCollectionDataModel = { 'model_type': model, 'topic': topic, 'collection_name': name };

        return await axios.post(
            AppConfigUrls.baseUrl + AppConfigUrls.collection.process,
            body
        );
    };

    return { process };
}

export default processCollection;
