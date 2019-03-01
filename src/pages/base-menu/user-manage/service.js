/* eslint-disable */
import requestApi from '../../../services/requestApi';

export async function updateUserInfo(parame) {
    return requestApi('/api/user/updateUser', {
        ...parame
    });
}

export async function addUser(parame){
    return requestApi('/api/user/addUser', {
        ...parame
    });
}