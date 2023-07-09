import {useAuthHeader, createRefresh} from 'react-auth-kit'
import Testnet from '../config/Testnet'
import apiRequest from "./apiRequest";
const refreshApi = createRefresh({
    interval: 1,   // Refreshs the token in every 10 minutes
    refreshApiCallback: async (
        {   // arguments
            authToken,
            authTokenExpireAt,
            refreshToken,
            refreshTokenExpiresAt,
            authUserState
        }) => {
        try {
            const result = await apiRequest(Testnet.REFRESH_URL, 'POST', '',authToken);
            if (result.status == 200) {
                const response = await result.json();
                console.log(response)
                document.cookie="Bearer=" + response.token;
                return {
                    isSuccess: true,
                    newAuthToken: response.token,
                    newAuthTokenExpireIn: 1,
                    newRefreshToken: response.token,
                    newRefreshTokenExpiresIn: 2,
                }
            }
        }
        catch(error){
            console.error(error)
            return {
                isSuccess: false
            }
        }
    }
})

export default refreshApi