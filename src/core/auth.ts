import { SigninForm } from "../common/Schema";
import instance from "./instance";

export const signin = (data: SigninForm) => {
    const uri = "/signin"
    return instance.post(uri, data)
}