import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import './CreateGroup.scss';

import GroupsAction from "../../../redux/action/GroupsAction";
import { openNotificationCommon } from "../../../common/const";

const CreateGroup = ({ onCloseModal }) => {

    const { register, formState: { errors }, handleSubmit } = useForm({ mode: "onChange" });
    const dispatch = useDispatch()
    const filter = useSelector(state => state.groupsReducer.paginationFilter)

    const [formCreate, setFormCreate] = useState(
        {
            group_code: "",
            group_name: "",
            description: "",
        }
    )



    const handleChangeInput = (field, value) => {
        let newFormData = {}
        newFormData = { ...formCreate, [field]: value };

        setFormCreate(newFormData)
    }

    const handleSubmitForm = () => {
        GroupsAction.createGroupAction(formCreate, dispatch, filter).then(response => {
            if (response === true) {
                onCloseModal()
            }
        })
    }

    return (
        <form id="do-an-form-create-group" onSubmit={handleSubmit(handleSubmitForm)}>
            <div className="do-an-form-create-group__body">
                <div className="do-an-form-create-group__body__content">
                    <div className="do-an-form-create-group__body__content__info">
                        <div className="do-an-form-create-group__body__group-input">
                            <div className="do-an-form-create-group__body__group-input__key">
                                <span>Tên thể loại: <i className="do-an__input-require">*</i></span>
                            </div>
                            <div className="do-an-form-create-group__body__group-input__input">
                                <input
                                    className={`do-an__input do-an-input-name ${errors.name ? 'is-invalid' : ''}`}
                                    {...register("group_name",
                                        {
                                            required: true,
                                            maxLength: 100,
                                            onChange: (e) => handleChangeInput("group_name", e.target.value)
                                        }
                                    )}
                                />
                                {errors.name?.type === "required" &&
                                    <div className="input-value-error">Tên người dùng không được trống!</div>}
                                {errors.name?.type === "maxLength" &&
                                    <div className="input-value-error">Tên người dùng không được vượt quá 100 ký tự!</div>}
                            </div>
                        </div>
                        <div className="do-an-form-create-group__body__group-input">
                            <div className="do-an-form-create-group__body__group-input__key">
                                <span>Mô tả:</span>
                            </div>
                            <div className="do-an-form-create-group__body__group-input__input">
                                <input
                                    className={`do-an__input do-an-input-name ${errors.name ? 'is-invalid' : ''}`}
                                    {...register("description",
                                        {
                                            maxLength: 100,
                                            onChange: (e) => handleChangeInput("description", e.target.value)
                                        }
                                    )}
                                />
                                {errors.description?.type === "maxLength" &&
                                    <div className="input-value-error">Mô tả không được vượt quá 100 ký tự!</div>}
                            </div>
                        </div>

                    </div>

                    <button id="do-an-form-create-group-button" type="submit" hidden={true}></button>
                </div>
            </div>
        </form>
    )
}

export default CreateGroup;