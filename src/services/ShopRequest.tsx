import axios from "axios";
const PATH = process.env.REACT_APP_API_PATH;

export interface User {
  idUser?: number;
  email?: string;
  name?: string;
  password?: string;
}

export interface Shop {
    idShop: number;
    idUser: number;
    name: string;
    address: string;
    service: string;
}

export const GetAllUsers = async (): Promise<User | false> => (
    await axios.get("${PATH}/users")
    .then((response) => {
      return response.data;
    })
    .catch((error) => false)
);

export const GetAllShops = async (): Promise<Shop | false> => (
    await axios.get("${PATH}/shops")
        .then((response) => response.data)

        .catch((error) => false)
);

export const GetSingleShop = async (shopId:any): Promise<Shop | false> => (
    await axios.get(`${PATH}/shop/${shopId}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => false)
);


export const CreateShopsRequest = async (shopJSON: any): Promise<any> => (
    await axios.post("${PATH}/shop/create", {shopJSON}, {
        headers: {
          'Content-Type': 'application/json'
        }
    })
    .then(response => {
      console.log("this is a good response",response);
    }).catch(error => {
      console.log("this is an error",error);
    })
);

export const GetUserShopRequest = async (): Promise<any> => (
  //remove the HARD CODED idUser, get it from URL/COOKIE
  await axios.get("${PATH}/shop/user/2", {
      headers: {
        'Content-Type': 'application/json'
      }
  })
  .then(response => {
    return response.data
  }).catch(error => {
    console.log("this is an error",error);
  })
);

export const DeleteShopRequest = async (id:any): Promise<any> => (
  //remove the HARD CODED idShop, get it from URL/COOKIE
  await axios.delete(`${PATH}/shop/delete/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
  })
  .then(response => {
    console.log("this is delete response", response)
  }).catch(error => {
    console.log("this is an error on delete",error);
  })
);

export const EditShopRequest = async (shopJSON:any): Promise<any> => (
  //remove the HARD CODED idShop, get it from URL/COOKIE
  await axios.put(`${PATH}/shop/update`, {shopJSON}, {
      headers: {
        'Content-Type': 'application/json'
      }
  })
  .then(response => {
    console.log("this is edit response", response)
  }).catch(error => {
    console.log("this is an error on edit",error);
  })
);