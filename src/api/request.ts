import axios from "axios";

export const request = (config) => {
    const http = axios.create({
        baseURL: '/api/v1',
    })
    //request block
    http.interceptors.request.use((config) => { return config }, (error) => {
        console.log(error)
    })
    // response blcok
    http.interceptors.response.use((res) => {
        return res.data ? res.data : res
    }, (error) => {
        console.log('error', error.response)
    })
    return http(config);
}


