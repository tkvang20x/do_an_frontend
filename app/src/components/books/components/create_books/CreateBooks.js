import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import './CreateBooks.scss';
import image2 from '../../../../share/image/123.jpg';
import ConstAPI from '../../../../common/const';
import constImage from "../../../../common/constImage";
import BooksAction from "../../../../redux/action/BooksAction";
import DropDown from '../../../../share/ecm-base/components/dropdown-v2/DropDown';
import GroupsAction from "../../../../redux/action/GroupsAction";


const CreateBooks = ({ onCloseModal }) => {

    const { setValue, register, formState: { errors }, handleSubmit } = useForm({ mode: "onChange" });
    const dispatch = useDispatch()
    const [image, setImage] = useState(image2)
    const filter = useSelector(state => state.booksReducer.paginationFilter)
    const listGroups = useSelector(state => state.groupsReducer.listGroups)

    const [formCreate, setFormCreate] = useState(
        {
            name: "",
            description: "",
            title: "",
            author: "",
            name_university: "",
            publishing_year: "",
            origin: "",
            group_code: "GROUPS_1673458766",
            amount: 1,
            avatar: null
        }
    )

    useEffect(() => {
        GroupsAction.getListGroupsAction(dispatch)
        setValue("amount", formCreate.amount)
    }, [])



    const [listDefaultDropDown, setListDefaultDropDown] = useState([])

    useEffect(() => {
        let listGrgoupsDropDown = listGroups.map((item) => {
            return {
                title: item?.group_name,
                value: item?.group_code
            }
        })
        setListDefaultDropDown([...listGrgoupsDropDown])
    }, [listGroups])

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
        console.log(value, field);
        const newFormData = { ...formCreate, [field]: value };
        setFormCreate(newFormData)
    }

    const handleSubmitForm = () => {
        BooksAction.createBooksAction(formCreate, dispatch, filter)
        onCloseModal()
    }

    console.log(formCreate);





    return (
        <form id="do-an-form-create-books" onSubmit={handleSubmit(handleSubmitForm)}>
            <div className="do-an-form-create-books__body">
                {/* <div className="do-an-form-create-books__body__title">
                    Thông tin:
                </div> */}

                <div className="do-an-form-create-books__body__content">
                    <div className="do-an-form-create-books__body__content__info">
                        <div className="do-an-form-create-books__body__group-input">
                            <div className="do-an-form-create-books__body__group-input__key">
                                <span>Tên Sách: <i className="do-an__input-require">*</i></span>
                            </div>
                            <div className="do-an-form-create-books__body__group-input__input">
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
                                    <div className="input-value-error">Tên sách không được trống!</div>}
                                {errors.name?.type === "maxLength" &&
                                    <div className="input-value-error">Tên sách không được vượt quá 100 ký tự!</div>}
                            </div>
                        </div>
                        <div className="do-an-form-create-books__body__group-input">
                            <div className="do-an-form-create-books__body__group-input__key">
                                <span>Thể loại: <i className="do-an__input-require">*</i></span>
                            </div>
                            <div className="do-an-form-create-books__body__group-input__input">
                                <DropDown className="do-an-dropdown-create"
                                    listItem={listDefaultDropDown}
                                    selected={formCreate.group_code || listDefaultDropDown[0]?.value}
                                    name="group_code"
                                    onSelected={handleChangeInput}
                                />

                            </div>
                        </div>
                        <div className="do-an-form-create-books__body__group-input">
                            <div className="do-an-form-create-books__body__group-input__key">
                                <span>Mô tả:</span>
                            </div>
                            <div className="do-an-form-create-books__body__group-input__input">
                                <input
                                    className={`do-an__input do-an-input-name ${errors.name ? 'is-invalid' : ''}`}
                                    {...register("description",
                                        {
                                            maxLength: 500,
                                            onChange: (e) => handleChangeInput("description", e.target.value)
                                        }
                                    )}
                                />
                                {errors.description?.type === "maxLength" &&
                                    <div className="input-value-error">Mô tả sách không được vượt quá 500 ký tự!</div>}
                            </div>
                        </div>
                        <div className="do-an-form-create-books__body__group-input">
                            <div className="do-an-form-create-books__body__group-input__key">
                                <span>Tiêu đề: <i className="do-an__input-require">*</i></span>
                            </div>
                            <div className="do-an-form-create-books__body__group-input__input">
                                <input
                                    className={`do-an__input do-an-input-name ${errors.name ? 'is-invalid' : ''}`}
                                    {...register("title",
                                        {
                                            required: true,
                                            maxLength: 100,
                                            onChange: (e) => handleChangeInput("title", e.target.value)
                                        }
                                    )}
                                />
                                {errors.title?.type === "required" &&
                                    <div className="input-value-error">Tiêu đề sách không được trống!</div>}
                                {errors.title?.type === "maxLength" &&
                                    <div className="input-value-error">Tiêu đề sách không được vượt quá 100 ký tự!</div>}
                            </div>
                        </div>
                        <div className="do-an-form-create-books__body__group-input">
                            <div className="do-an-form-create-books__body__group-input__key">
                                <span>Tác giả: <i className="do-an__input-require">*</i></span>
                            </div>
                            <div className="do-an-form-create-books__body__group-input__input">
                                <input
                                    className={`do-an__input do-an-input-name ${errors.name ? 'is-invalid' : ''}`}
                                    {...register("author",
                                        {
                                            required: true,
                                            maxLength: 100,
                                            onChange: (e) => handleChangeInput("author", e.target.value)
                                        }
                                    )}
                                />
                                {errors.author?.type === "required" &&
                                    <div className="input-value-error">Tác giả sách không được trống!</div>}
                                {errors.author?.type === "maxLength" &&
                                    <div className="input-value-error">Tác giả sách không được vượt quá 100 ký tự!</div>}
                            </div>
                        </div>
                        <div className="do-an-form-create-books__body__group-input">
                            <div className="do-an-form-create-books__body__group-input__key">
                                <span>Thuộc đại học: <i className="do-an__input-require">*</i></span>
                            </div>
                            <div className="do-an-form-create-books__body__group-input__input">
                                <input
                                    className={`do-an__input do-an-input-name ${errors.name ? 'is-invalid' : ''}`}
                                    {...register("name_university",
                                        {
                                            required: true,
                                            maxLength: 100,
                                            onChange: (e) => handleChangeInput("name_university", e.target.value)
                                        }
                                    )}
                                />
                                {errors.name_university?.type === "maxLength" &&
                                    <div className="input-value-error">Tên đại học sở hữu sách không được vượt quá 100 ký tự!</div>}
                                {errors.name_university?.type === "required" &&
                                    <div className="input-value-error">Tên đại học sở hữu sách không được trống!</div>}
                            </div>
                        </div>
                        <div className="do-an-form-create-books__body__group-input">
                            <div className="do-an-form-create-books__body__group-input__key">
                                <span>Năm xuất bản: <i className="do-an__input-require">*</i></span>
                            </div>
                            <div className="do-an-form-create-books__body__group-input__input">
                                <input
                                    className={`do-an__input do-an-input-name ${errors.name ? 'is-invalid' : ''}`}
                                    {...register("publishing_year",
                                        {
                                            required: true,
                                            maxLength: 4,
                                            onChange: (e) => handleChangeInput("publishing_year", e.target.value)
                                        }
                                    )}
                                    type="number"
                                />
                                {errors.publishing_year?.type === "required" &&
                                    <div className="input-value-error">Năm xuất bản sách không được trống!</div>}
                                {errors.publishing_year?.type === "maxLength" &&
                                    <div className="input-value-error">Năm xuất bản sách không được vượt quá 4 ký tự!</div>}
                            </div>
                        </div>
                        <div className="do-an-form-create-books__body__group-input">
                            <div className="do-an-form-create-books__body__group-input__key">
                                <span>Nhà xuất bản: <i className="do-an__input-require">*</i></span>
                            </div>
                            <div className="do-an-form-create-books__body__group-input__input">
                                <input
                                    className={`do-an__input do-an-input-name ${errors.name ? 'is-invalid' : ''}`}
                                    {...register("origin",
                                        {
                                            required: true,
                                            maxLength: 100,
                                            onChange: (e) => handleChangeInput("origin", e.target.value)
                                        }
                                    )}
                                />
                                {errors.origin?.type === "required" &&
                                    <div className="input-value-error">Nhà xuất bản sách không được trống!</div>}
                                {errors.origin?.type === "maxLength" &&
                                    <div className="input-value-error">Nhà xuất bản sách không được vượt quá 100 ký tự!</div>}
                            </div>
                        </div>
                        <div className="do-an-form-create-books__body__group-input">
                            <div className="do-an-form-create-books__body__group-input__key">
                                <span>Nhập số lượng: <i className="do-an__input-require">*</i></span>
                            </div>
                            <div className="do-an-form-create-books__body__group-input__input">
                                <input
                                    type={"number"}
                                    className={`do-an__input do-an-input-name input-number ${errors.name ? 'is-invalid' : ''}`}
                                    {...register("amount",
                                        {
                                            min: 1,
                                            onChange: (e) => handleChangeInput("amount", e.target.value)
                                        }
                                    )}
                                />
                                {errors.amount?.type === "min" &&
                                    <div className="input-value-error">Số lượng sách không được nhỏ hơn 0!</div>}
                            </div>
                        </div>
                    </div>
                    <div className="do-an-form-create-books__body__content__avatar">
                        <div className="do-an-form-create-books__body__group-input__input-add-image">
                            <div>
                                <input type="file" accept="image/*" className={`ocr-designer-input-add-image ${errors.image ? 'is-invalid' : ''}`}
                                    {...register("avatar",
                                        {
                                            onChange: (e) => onImageChange(e),
                                            required: true,
                                            validate: {
                                                checkFileType: files => checkFileTypeAvatar(files) || `Ảnh đại diện chỉ nhận các file ${constImage.LIST_FILE_TYPE_AVATAR.join(", ")}`,
                                                checkFileSize: files => checkFileSizeAvatar(files) || "Ảnh đại diện không vượt quá 5MB"
                                            }
                                        }
                                    )} />
                                {errors.avatar?.type === "required" &&
                                    <div className="input-value-error">Ảnh sách không được trống!</div>}
                                {errors.avatar?.message &&
                                    <div className="input-value-error">{errors.avatar?.message}</div>}
                            </div>
                            <img className="do-an-preview-image" src={image}></img>
                            <div className="do-an-title-avatar">
                                Ảnh đại diện
                            </div>
                        </div>
                    </div>
                    <button id="do-an-form-create-books-button" type="submit" hidden={true}></button>
                </div>
            </div>
        </form>
    )
}

export default CreateBooks;