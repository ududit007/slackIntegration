import {axiosInstance}  from "../config/Client";


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
