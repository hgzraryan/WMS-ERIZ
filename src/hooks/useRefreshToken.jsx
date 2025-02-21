import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();
    //debugger
    const refresh = async () => {
        try {
            const response = await axios.get('/refresh', {
                withCredentials: true
            });

            // Update auth state with new access token and roles
            setAuth(prev => ({
                ...prev,
                roles: response.data.roles,
                accessToken: response.data.accessToken,
                //newRefreshToken:response.data.newRefreshToken
            }));

            return response.data.accessToken;
        } catch (error) {
            console.error("Error refreshing token:", error);
            // Optionally, handle token refresh failure (e.g., log out user)
            return null; // Or redirect to login if refresh fails
        }
    };

    return refresh;
};

export default useRefreshToken;