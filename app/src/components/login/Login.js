import React, { useState } from "react";
import image from '../../share/image/DRBS.jpg';
import "./Login.scss";
import { Input, Button } from 'antd';
import LoginService from '../../redux/service/LoginService';
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { startLoading, stopLoading } from "../../common/const";

const Login = ({prefixPath, showToast}) => {

  const { register, formState: { errors }, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [formLogin, setFormLogin] = useState({})

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
      if (response.data.status === 200){
        window.localStorage.setItem("token", response.data.data.token)
        showToast("success", "Thông báo", "Đăng nhập thành công!");
        navigate(`${prefixPath}/manager`);
        stopLoading();
      } else if(response.data.status === 400) {
        stopLoading();
        showToast("error", "Thông báo", "Mật khẩu không chính xác, vui lòng thử lại!");
      }
      else{
        stopLoading();
        showToast("error", "Thông báo", "Tài khoản không tồn tại, vui lòng thử lại!");
      }
    })
  }

  console.log(formLogin);



  return (
    <form onSubmit={handleSubmit(handleSubmitLogin)}>
      <div className='do-an-login__container' id="do-an-login" style={{ backgroundImage: `url(${image})` }}>
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
                  maxLength: 100,
                  validate: value => value.trim().length > 0,
                  onChange: (e) => handleChangeInput("username", e.target.value),
                }
              )} />
            {errors.username?.type === 'required' &&
              <div className="input-value-error">Tên Username không được để trống!</div>}

            <input className={`form-control do-an-input ${errors.name ? 'is-invalid' : ''}`} placeholder="Mật khẩu"
              {...register("password",
                {
                  required: true,
                  maxLength: 100,
                  validate: value => value.trim().length > 0,
                  onChange: (e) => handleChangeInput("password",e.target.value),
                }
              )} />
            {errors.username?.type === 'required' &&
              <div className="input-value-error">Mật khẩu không được để trống!</div>}
          </div>
          <div className="do-an-login__container__form-login__button-login">
            <button className="do-an-button" type="submit">Đăng nhập</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
