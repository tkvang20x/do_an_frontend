import { httpAccess, JSON_CONTENT_TYPE } from "../../common/http-commons";
import Utils from "../../common/utils";
import CommonService from "./commonService";


const login = async (dataLogin) => {
    var loginResponse = null;
    try {
        const loginPath = process.env.REACT_APP_LOGIN_MANAGER_PATH;
        loginResponse = await httpAccess(JSON_CONTENT_TYPE).post(
            loginPath, JSON.stringify(dataLogin));
        return loginResponse;
    } catch (error) {
        console.log("[Engine]- Create", error);
        return CommonService.errorServiceHandle(error);
    }

}


const LoginService = {
    login
}

export default LoginService;