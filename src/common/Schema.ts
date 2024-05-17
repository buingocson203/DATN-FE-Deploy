import Joi from "joi";
import *as Yup from "Yup"
export const formSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().messages({
        "string.email": "Email khong hop le",
        "any.required": "Email khong duoc bo trong"
    }),
    password: Joi.string().min(6).max(32).required().messages({
        "string.min": "Mat khau it nhat 6 ki tu",
        "string.max": "Mat khau khong qua 32 ki tu",
        "any.required": "khong duoc de trong"
    })
})

export const signinSchema = Yup.object({
    email: Yup.string().email("Email sai định dạng").trim().required("Trường dữ liệu bắt buộc và không được để trống"),
    password: Yup.string().min(6, ("Mật khẩu tối thiểu 6 ký tự")).max(32, ("Mật khẩu tối đa 32 ký tự")).required("Trường dữ liệu bắt buộc"),
})
export type SigninForm = Yup.InferType<typeof signinSchema>

export interface IUser {
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    role: string
}