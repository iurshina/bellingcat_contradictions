import { AppConfigUrls } from '../AppConfigs';
import { AxiosInstance } from "axios";

export function listCollections(axios: AxiosInstance) {
    return axios.get(
        AppConfigUrls.baseUrl + AppConfigUrls.collection.list
    );
}