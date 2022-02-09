import axios from "axios";

export const request = (config) => {
    const http = axios.create({
        baseURL: '/api/v1',
    })
    //request block
    http.interceptors.request.use((config) => {
        if (config.method === 'put' || 'delete') {
            if (config.data) {
                const data = config.data ? config.data : null
                if (data) {
                    config.url += '/' + data.id || data._id
                }

            }
        }
        return config
    }, (error) => {
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


