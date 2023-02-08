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
        console.log(formData);
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
                    amount: formData.amount
                });
                console.log(booksData);
            const formDataBooks = new FormData();
            formDataBooks.append("data", booksData);
            formDataBooks.append("avatar", formData.avatar);
            return axiosClient.post(process.env.REACT_APP_GET_LIST_AND_CREATE_BOOKS, formDataBooks,
                { headers: { "Content-Type": "multipart/form-data" } });
        } catch (error) {
            console.log("[Project - create]", error);
        }
    }

}

export default booksService;