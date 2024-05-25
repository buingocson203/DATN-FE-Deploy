import Joi from 'joi'
import * as Yup from 'Yup'

export const formSchema = Joi.object({
    userName: Joi.string().min(6).required().messages({
        'string.min': 'Tên đăng nhập phải có ít nhất 6 kí tự',
        'any.required': 'Tên đăng nhập không được bỏ trống',
        'string.empty': 'Tên đăng nhập không được bỏ trống'
    }),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required()
        .messages({
            'string.email': 'Email không hợp lệ',
            'any.required': 'Email không được bỏ trống',
            'string.empty': 'Email không được bỏ trống'
        }),
    password: Joi.string().min(6).max(32).required().messages({
        'string.min': 'Mật khẩu ít nhất 6 kí tự',
        'string.max': 'Mật khẩu không quá 32 kí tự',
        'any.required': 'Mật khẩu không được bỏ trống',
        'string.empty': 'Mật khẩu không được bỏ trống'
    }),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.only': 'Mật khẩu xác nhận không trùng khớp',
        'any.required': 'Mật khẩu xác nhận không được bỏ trống',
        'string.empty': 'Mật khẩu xác nhận không được bỏ trống'
    })
})

export const signinSchema = Yup.object({
    email: Yup.string().email('Email sai định dạng').trim().required('Trường dữ liệu bắt buộc và không được để trống'),
    password: Yup.string()
        .min(6, 'Mật khẩu tối thiểu 6 ký tự')
        .max(32, 'Mật khẩu tối đa 32 ký tự')
        .required('Trường dữ liệu bắt buộc')
})
export type SigninForm = Yup.InferType<typeof signinSchema>

export interface IUser {
    id: number
    userName: string
    email: string
    firstName: string
    lastName: string
    password: string
    confirmPassword: string
    role: string
}
