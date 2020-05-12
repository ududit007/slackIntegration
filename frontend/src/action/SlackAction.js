import {axiosInstance}  from "../config/Client";
import {uiConst} from "../config/Constants";
import Axios from 'axios';

// Action to get token for selected workspace
export const getToken = async(code) => {
    try {
        const  url =  `${uiConst.slackTokenUrl}${code}`
        console.log("url:", url)
        const response = await Axios.get(
           url
        );
        console.log("response_data:", response.data)
        let access_token = response.data["authed_user"].access_token;
        return access_token
      } catch (error) {
        console.log(error);
      }
      return false
}

// Action to get conversation of selected channel
export const getConversations = async (id, startDate, endDate) => {
    try {
        let result = await axiosInstance.get(
            `/conversation?id=${id}&start_date=${startDate}&end_date=${endDate}`,
        );

        if (200 === result.status) {
            return result.data;
        }
    } catch (error) {
        if(401 === error.response.status) {
            return false;
        }
        throw error.response;
    }
    return false;
}


// Action to get channel List of selected team
export const getChannelList = async (tokenTeamObj) => {
    try {
        let result = await axiosInstance.post(`/tokens/`, tokenTeamObj);

        if (200 === result.status) {
            return result.data;
        }
    } catch (error) {
        if(401 === error.response.status) {
            return false;
        }
        throw error.response;
    }
    return false;
}
