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