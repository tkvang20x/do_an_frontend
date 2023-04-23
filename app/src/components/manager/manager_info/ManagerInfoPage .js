import React, { useEffect, useState } from "react";
import './ManagerInfoPage.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faInfoCircle, faKey, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ManagerAction from "../../../redux/action/ManagerAction";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import DropDown from "../../../share/ecm-base/components/dropdown-v2/DropDown";
import { useNavigate, useParams } from 'react-router-dom';
import ConstAPI from "../../../common/const";

const ManagerInfoPage = ({ prefixPath }) => {

    const [isActive, setIsActive] = useState("update")
    const listAction = [
        {
            title: "Chỉnh sửa thông tin",
            type: "update",
            icon: faInfoCircle
        },
        {
            title: "Thay đổi mật khẩu",
            type: "change",
            icon: faKey

        }
    ]

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

    const handleChangeType = (type) => {
        setIsActive(type)
    }

    const {code} = useParams()

    const detailManager = useSelector(state => state.managerReducer.detailManager)
    const { register, setValue, formState: { errors }, handleSubmit } = useForm({ mode: "onChange" });

    const [formUpdate, setFormUpdate] = useState({})
    const ditpatch = useDispatch()
    const navigate = useNavigate()


    useEffect(() => {
        ManagerAction.getDetailManagerAction(ditpatch, code)
    }, [code])

    useEffect(() => {
        setValue("name", detailManager?.name)
        setValue("date_of_birth", detailManager?.date_of_birth)
        setValue("course", detailManager?.course)
        setValue("university", detailManager?.university)
        setValue("phone", detailManager?.phone)
        setValue("email", detailManager?.email)

        setFormUpdate({
            "name": detailManager?.name,
            "date_of_birth": detailManager?.date_of_birth,
            "gender": detailManager?.gender,
            "course": detailManager?.course,
            "university": detailManager?.university,
            "phone": detailManager?.phone,
            "email": detailManager?.email
        })
    }, [detailManager])

    const handleChangeInput = (field, value) => {
        const newFormData = { ...formUpdate, [field]: value };
        setFormUpdate(newFormData)
    }

    const handleSubmitForm = () => {
        ManagerAction.updateManagerAction(ditpatch, code, formUpdate)
    }

    const [formChangePass, setFormChangePass] = useState({
        oldpass: "",
        newpass: ""
    })

    const handleChangePassInput = (name, value) => {
        setFormChangePass({
            ...formChangePass,
            [name] : value
        })
    }

    const handleChangePassword = () => {
        ManagerAction.changePasswordManagerAction(formChangePass)
        setFormChangePass({
            oldpass: "",
        newpass: ""
        })
    }


    return (
        <div className="do-an__info-manager-container">
            <div className="do-an__info-manager-container__info">
                <div className="do-an__info-manager-container__info__button-back">
                    <FontAwesomeIcon icon={faArrowLeft} style={{ height: "22px", marginTop: "5px", marginLeft: "5px", cursor: "pointer" }} onClick={() => navigate(-1)} />

                </div>
                <div className="do-an__info-manager-container__info__avatar">
                    {/* <FontAwesomeIcon style={{ height: "150px", marginBottom: "10px", cursor: "pointer" }} icon={faCircleUser}></FontAwesomeIcon> */}
                    <img style={{ height: "180px", width: "180px", borderRadius: "50%" }} src={`${ConstAPI.BASE_HOST_API}${detailManager?.avatar}`}></img>
                </div>
                <div className="do-an__info-manager-container__info__name">
                    kienlt
                </div>
                <div className="do-an__info-manager-container__info__list-action">
                    {
                        listAction.map(item => (
                            <div className={`do-an__info-manager-container__info__list-action__item ${isActive === item.type ? "item-active" : ""}`}
                                onClick={() => handleChangeType(item.type)}
                            >
                                <FontAwesomeIcon style={{ height: "20px", marginRight: "10px" }} icon={item.icon}></FontAwesomeIcon>
                                {item.title}
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="do-an__info-manager-container__action">
                {isActive === "update" &&
                    <form className="do-an__info-manager-container__action__update" onSubmit={handleSubmit(handleSubmitForm)}>
                        <div className="do-an__info-manager-container__action__update__title">
                            Chỉnh sửa thông tin
                        </div>
                        <div className="do-an__info-manager-container__action__update__content">
                            <div className="do-an__info-manager-container__action__update__content__group-input">
                                <div className="do-an__info-manager-container__action__update__content__group-input__key">
                                    <span>Họ và tên: <i className="do-an__input-require">*</i></span>
                                </div>
                                <div className="do-an__info-manager-container__action__update__content__group-input__input">
                                    <input
                                        className={`do-an__input do-an-input-name`}
                                        {...register("name",
                                            {
                                                required: true,
                                                onChange: (e) => handleChangeInput("name", e.target.value)
                                            }
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="do-an__info-manager-container__action__update__content__group-input">
                                <div className="do-an__info-manager-container__action__update__content__group-input__key">
                                    <span>Ngày sinh: <i className="do-an__input-require">*</i></span>
                                </div>
                                <div className="do-an__info-manager-container__action__update__content__group-input__input">
                                    <input
                                        className={`do-an__input do-an-input-name`}
                                        {...register("date_of_birth",
                                            {
                                                onChange: (e) => handleChangeInput("date_of_birth", e.target.value)
                                            }
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="do-an__info-manager-container__action__update__content__group-input">
                                <div className="do-an__info-manager-container__action__update__content__group-input__key">
                                    <span>Giới tính: <i className="do-an__input-require">*</i></span>
                                </div>
                                <div className="do-an__info-manager-container__action__update__content__group-input__input">
                                    <DropDown className="do-an-dropdown-create"
                                        listItem={listDefaultDropDown}
                                        selected={formUpdate?.gender || listDefaultDropDown[0]?.value}
                                        name="gender"
                                        onSelected={handleChangeInput}
                                    />
                                </div>
                            </div>
                            <div className="do-an__info-manager-container__action__update__content__group-input">
                                <div className="do-an__info-manager-container__action__update__content__group-input__key">
                                    <span>Khóa: <i className="do-an__input-require">*</i></span>
                                </div>
                                <div className="do-an__info-manager-container__action__update__content__group-input__input">
                                    <input
                                        className={`do-an__input do-an-input-name`}
                                        {...register("course",
                                            {
                                                required: true,
                                                onChange: (e) => handleChangeInput("course", e.target.value)
                                            }
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="do-an__info-manager-container__action__update__content__group-input">
                                <div className="do-an__info-manager-container__action__update__content__group-input__key">
                                    <span>Đại học: <i className="do-an__input-require">*</i></span>
                                </div>
                                <div className="do-an__info-manager-container__action__update__content__group-input__input">
                                    <input
                                        className={`do-an__input do-an-input-name`}
                                        {...register("university",
                                            {
                                                required: true,
                                                onChange: (e) => handleChangeInput("university", e.target.value)
                                            }
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="do-an__info-manager-container__action__update__content__group-input">
                                <div className="do-an__info-manager-container__action__update__content__group-input__key">
                                    <span>Số điện thoại: <i className="do-an__input-require">*</i></span>
                                </div>
                                <div className="do-an__info-manager-container__action__update__content__group-input__input">
                                    <input
                                        className={`do-an__input do-an-input-name`}
                                        {...register("phone",
                                            {
                                                required: true,
                                                onChange: (e) => handleChangeInput("phone", e.target.value)
                                            }
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="do-an__info-manager-container__action__update__content__group-input">
                                <div className="do-an__info-manager-container__action__update__content__group-input__key">
                                    <span>Email: <i className="do-an__input-require">*</i></span>
                                </div>
                                <div className="do-an__info-manager-container__action__update__content__group-input__input">
                                    <input
                                        className={`do-an__input do-an-input-name`}
                                        {...register("email",
                                            {
                                                required: true,
                                                onChange: (e) => handleChangeInput("email", e.target.value)
                                            }
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="do-an-update-manager-button">
                            <button className="button-search" type="submit">Xác nhận</button>
                        </div>
                    </form>
                }
                {isActive === "change" &&
                    <div className="do-an__info-manager-container__action__change">
                        <div className="do-an__info-manager-container__action__change__title">
                            Thay đổi mật khẩu
                        </div>
                        <div className="do-an__info-manager-container__action__change__group-input">
                            <div className="do-an__info-manager-container__action__change__group-input__key">
                                <span>Mật khẩu cũ: <i className="do-an__input-require">*</i></span>
                            </div>
                            <div className="do-an__info-manager-container__action__change__group-input__input">
                                <input
                                    className={`do-an__input do-an-input-name`}
                                    onChange={(e) => handleChangePassInput("oldpass", e.target.value)}
                                    value={formChangePass.oldpass}
                                />
                            </div>
                        </div>
                        <div className="do-an__info-manager-container__action__change__group-input">
                            <div className="do-an__info-manager-container__action__change__group-input__key">
                                <span>Mật khẩu mới: <i className="do-an__input-require">*</i></span>
                            </div>
                            <div className="do-an__info-manager-container__action__change__group-input__input">
                                <input
                                    className={`do-an__input do-an-input-name`}
                                    onChange={(e) => handleChangePassInput("newpass", e.target.value)}
                                    value={formChangePass.newpass}
                                />
                            </div>
                        </div>
                        <div className="do-an-update-manager-button">
                            <button className="button-search" type="button" onClick={handleChangePassword}>Xác nhận</button>
                        </div>

                    </div>
                }
            </div>
        </div>
    )
}

export default ManagerInfoPage;