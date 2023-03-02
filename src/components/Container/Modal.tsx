import { useEffect, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { CreateAppointmentRequest } from "../../services/AppointmentRequests";
import { DeleteShopRequest } from '../../services/ShopRequest';
import { EditShopRequest } from '../../services/ShopRequest';
import EditShops from "./Shop/EditShop";
import { UpdateEmployeeWorkingHoursRequest } from "../../services/WorkingHoursRequest";
import WorkingHoursManager from "./WorkingHours/WorkingHoursManager";
import CrudOperationsWorkingHours from "./Appointment/EditDeleteWorkingHoursModal";

const GlobalModal: any = (props: any) => {
    console.log("GLOBALMODALS", props)
    const DeleteShopFunc = () => {
        DeleteShopRequest(props.idShop);
        props.setHasShop(false);
    }
    const EditShopFunc = () => {
        EditShopRequest(props.idShop);
        props.setHasShop(false);
    }
    const PostAppointment = async () => {
        let appointmentJSON = selectedHour;
        CreateAppointmentRequest(appointmentJSON);
        workingHours[0].status = 'taken';
        UpdateEmployeeWorkingHoursRequest(workingHours);
        window.location.reload();
    }
    if (props.type === "deleteModal") {
            return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Deleting your shop
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Are you sure ?</h4>
                <p>
                This operation is definitive and might be painfull
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
                <Button onClick={() => {DeleteShopFunc(); props.onHide()} }>Delete</Button>
            </Modal.Footer>
            </Modal>
        );
    } else if (props.type === "editModal") {
        return (
            <Modal
                
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Editing your shop
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <EditShops/>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
                <Button onClick={() => {EditShopFunc(); props.onHide()} }>Validate changes</Button>
            </Modal.Footer>
            </Modal>
        );
    } else if (props.type === "appointmentModal") {  
        var regexHour = "([0-9]+(:[0-9]+))";
        var regexWeek = "[0-9]{4}-[0-9]{2}-[0-9]{2}";
        var employeeArray = props.props.shopEmployeesWorkinghours.filter((obj: any) => obj.idEmployee === props.props.selectedEmployee);
        console.log("EMPLOYEEARRAY", employeeArray)
        var selectedHour: any = [];
        var workingHours: any = [];
        
        /** This will be used in appointment crud POST request
        * This will also be used in workingHours crud POST request
        * All data for both request should be contained in selectedHour array
        */
        for (var i = 0; i < employeeArray.length; i++) {
            var selectedStartTime = employeeArray[i].startTime.match(regexHour);
            var selectedEndTime = employeeArray[i].endTime.match(regexHour);
            if (selectedStartTime[0] === props.workingHour) {
                var selectedWeek:any = JSON.stringify(employeeArray[i].day).match(regexWeek);
                selectedHour.push({
                    idEmployee: employeeArray[i].idEmployee,
                    idCustomer: 1, //here we must replace it by the cookie isCustomer
                    idShop: props.props.selectedShop,
                    startTime: selectedStartTime[0],
                    endTime: selectedEndTime[0],
                    name: employeeArray[i].name,
                    shopName: employeeArray[i].shopName,
                    day: selectedWeek[0]
                });
        console.log("SELECTED HOUR", selectedHour)

                workingHours.push({
                    idEmployee: employeeArray[i].idEmployee,
                    day: selectedWeek[0],
                    startTime: selectedStartTime[0],
                    endTime: selectedEndTime[0],
                    status: employeeArray[i].status,
                    idWorkingHours: employeeArray[i].idWorkingHours
                })
                break;
            }    
        }
        console.log("MODAL PROPS", props)
        return (
            <> {selectedHour ?
                <Modal
                    {...props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {props.workingHour
                                ? <h2> Your appointment with {selectedHour[0].selectedShopName} </h2> : ''
                            }
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {props.workingHour
                            ?
                            <>
                                <Card className="appointment-modal-cards">You selected an appointment with {selectedHour[0].name} </Card>
                                <Card className="appointment-modal-cards">Date and hour : {selectedHour[0].day} on {selectedHour[0].startTime}</Card>
                            </>
                            : ''
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={(props.onHide)}>Close</Button>
                        <Button onClick={() => { PostAppointment(); props.onHide(); }}>Confirm</Button>
                    </Modal.Footer>
                </Modal>
                :
                ''}
            </>
        );
    } else if (props.type === "createWorkingHourModal") {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add working hours
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <WorkingHoursManager {...props} requestType="create"/>
            </Modal.Body>
            <Modal.Footer>
                
            </Modal.Footer>
            </Modal>
        )
    } else if (props.type === "manageWorkingHourModal") {
        return (
            <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Body>
                    <CrudOperationsWorkingHours {...props}/>
                </Modal.Body>
            </Modal>
        )
    } else if (props.type === "editWorkingHourModal") {
        var workingHourArray = props.workingHourArray;
        return (
            <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Body>
                    <WorkingHoursManager workingHourArray={workingHourArray} {...props} requestType={"edit"}/>
                </Modal.Body>
            </Modal>
        )
    }
}

export default GlobalModal;