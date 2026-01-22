export const FETCH_AUTH_REQUEST = 'FETCH_AUTH_REQUEST';
export const FETCH_AUTH_SUCCESS = 'FETCH_AUTH_SUCCESS';
export const FETCH_AUTH_FAILURE = 'FETCH_AUTH_FAILURE';
export const SHOW_SUCCESS_ALERT = 'SHOW_SUCCESS_ALERT';
export const SHOW_ERROR_ALERT = 'SHOW_ERROR_ALERT';
export const CHECK_AUTH_STATUS = 'CHECK_AUTH_STATUS';

import { API_DATA, API_ENDPOINT } from "../Config/Client/APIs";
import http from "../Utils/Http";

export const fetchAuthRequest = () => ({
    type: FETCH_AUTH_REQUEST
});

export const fetchAuthSuccess = auth => ({
    type: FETCH_AUTH_SUCCESS,
    payload: auth
});

export const fetchAuthFailure = error => ({
    type: FETCH_AUTH_FAILURE,
    payload: error
});


export const showSuccessAlert = (message) => ({
    type: SHOW_SUCCESS_ALERT,
    payload: message,
});

export const showErrorAlert = (message) => ({
    type: SHOW_ERROR_ALERT,
    payload: message,
});

const getErrorMessage = (error) => {
    return error.response?.data?.message || error.message || "An error occurred. Please try again!";
};



// Hàm để kiểm tra người dùng trong cơ sở dữ liệu
export const checkEmailExists = async (email) => {
    try {
        const response = await http.get(`${API_ENDPOINT}/auth/check-email`, { params: { email } });
        return response.data.exists ? response.data.user : null;
    } catch (error) {
        console.error('Error checking user existence:', error);
        throw error;
    }
};



export const fetchGoogleAuth = (userData) => {
    return async dispatch => {
        dispatch(fetchAuthRequest());
        try {
            const response = await http.post(`${API_ENDPOINT}${API_DATA.authOGoogle}`, userData);
            const data = response.data;
            dispatch(fetchAuthSuccess(data));
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('accessToken', data.accessToken);
            dispatch(showSuccessAlert('Google login successful!'));
        } catch (error) {
            const errorMsg = getErrorMessage(error.response.data);
            dispatch(fetchAuthFailure(errorMsg));
            dispatch(showErrorAlert(errorMsg));
        }
    };
};


export const fetchFacebookAuth = (userData) => {
    return async dispatch => {
        dispatch(fetchAuthRequest());
        try {
            const response = await http.post(`${API_ENDPOINT}${API_DATA.authOFacebook}`, userData);
            const data = response.data;
            dispatch(fetchAuthSuccess(data));
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('accessToken', data.accessToken);
            dispatch(showSuccessAlert('Facebook login successfull!'));
        } catch (error) {
            const errorMsg = getErrorMessage(error.response.data);
            dispatch(fetchAuthFailure(errorMsg));
            dispatch(showErrorAlert(errorMsg));
        }
    };
};




export const fetchLogin = (email, password) => {
    return async dispatch => {
        dispatch(fetchAuthRequest());
        try {
            const response = await http.post(`${API_ENDPOINT}${API_DATA.login}`, { email, password });
            const data = response.data;
            dispatch(fetchAuthSuccess(data));
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('accessToken', data.accessToken);
            dispatch(showSuccessAlert('Login successful!'));
        } catch (error) {
            const errorMsg = getErrorMessage(error.response.data);
            console.log("Check errorMsg:: ", errorMsg)

            dispatch(fetchAuthFailure(errorMsg));
            dispatch(showErrorAlert(errorMsg));
        }
    };
};


export const checkAuthStatus = () => {
    return dispatch => {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('accessToken');

        if (user && token) {
            dispatch({ type: CHECK_AUTH_STATUS, payload: { isAuthenticated: true, user } });
        } else {
            dispatch({ type: CHECK_AUTH_STATUS, payload: { isAuthenticated: false, user: null } });
        }
    };
};

export const addNewCustomer = (customerData) => {
    return async dispatch => {
        dispatch(fetchAuthRequest());
        try {
            const response = await http.post(`${API_ENDPOINT}${API_DATA.register}`, customerData);
            const data = response.data;
            dispatch(fetchAuthSuccess(data));
            dispatch(showSuccessAlert('Account registration successful!'));
        } catch (error) {
            const errorMsg = getErrorMessage(error.response.data);
            dispatch(fetchAuthFailure(errorMsg));
            dispatch(showErrorAlert(errorMsg));
        }
    };
};


export const forgotPassword = (email) => {
    return async dispatch => {
        dispatch(fetchAuthRequest());
        try {
            const response = await http.post(`${API_ENDPOINT}${API_DATA.forgotPassword}`, { email });
            dispatch(fetchAuthSuccess(response.data));
            dispatch(showSuccessAlert('Password reset email has been sent successfully!'));
        } catch (error) {
            const errorMsg = getErrorMessage(error.response.data);
            dispatch(fetchAuthFailure(errorMsg));
            dispatch(showErrorAlert(errorMsg));
        }
    };
};

export const changePassword = (token, newPassword) => {
    return async dispatch => {
        dispatch(fetchAuthRequest());
        try {
            const response = await http.post(`${API_ENDPOINT}${API_DATA.changePassword}`, { token, newPassword });
            dispatch(fetchAuthSuccess(response.data));
            dispatch(showSuccessAlert('Password changed successfully!'));
        } catch (error) {
            const errorMsg = getErrorMessage(error.response.data);
            dispatch(fetchAuthFailure(errorMsg));
            dispatch(showErrorAlert(errorMsg));
        }
    };
};
