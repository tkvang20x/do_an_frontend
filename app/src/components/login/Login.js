import React, { useState } from "react";
import image from '../../share/image/DRBS.jpg';
import "./Login.scss";
import { Input, Button } from 'antd';
import LoginService from '../../redux/service/LoginService';
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { startLoading, stopLoading } from "../../common/const";

const Login = ({ prefixPath, showToast }) => {

  const { register, formState: { errors }, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [formLogin, setFormLogin] = useState({})

  const [loginActive, setLoginActive] = useState(true)

  const handleChangeInput = (name, value) => {
    setFormLogin({
      ...formLogin,
      [name]: value
    })
  }

  const handleSubmitLogin = () => {
    startLoading();
    LoginService.login(formLogin).then(response => {
      console.log(response);
      if (response.data.status === 200) {
        window.localStorage.setItem("token", response.data.data.token)
        showToast("success", "Thông báo", "Đăng nhập thành công!");
        navigate(`${prefixPath}/manager`);
        stopLoading();
      } else if (response.data.status === 400) {
        stopLoading();
        showToast("error", "Thông báo", "Mật khẩu không chính xác, vui lòng thử lại!");
      }
      else {
        stopLoading();
        showToast("error", "Thông báo", "Tài khoản không tồn tại, vui lòng thử lại!");
      }
    })
  }

  const [emailInput, setEmailInput] = useState("")

  const handleOpenFogetPass = () => {
    setLoginActive(!loginActive)
  }

  const handleChangeEmail = (event) => {
    setEmailInput(event.target.value);
  }

  const handleClickForgetPass = () => {
    startLoading();
    if (emailInput === "" || emailInput.trim().length === 0){
      showToast("error", "Thông báo", "Email nhận mật khẩu không được để trống!");
      stopLoading();
      return
    }
    LoginService.forgetPassword(emailInput, "MANAGER").then(response => {
      console.log(response);
      if(response.data.data === true) {
        showToast("success", "Thông báo", "Mật khẩu mới đã được gửi đến email đăng ký tài khoản, vui lòng kiểm tra!");
        setEmailInput("")
        stopLoading();
      }
      else if(response.data.data === false){
        showToast("error", "Thông báo", "Email không tồn tại hoặc chưa được đăng ký !");
        stopLoading();
      }
    })
  }


  return (
    <div className='do-an-login__container' id="do-an-login" style={{ backgroundImage: `url(${image})` }}>
      {loginActive &&
        <form style={{ width: "30%" }} onSubmit={handleSubmit(handleSubmitLogin)}>
          <div className="do-an-login__container__form-login">
            <div className="do-an-login__container__form-login__title">
              <span className="do-an-title">ĐĂNG NHẬP</span>
            </div>
            <div className="do-an-login__container__form-login__group-input">
              {/* <Input className="do-an-input" placeholder="Tài khoản" />
              <Input className="do-an-input" placeholder="Mật khẩu" type="password" /> */}

              <input className={`form-control do-an-input ${errors.name ? 'is-invalid' : ''}`} placeholder="Tài khoản"
                {...register("username",
                  {
                    required: true,
                    maxLength: 32,
                    validate: value => value.trim().length > 0,
                    onChange: (e) => handleChangeInput("username", e.target.value),
                  }
                )} />
              {errors.username?.type === 'required' &&
                <div className="input-value-error">Tên Username không được để trống!</div>}
              {errors.username?.type === 'maxLength' &&
                <div className="input-value-error">Tên Username không được dài quá 32 ký tự!</div>}

              <input className={`form-control do-an-input ${errors.name ? 'is-invalid' : ''}`} placeholder="Mật khẩu"
                {...register("password",
                  {
                    required: true,
                    maxLength: 32,
                    validate: value => value.trim().length > 0,
                    onChange: (e) => handleChangeInput("password", e.target.value),
                  }
                )} />
              {errors.password?.type === 'required' &&
                <div className="input-value-error">Mật khẩu không được để trống!</div>}
              {errors.password?.type === 'maxLength' &&
                <div className="input-value-error">Mật khẩu không được dài quá 32 ký tự!</div>}
            </div>
            <div className="do-an-login__container__form-login__button-login">
              <button className="do-an-button" type="submit">Đăng nhập</button>
            </div>
            <div className="do-an-login__container__form-login__forget-pass" onClick={handleOpenFogetPass}>
              Quên mật khẩu?
            </div>
          </div>
        </form>
      }

      {!loginActive &&
        <div className="do-an-login__container__form-login" style={{ width: "28%", height:"28%" }}>
          <div className="do-an-login__container__form-login__title">
            <span className="do-an-title">QUÊN MẬT KHẨU</span>
          </div>
          <input value={emailInput} style={{ width: "95%" }} className={`form-control do-an-input`} placeholder="Email" onChange={handleChangeEmail} />

          <div className="do-an-login__container__form-login__button-login">
            <button className="do-an-button" type="submit" onClick={handleClickForgetPass}>Xác nhận gửi</button>
          </div>
          <div className="do-an-login__container__form-login__forget-pass" onClick={handleOpenFogetPass}>
              Quay lại đăng nhập!
            </div>
        </div>
      }
    </div>
  );
};

export default Login;
