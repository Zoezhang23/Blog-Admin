import { request } from "./request";

export async function tagList(params) {
    return request({
        url: '/tags',
        params,
    });
}
export async function addTag(data) {
    return request({
        url: '/tags',
        data,
        method: 'POST',
    });
}
export async function updateTag(data) {
    return request({
        url: '/tags',
        data,
        method: 'PUT',
    });
}
export async function deleteTag(data) {
    return request({
        url: '/tags',
        data,
        method: 'DELETE',
    });
}