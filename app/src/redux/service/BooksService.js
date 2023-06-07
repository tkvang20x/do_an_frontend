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
    },

    create: (formData) => {
        try {
            const booksData = JSON.stringify(
                {
                    name: formData.name,
                    description: formData.description,
                    title: formData.title,
                    author: formData.author,
                    name_university: formData.name_university,
                    publishing_year: formData.publishing_year,
                    origin: formData.origin,
                    group_code: formData.group_code,
                    amount: formData.amount,
                    cabinet: formData.cabinet
                });
            const formDataBooks = new FormData();
            formDataBooks.append("data", booksData);
            formDataBooks.append("avatar", formData.avatar);
            return axiosClient.post(process.env.REACT_APP_GET_LIST_AND_CREATE_BOOKS, formDataBooks,
                { headers: { "Content-Type": "multipart/form-data" } });
        } catch (error) {
            console.log("[Project - create]", error);
        }
    },

    getDetail: (code) => {
        try {
            // Get data with default
                return axiosClient.get(
                    process.env.REACT_APP_RUD_BOOKS.replace('{code}', code)
                );
        } catch (error) {
            console.log("[Books - Get detail]", error);
        }
    },

    updateBooks: (code, formData) => {
        try {
            const booksDataUpdate = JSON.stringify(
                {
                    name: formData.name,
                    description: formData.description,
                    title: formData.title,
                    author: formData.author,
                    name_university: formData.name_university,
                    publishing_year: formData.publishing_year,
                    origin: formData.origin,
                    group_code: formData.group_code
                });
            const formDataBooks = new FormData();
            formDataBooks.append("data_update", booksDataUpdate);
            if(formData.avatar){
                formDataBooks.append("avatar", formData.avatar);
            }
            // else{
            //     formDataBooks.append("avatar", null)
            // }
            return axiosClient.put(process.env.REACT_APP_RUD_BOOKS.replace('{code}',code), formDataBooks,
                { headers: { "Content-Type": "multipart/form-data" } });
        } catch (error) {
            console.log("[Project - update]", error);
        }
    },

    // ------------------------------------------------------------------------------------------------------------
    remove: (code) => {
        try {
            return axiosClient.delete(
                process.env.REACT_APP_RUD_BOOKS.replace("{code}", code)
            )
        } catch (error) {
            console.log("BooksService || Delete || Cause by ", error)
        }
    },
}

export default booksService;