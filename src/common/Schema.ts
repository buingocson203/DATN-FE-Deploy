import Joi from "joi";

export const formSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().messages({
        "string.email" : "Email khong hop le",
        "any.required": "Email khong duoc bo trong"
    }),
    password: Joi.string().min(6).max(32).required().messages({
            "string.min": "Mat khau it nhat 6 ki tu",
            "string.max": "Mat khau khong qua 32 ki tu",
            "any.required": "khong duoc de trong"
    })
})