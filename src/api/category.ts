import { request } from "./request";

export async function category(params) {
    return request({
        url: '/categories',
        params,
    });
}