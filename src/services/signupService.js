import api from "./api";

export const signup = async (data) => {

    const response = await api.post(
        "/auth/signup",
        data
    );

    return response.data;

};