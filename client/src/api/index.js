import axios from "axios"

export const baseUrl = "http://127.0.0.1:5001/foodordering-4c8ad/us-central1/App"

export const validateJWTToken = async(token)=>{
    try{
        const res = await axios.get(`${baseUrl}/api/users/jwtVerification`,{
            headers : {Authorization : "Bearer "+token}
        })
       return res.data.data;
    }catch(error){
        return null;
        console.log(error)
    }
}