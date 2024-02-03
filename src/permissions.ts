import axios from 'axios';

// user is logged in

export const loginStatus = async () => {
    try {
        const response = await axios.get("http://localhost:5000/api/login-status");
        console.log("bloodseed we ah call yuh")
        return response.data  
    } catch (error) {
        console.error("Error, cannot get login status: ", error)
    }
}

// import axios from "axios"


// export const userIsAdmin = async () => {
//     try {
//         const response = await axios.
        
//     } catch (error) {
        
//     }
// }