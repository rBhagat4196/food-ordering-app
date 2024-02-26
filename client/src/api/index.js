import axios from "axios"

export const baseUrl = "http://127.0.0.1:5001/foodordering-4c8ad/us-central1/app"

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

export const addNewProduct = async (data) => {
    try {
      const res = await axios.post(`${baseUrl}/api/products/create`, { ...data });
      // console.log(res.data)
      return res.data.data;
    } catch (err) {
      return null;
    }
  };
  

export const getAllProducts = async()=>{
  try {
    const res = await axios.get(`${baseUrl}/api/products/all`);
    // console.log(res.data)
    return res.data.data;
  } catch (err) {
    return null;
  }
}

export const deleteAProduct = async (productId) => {
  try {
    const res = await axios.delete(
      `${baseUrl}/api/products/delete/${productId}`
    );
    // return res.data.data;
  } catch (err) {
    return null;
  }
};

export const getAllUsers = async()=>{
  try{
    const res = await axios.get(`${baseUrl}/api/users/all`);
    // console.log(res.data)
    return res.data.data;
  }catch(error){
    return null;
  }
}

export const addNewItemToCart = async(user_id,data)=>{
  try{
    const res = await axios.post(`${baseUrl}/api/products/addToCart/${user_id}`,{...data});
    return res.data.data;
  }catch(error){
    return null;
  }
}