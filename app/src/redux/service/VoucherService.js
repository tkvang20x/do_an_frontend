import {axiosClient} from '../../common/http-commons';
import Utils from '../../common/utils';

const VoucherService = {
    getList : (paging) => {
        try {
            // Get data with default
            if (!Utils.isNotNullOrUndefined(paging)) {
                return axiosClient.get(
                    process.env.REACT_APP_GET_LIST_AND_CREATE_VOUCHER
                );
                // Get data with parameters
            } else {
                return axiosClient.get(
                    process.env.REACT_APP_GET_LIST_AND_CREATE_VOUCHER,
                    { params: paging }
                );
            }
        } catch (error) {
            console.log("[Voucher - Get list]", error);
        }
    },

    create: (formDataVoucher) => {
        try {
            return axiosClient.post(process.env.REACT_APP_GET_LIST_AND_CREATE_VOUCHER, formDataVoucher)
                // { headers: { "Content-Type": "multipart/form-data" } });
        } catch (error) {
            console.log("[BookVoucherService - create]", error);
        }
    },

    getDetail: (voucher_id) => {
        try {
            // Get data with default
                return axiosClient.get(
                    process.env.REACT_APP_RUD_VOUCHER.replace('{voucher_id}', voucher_id)
                );
        } catch (error) {
            console.log("[BookVoucherService - Get detail]", error);
        }
    },

    updateVoucher: (voucher_id, formDataVoucher) => {
        try {
            // Get data with default
                return axiosClient.put(
                    process.env.REACT_APP_RUD_VOUCHER.replace('{voucher_id}', voucher_id), formDataVoucher
                );
        } catch (error) {
            console.log("[BookVoucherService - Update voucher]", error);
        }
    },

    // ------------------------------------------------------------------------------------------------------------
    remove: (voucher_id) => {
        try {
            return axiosClient.delete(
                process.env.REACT_APP_RUD_VOUCHER.replace("{voucher_id}", voucher_id)
            )
        } catch (error) {
            console.log("BooksService || Delete || Cause by ", error)
        }
    },
}

export default VoucherService;