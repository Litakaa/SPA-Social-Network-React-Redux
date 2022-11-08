import {GetItemsType, instance, APIResponseType} from "./api";

export const userAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data);
    },
    unFollowUsers(userId: number) {
        return instance.delete(`follow/${userId}`).then(response => response.data) as Promise<APIResponseType>
    },
    followUsers(userId: number) {
        return instance.post<APIResponseType>(`follow/${userId}`).then(response => response.data)
            .then(response => response.data);
    }
}