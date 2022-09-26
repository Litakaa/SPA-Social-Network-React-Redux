import * as axios from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "f95bba2a-83a8-4e93-a291-751c5a89351c"
    }
});

export const userAPI = {
    getUsers(currentPage = 1,pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data);
    },
    unFollowUsers(userId) {
        return instance.delete(`follow/${userId}`)
            .then(response => response.data);
    },
    followUsers (userId) {
        return instance.post(`follow/${userId}`)
            .then(response => response.data);
    },
}

export const profileAPI = {
    getUsersProfile(userId) {
        return instance.get(`profile/${userId}`);
    },
    getStatus(userId) {
        return instance.get(`/profile/status/${userId}`);
    },
    updateStatus(status) {
        return instance.put(`/profile/status`, {status: status});
    }
}

export const authAPI = {
    getAuth() {
        return instance.get(`/auth/me`);
    },
    login(email, password, rememberMe = false) {
        return instance.post(`/auth/login`, {email, password, rememberMe});
    },
    logout() {
        return instance.delete(`/auth/login`);
    }
}






