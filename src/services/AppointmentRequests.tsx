import axios from 'axios';
const PATH = process.env.REACT_APP_API_PATH;

export const CreateAppointmentRequest = async (appointmentJSON: any): Promise<any> => (
    await axios.post("${PATH}/appointment/create", {appointmentJSON}, {
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

export const GetCustomerAppointmentsRequest = async (): Promise<any> => (
  //remove the HARD CODED idUser, get it from URL/COOKIE
    await axios.get("${PATH}/appointment/customer/1", {
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

export const DeleteAppointmentRequest = async (id:any): Promise<any> => (
  //remove the HARD CODED idShop, get it from URL/COOKIE
    await axios.delete(`${PATH}/appointment/delete/${id}`, {
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