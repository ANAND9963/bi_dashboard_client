import axios from "axios";
const PORT = 3001;
export const SignUpApi = async (payload) => {
    console.log("hit",payload);
    const URL = `${PORT}/api/signUp`;
    try {
        const response = await axios.post(URL, payload);
       return response;
    } catch (error) {
        console.log(error);
    }
}
export const SignInApi = async (payload) => {
    const URL = `${PORT}/api/signIn`;
    try {
        const response = await axios.post(URL, payload);
        if (response.status === 200) {
           return response;
        }
    } catch (err) {
        console.log(err);
    }
}