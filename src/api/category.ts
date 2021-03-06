import { request } from "./request";

export async function categoryList(params) {
    return request({
        url: '/categories',
        params,
    });
}
export async function addCategory(data) {
    return request({
        url: '/categories',
        data,
        method: 'POST',
    });
}
export async function updateCategory(data) {
    return request({
        url: '/categories',
        data,
        method: 'PUT',
    });
}
export async function deleteCategory(data) {
    return request({
        url: '/categories',
        data,
        method: 'DELETE',
    });
}