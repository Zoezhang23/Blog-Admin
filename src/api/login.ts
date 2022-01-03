import { request } from "./request";

export async function adminLogin(data) {
    return request({
        url: 'user/login',
        method: 'POST',
        data,
    });
}