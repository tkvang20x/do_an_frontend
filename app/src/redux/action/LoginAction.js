import { LoginSlice } from "../slice/LoginSlice";



const updateDataToken = (dispatch, decode) => {
    // dispath data to reducer
    dispatch(
        LoginSlice.actions.setDataToken(decode)
    );
};

const LoginAction = {
    updateDataToken
}

export default LoginAction;