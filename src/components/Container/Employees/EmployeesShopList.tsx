import { useEffect } from "react";
import { Table } from "react-bootstrap";
import { GetShopEmployeeRequest } from "../../../services/EmployeeRequests";
import { GetUserShopRequest } from "../../../services/ShopRequest";
import { GetEmployeeWorkingHoursRequest, GetShopEmployeesWorkingHoursRequest } from "../../../services/WorkingHoursRequest";

const EmployeeShopList = (props: any) => {
    console.log("employeeShopList",props.shopEmployees)
    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>ID Employee</th>
                <th>ID Shop</th>
                <th>Name</th> 
                <th>Lastname</th> 
                <th>Expertise</th> 
                <th>Description</th> 
                <th>Phone</th> 
                <th>Email</th> 
                <th>Price</th> 
            </tr>
            </thead>
            <tbody>
                {props.shopEmployees ?
                    props.shopEmployees.map((employee: any) => (
                        <tr>
                        <td>{employee.idEmployee}</td>
                        <td>{employee.idShop}</td>
                        <td>{employee.name}</td>
                        <td>{employee.lastName}</td>
                        <td>{employee.expertise}</td>
                        <td>{employee.description}</td>
                        <td>{employee.phone}</td>
                        <td>{employee.email}</td>
                        <td>{employee.price}</td>
                        </tr>
                    ))
                    : <tr>You don't have employees</tr>
                }
            </tbody>
        </Table>
    )
} 
export default EmployeeShopList;