//api.js
import axiosService from './request'
import JsonP from 'jsonp';
/***
 * 跨域(Jsonp)
 */
export const jsonp=(options)=> {
    return new Promise((res, rej) => {
        JsonP(options.url, {
            param: 'callback'
        }, function (err, response) {
            response.status == 'success' ? res(response) : rej(response.message)
        })
    })
}


/***
 * 获取角色列表
 */
export const getRoleList = data => {
    return axiosService({
        url: '/role/list',
        method: 'get',
        data
    })
};
/***
 * 获取角色获取用户列表
 */
export const getUserList = (id) => {
    return axiosService({
        url: '/role/user_list',
        method: 'get',
        params: id
    })
};
