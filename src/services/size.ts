import { IRole } from '@/common/type'
import instance from '../core/api'

export const getRoles = async () => {
    try {
        const response = await instance.get('/admin/role/all')
        console.log(response.data)
        return response.data.payload
    } catch (error) {
        console.log(`['FETCHS_ROLES_ERROR']`, error)
    }
}

export const getRole = async (id: number) => {
    try {
        const response = await instance.get(`/admin/role/details?id=${id}`)
        return response.data
    } catch (error) {
        console.log(`['FETCHS_ROLE_ERROR']`, error)
    }
}

export const addRole = async (role: IRole) => {
    try {
        const response = await instance.post('/admin/role/create', role)
        return response.data
    } catch (error) {
        console.log(`['ADD_ROLE_ERROR']`, error)
    }
}

export const updateRole = async (role: IRole) => {
    console.log(role)
    try {
        const response = await instance.put(`admin/role/update?id=${role?.payload?.id}`, role.payload)
        console.log(response.data)

        return response.data.payload
    } catch (error) {
        console.log(`['UPDATE_ROLE_ERROR']`, error)
    }
}

export const deleteRole = async (role: IRole) => {
    try {
        await instance.delete(`/admin/role/delete?id=${role.id}`)
    } catch (error) {
        console.log(`['DELETE_PRODUCTS_ERROR']`, error)
    }
}
