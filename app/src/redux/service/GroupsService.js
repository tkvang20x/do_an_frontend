import {axiosClient} from '../../common/http-commons';
import Utils from '../../common/utils';

const groupsService = {
    getList : () => {
        try {
            // Get data with default
                return axiosClient.get(
                    process.env.REACT_APP_GET_ALL_AND_CREATE_GROUP
                );
        } catch (error) {
            console.log("[Groups - Get list]", error);
        }
    }
}

export default groupsService;