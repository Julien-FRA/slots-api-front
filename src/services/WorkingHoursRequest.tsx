import axios from 'axios';
const PATH = process.env.REACT_APP_API_PATH;

export interface User {
  idUser?: number;
  email?: string;
  name?: string;
  password?: string;
}


export const GetEmployeeWorkingHoursRequest = async (selectedEmployee: any): Promise<any> => (
  await axios.get(`${PATH}/working-hours-employee/${selectedEmployee}`, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    console.log("this is GetEmployeeWorkingHours response", response)
    return response.data
  }).catch(error => {
    console.log("this is an error on GetEmployeeWorkingHours",error);
  })
);

export const GetShopEmployeesWorkingHoursRequest = async (selectedShop: any): Promise<User | false> => (
  await axios
    .get(`${PATH}/working-hours-shop/${selectedShop}`) //SEND PROPS.SHOP HERE
    .then((response) => {
      console.log("this is GetEmployeeWorkingHoursRequest", response)
      return response.data;
    })
    .catch(error => false)
);

export const UpdateEmployeeWorkingHoursRequest = async (workingHoursJSON: any): Promise<any> => (
    await axios.put("${PATH}/working-hours/update", {workingHoursJSON}, {
        headers: {
          'Content-Type': 'application/json'
        }
    })
    .then(response => {
      console.log("this is a good response UpdateEmployeeWorkingHoursRequest",response);
    }).catch(error => {
      console.log("this is an error UpdateEmployeeWorkingHoursRequest",error);
    })
);

export const CreateEmployeeWorkingHoursRequest = async (workingHoursJSON: any): Promise<any> => (
    await axios.post("${PATH}/working-hours/create", {workingHoursJSON}, {
        headers: {
          'Content-Type': 'application/json'
        }
    })
    .then(response => {
      console.log("this is a good response CreateEmployeeWorkingHoursRequest",response);
    }).catch(error => {
      console.log("this is an error CreateEmployeeWorkingHoursRequest",error);
    })
);
export const DeleteEmployeeWorkingHourRequest = async (id:any): Promise<any> => (
  //remove the HARD CODED idShop, get it from URL/COOKIE
  await axios.delete(`${PATH}/working-hours/delete/${id}`, {
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