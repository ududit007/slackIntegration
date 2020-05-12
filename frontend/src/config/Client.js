import Axios from 'axios';
import {uiConst} from './Constants';


const axiosInstance = Axios.create({
    baseURL: uiConst.url,
    headers: {
        'Content-Type': 'application/json'
    }
});

export {
    axiosInstance
};


