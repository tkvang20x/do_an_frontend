import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import './CreateManager.scss';
import image2 from '../../../share/image/123.jpg';
import ConstAPI from '../../../common/const';
import constImage from "../../../common/constImage";
import ManagerAction from "../../../redux/action/ManagerAction";
import DropDown from '../../../share/ecm-base/components/dropdown-v2/DropDown';
import { DatePicker } from 'antd';

const CreateManager = ({ onCloseModal }) => {

    const { register, formState: { errors }, handleSubmit } = useForm({ mode: "onChange" });
    const dispatch = useDispatch()
    const [image, setImage] = useState(image2)
    const filter = useSelector(state => state.managerReducer.paginationFilter)

    const [formCreate, setFormCreate] = useState(
        {
            name: "",
            date_of_birth: "",
            gender: "MALE",
            course: "",
            university: "",
            phone: "",
            email: "",
            user_name: "",
            password: "",
            role: "MANAGER",
            avatar: null
        }
    )

    const [listDefaultDropDown, setListDefaultDropDown] = useState([
        {
            title: "Nam",
            value: "MALE"
        },
        {
            title: "Nữ",
            value: "FEMALE"
        }
    ])


    const checkFileTypeAvatar = (files) => {
        const { length } = files;
        if (length > 0) {
            const { type } = files[0];
            return (constImage.LIST_FILE_TYPE_AVATAR.findIndex(item => `IMAGE/${item}` === type.toLocaleUpperCase()) > -1)
        }
        return true
    }
    const checkFileSizeAvatar = (files) => {
        const { length } = files;
        if (length > 0) {
            const { size } = files[0];
            return (size / 1024 / 1024 <= 5)
        }
        return true
    }

    const onImageChange = async (event) => {
        if (event.target.files && event.target.files[0] && event.target.files[0]['type'].split('/')[0] === 'image') {
            console.log(event.target.files);

            setImage(URL.createObjectURL(event.target.files[0]));
            handleChangeInput("avatar", event.target.files[0])
        }
    }

    const handleChangeInput = (field, value) => {

            let newFormData = {}
            if (field === "date_of_birth") {
                newFormData = { ...formCreate, [field]: value.format("YYYY-MM-DD") }
            } else {
                newFormData = { ...formCreate, [field]: value };
    
            }
            setFormCreate(newFormData)
    }

    const handleSubmitForm = () => {
        ManagerAction.createManagerAction(formCreate, dispatch, filter)
        onCloseModal()
    }


    return (
        <form id="do-an-form-create-manager" onSubmit={handleSubmit(handleSubmitForm)}>
            <div className="do-an-form-create-manager__body">
                <div className="do-an-form-create-manager__body__content">
                    <div className="do-an-form-create-manager__body__content__info">
                        <div className="do-an-form-create-manager__body__group-input">
                            <div className="do-an-form-create-manager__body__group-input__key">
                                <span>Tên người dùng: <i className="do-an__input-require">*</i></span>
                            </div>
                            <div className="do-an-form-create-manager__body__group-input__input">
                                <input
                                    className={`do-an__input do-an-input-name ${errors.name ? 'is-invalid' : ''}`}
                                    {...register("name",
                                        {
                                            required: true,
                                            maxLength: 100,
                                            onChange: (e) => handleChangeInput("name", e.target.value)
                                        }
                                    )}
                                />
                                {errors.name?.type === "required" &&
                                    <div className="input-value-error">Tên người dùng không được trống!</div>}
                                {errors.name?.type === "maxLength" &&
                                    <div className="input-value-error">Tên người dùng không được vượt quá 100 ký tự!</div>}
                            </div>
                        </div>
                        <div className="do-an-form-create-manager__body__group-input">
                            <div className="do-an-form-create-manager__body__group-input__key">
                                <span>Giới tính: <i className="do-an__input-require">*</i></span>
                            </div>
                            <div className="do-an-form-create-manager__body__group-input__input">
                                <DropDown className="do-an-dropdown-create"
                                    listItem={listDefaultDropDown}
                                    selected={formCreate.gender || listDefaultDropDown[0]?.value}
                                    name="gender"
                                    onSelected={handleChangeInput}
                                />

                            </div>
                        </div>
                        <div className="do-an-form-create-manager__body__group-input">
                            <div className="do-an-form-create-manager__body__group-input__key">
                                <span>Ngày sinh:</span>
                            </div>
                            <div className="do-an-form-create-manager__body__group-input__input">
                                {/* <input
                                    className={`do-an__input do-an-input-name ${errors.name ? 'is-invalid' : ''}`}
                                    {...register("date_of_birth",
                                        {
                                            onChange: (e) => handleChangeInput("date_of_birth", e.target.value)
                                        }
                                    )}
                                /> */}
                                <DatePicker
                                placeholder="Ngày sinh"
                                    onChange={(e) => handleChangeInput("date_of_birth", e)}
                                >

                                </DatePicker>
                            </div>
                        </div>
                        <div className="do-an-form-create-manager__body__group-input">
                            <div className="do-an-form-create-manager__body__group-input__key">
                                <span>Sinh viên khóa: <i className="do-an__input-require">*</i></span>
                            </div>
                            <div className="do-an-form-create-manager__body__group-input__input">
                                <input
                                    className={`do-an__input do-an-input-name ${errors.name ? 'is-invalid' : ''}`}
                                    {...register("course",
                                        {
                                            required: true,
                                            maxLength: 10,
                                            onChange: (e) => handleChangeInput("course", e.target.value)
                                        }
                                    )}
                                />
                                {errors.course?.type === "required" &&
                                    <div className="input-value-error">Niên khóa không được trống!</div>}
                                {errors.course?.type === "maxLength" &&
                                    <div className="input-value-error">Biên khóa không được vượt quá 10 ký tự!</div>}
                            </div>
                        </div>
                        <div className="do-an-form-create-manager__body__group-input">
                            <div className="do-an-form-create-manager__body__group-input__key">
                                <span>Đại học: <i className="do-an__input-require">*</i></span>
                            </div>
                            <div className="do-an-form-create-manager__body__group-input__input">
                                <input
                                    className={`do-an__input do-an-input-name ${errors.name ? 'is-invalid' : ''}`}
                                    {...register("university",
                                        {
                                            required: true,
                                            maxLength: 100,
                                            onChange: (e) => handleChangeInput("university", e.target.value)
                                        }
                                    )}
                                />
                               {errors.university?.type === "required" &&
                                    <div className="input-value-error">Tên đại học không được trống!</div>}
                                {errors.university?.type === "maxLength" &&
                                    <div className="input-value-error">Tên đại học không được vượt quá 100 ký tự!</div>}
                            </div>
                        </div>
                        <div className="do-an-form-create-manager__body__group-input">
                            <div className="do-an-form-create-manager__body__group-input__key">
                                <span>Số điện thoại: <i className="do-an__input-require">*</i></span>
                            </div>
                            <div className="do-an-form-create-manager__body__group-input__input">
                                <input
                                    className={`do-an__input do-an-input-name ${errors.name ? 'is-invalid' : ''}`}
                                    {...register("phone",
                                        {
                                            required: true,
                                            maxLength: 10,
                                            onChange: (e) => handleChangeInput("phone", e.target.value)
                                        }
                                    )}
                                    type="number"
                                />
                                {errors.phone?.type === "required" &&
                                    <div className="input-value-error">Số điện thoại không được trống!</div>}
                                {errors.phone?.type === "maxLength" &&
                                    <div className="input-value-error">Số điện thoại không được vượt quá 10 ký tự!</div>}
                            </div>
                        </div>
                        <div className="do-an-form-create-manager__body__group-input">
                            <div className="do-an-form-create-manager__body__group-input__key">
                                <span>Email: <i className="do-an__input-require">*</i></span>
                            </div>
                            <div className="do-an-form-create-manager__body__group-input__input">
                                <input
                                    className={`do-an__input do-an-input-name ${errors.name ? 'is-invalid' : ''}`}
                                    {...register("email",
                                        {
                                            required: true,
                                            maxLength: 100,
                                            onChange: (e) => handleChangeInput("email", e.target.value)
                                        }
                                    )}
                                />
                                {errors.email?.type === "required" &&
                                    <div className="input-value-error">Tên email không được trống!</div>}
                                {errors.email?.type === "maxLength" &&
                                    <div className="input-value-error">Tên email không được vượt quá 100 ký tự!</div>}
                            </div>
                        </div>
                        <div className="do-an-form-create-manager__body__group-input">
                            <div className="do-an-form-create-manager__body__group-input__key">
                                <span>Tên tài khoản: <i className="do-an__input-require">*</i></span>
                            </div>
                            <div className="do-an-form-create-manager__body__group-input__input">
                                <input
                                    className={`do-an__input do-an-input-name ${errors.name ? 'is-invalid' : ''}`}
                                    {...register("user_name",
                                        {
                                            required: true,
                                            maxLength: 50,
                                            onChange: (e) => handleChangeInput("user_name", e.target.value)
                                        }
                                    )}
                                />
                                {errors.user_name?.type === "required" &&
                                    <div className="input-value-error">Tên tài khoản không được trống!</div>}
                                {errors.user_name?.type === "maxLength" &&
                                    <div className="input-value-error">Tên tài khoản không được vượt quá 50 ký tự!</div>}
                            </div>
                        </div>
                        <div className="do-an-form-create-manager__body__group-input">
                            <div className="do-an-form-create-manager__body__group-input__key">
                                <span>Mật khẩu: <i className="do-an__input-require">*</i></span>
                            </div>
                            <div className="do-an-form-create-manager__body__group-input__input">
                                <input
                                    className={`do-an__input do-an-input-name ${errors.name ? 'is-invalid' : ''}`}
                                    {...register("password",
                                        {
                                            required: true,
                                            onChange: (e) => handleChangeInput("password", e.target.value)
                                        }
                                    )}
                                    type="password"
                                />
                                {errors.password?.type === "required" &&
                                    <div className="input-value-error">Mật khẩu không được trống!</div>}
                            </div>
                        </div>
                    </div>
                    {/* <div className="do-an-form-create-manager__body__content__avatar">
                        <div className="do-an-form-create-manager__body__group-input__input-add-image">
                            <div>
                                <input type="file" accept="image/*" className={`ocr-designer-input-add-image ${errors.image ? 'is-invalid' : ''}`}
                                    {...register("avatar",
                                        {
                                            onChange: (e) => onImageChange(e),
                                            validate: {
                                                checkFileType: files => checkFileTypeAvatar(files) || `Ảnh đại diện chỉ nhận các file ${constImage.LIST_FILE_TYPE_AVATAR.join(", ")}`,
                                                checkFileSize: files => checkFileSizeAvatar(files) || "Ảnh đại diện không vượt quá 5MB"
                                            }
                                        }
                                    )} />
                                {errors.avatar?.message &&
                                    <div className="input-value-error">{errors.avatar?.message}</div>}
                            </div>
                            <img className="do-an-preview-image" src={image}></img>
                            <div className="do-an-title-avatar">
                                Ảnh đại diện
                            </div>
                        </div>
                    </div> */}
                    <button id="do-an-form-create-manager-button" type="submit" hidden={true}></button>
                </div>
            </div>
        </form>
    )
}

export default CreateManager;