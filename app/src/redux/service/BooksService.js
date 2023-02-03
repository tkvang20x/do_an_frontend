import {axiosClient} from '../../common/http-commons';
import Utils from '../../common/utils';

const booksService = {
    getList : (paging) => {
        try {
            // Get data with default
            if (!Utils.isNotNullOrUndefined(paging)) {
                return axiosClient.get(
                    process.env.REACT_APP_GET_LIST_AND_CREATE_BOOKS
                );
                // Get data with parameters
            } else {
                return axiosClient.get(
                    process.env.REACT_APP_GET_LIST_AND_CREATE_BOOKS,
                    { params: paging }
                );
            }
        } catch (error) {
            console.log("[Books - Get list]", error);
        }
    }
}

export default booksService;