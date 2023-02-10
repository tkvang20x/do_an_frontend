import { axiosClient } from '../../common/http-commons';
import Utils from '../../common/utils';

const bookService = {
    getListBook: (paging, code_id) => {
        try {
            // Get data with default
            if (!Utils.isNotNullOrUndefined(paging)) {
                return axiosClient.get(
                    process.env.REACT_APP_GET_LIST_AND_CREATE_BOOK.replace('{code_id}', code_id)
                );
                // Get data with parameters
            } else {
                return axiosClient.get(
                    process.env.REACT_APP_GET_LIST_AND_CREATE_BOOK.replace('{code_id}', code_id),
                    { params: paging }
                );
            }
        } catch (error) {
            console.log("[Book - Get list]", error);
        }
    },

    getDetailBook: (code_id) => {
        try {
            // Get data with default
            return axiosClient.get(
                process.env.REACT_APP_RUD_BOOK.replace('{code_id}', code_id)
            );
        } catch (error) {
            console.log("[Book - Get detail]", error);
        }
    }
}

export default bookService;