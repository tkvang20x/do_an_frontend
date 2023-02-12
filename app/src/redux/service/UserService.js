import { axiosClient } from '../../common/http-commons';
import Utils from '../../common/utils';

const UserService = {
    getListUser: (paging) => {
        try {
            // Get data with default
            if (!Utils.isNotNullOrUndefined(paging)) {
                return axiosClient.get(
                    process.env.REACT_APP_GET_LIST_AND_CREATE_USERS
                );
                // Get data with parameters
            } else {
                return axiosClient.get(
                    process.env.REACT_APP_GET_LIST_AND_CREATE_USERS,
                    { params: paging }
                );
            }
        } catch (error) {
            console.log("[User - Get list]", error);
        }
    },

    getDetailUser: (code) => {
        try {
            // Get data with default
            return axiosClient.get(
                process.env.REACT_APP_RUD_USERS.replace('{code}', code)
            );
        } catch (error) {
            console.log("[UserService - Get detail]", error);
        }
    },

     // ------------------------------------------------------------------------------------------------------------
     remove: (code) => {
        try {
            return axiosClient.delete(
                process.env.REACT_APP_RUD_USERS.replace("{code}", code)
            )
        } catch (error) {
            console.log("UserService || Delete || Cause by ", error)
        }
    },
}

export default UserService;