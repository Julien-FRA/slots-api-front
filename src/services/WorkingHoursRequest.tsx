import axios from 'axios';

export interface User {
  idUser?: number;
  email?: string;
  name?: string;
  password?: string;
}


export const GetEmployeeWorkingHoursRequest = async (selectedEmployee: any): Promise<any> => (
  await axios.get(`http://localhost:3200/api/working-hours-employee/${selectedEmployee}`, {
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

export const GetShopEmployeesWorkingHoursRequest = async (userIdShop: any): Promise<any> => (
  await axios
    .get(`http://localhost:3200/api/working-hours-shop/${userIdShop}`) //SEND PROPS.SHOP HERE
    .then((response) => {
      console.log("this is GetEmployeeWorkingHoursRequest", response)
      return response.data;
    })
    .catch(error => false)
);

export const UpdateEmployeeWorkingHoursRequest = async (workingHoursJSON: any): Promise<any> => (
    await axios.put("http://localhost:3200/api/working-hours/update", {workingHoursJSON}, {
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
    await axios.post("http://localhost:3200/api/working-hours/create", {workingHoursJSON}, {
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
  await axios.delete(`http://localhost:3200/api/working-hours/delete/${id}`, {
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