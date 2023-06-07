import { axiosClient } from '../../common/http-commons';
import Utils from '../../common/utils';

const bookService = {
    getListBook: (paging, code_books) => {
        try {
            // Get data with default
            if (!Utils.isNotNullOrUndefined(paging)) {
                return axiosClient.get(
                    process.env.REACT_APP_GET_LIST_AND_CREATE_BOOK.replace('{code_books}', code_books)
                );
                // Get data with parameters
            } else {
                return axiosClient.get(
                    process.env.REACT_APP_GET_LIST_AND_CREATE_BOOK.replace('{code_books}', code_books),
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
    },

    createBook: (formData) => {
        try {
            const booksData = JSON.stringify(
                {
                    code_books : formData.code_books ,
                    amount : formData.amount,
                    compartment : formData.compartment,
                });

            return axiosClient.post(process.env.REACT_APP_CREATE_BOOK, booksData)
        } catch (error) {
            console.log("[Project - create]", error);
        }
    },

    deleteBook: (code_id) => {
        try {
            // Get data with default
            return axiosClient.delete(
                process.env.REACT_APP_RUD_BOOK.replace('{code_id}', code_id)
            );
        } catch (error) {
            console.log("[Book - Delete Book]", error);
        }
    },

    updateBook: (code_id, formUpdate) => {
        try {
            // Get data with default
            return axiosClient.put(
                process.env.REACT_APP_RUD_BOOK.replace('{code_id}', code_id), formUpdate
            );
        } catch (error) {
            console.log("[Book - Update Book]", error);
        }
    },

    updateUserBook: (code_id, formUpdate) => {
        try {
            // Get data with default
            return axiosClient.put(
                process.env.REACT_APP_UPDATE_USER_BOOK.replace('{code_id}', code_id), formUpdate
            );
        } catch (error) {
            console.log("[Book - Update User Book]", error);
        }
    },
}

export default bookService;