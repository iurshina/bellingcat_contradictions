import axios from 'axios';
import { useContext } from 'react';
import {AppDataContext} from "../AppDataContext";
import {AppConfigUrls} from "../AppConfigs";

const reloadCollections = () => {
    const { setCollections } = useContext(AppDataContext);

    const reload = async () => {
        const response = await axios.get(
            AppConfigUrls.baseUrl + AppConfigUrls.collection.list
        );
        if (response.status === 200) {
            setCollections(response.data);
        } else {
            throw new Error('Error reloading collections. Unexpected response.');
        }
    };

    return { reload };
}

export default reloadCollections;
