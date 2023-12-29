import axious from 'axios';
import { DataRequest } from './dto/dataDTO';

const config = {
    url: "http://localhost:3000/api",
    options: {
        headers: {
            "Content-Type": "application/json",
        },
    },
};

const getApi = async (url: string) => {
    const { data } = await axious.get(`${config.url}/${url}`, config.options);
    return data;
}

const postApi = async (url: string, body: DataRequest) => {
    const { data } = await axious.post(`${config.url}/${url}`, body, config.options);
    return data;
}

export { getApi, postApi };