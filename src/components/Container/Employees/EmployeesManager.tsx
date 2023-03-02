import { useState, useCallback, useEffect, useContext } from "react";
import {
CreateEmployeeRequest,
GetShopEmployeeRequest,
UpdateEmployeesRequest
} from "../../../services/EmployeeRequests";
import {
CreateShopsRequest,
EditShopRequest,
GetUserShopRequest
} from "../../../services/ShopRequest";
import CreateEmployees from "./CreateEmployees";
import EditEmployees from "./EditEmployees";
import ShopsDropdown from "../../Input/ShopsDropdown";
import EmployeeShopList from "./EmployeesShopList";
import { UserContext } from "../../../App";

const EmployeesManager = (props: any) => {
    var user: any = useContext(UserContext);
    var userRole = user.role;
        var userId = user.idUser;
        console.log("THIS IS USER ID", user)
    const [employeeRequestType, setEmployeeRequestType] = useState<boolean>(true);
    const [hasShop, setHasShop] = useState<boolean>(true);
    const [userShop, setUserShop] = useState<any>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [employeesData, setEmployeesData] = useState<any>({
        idShop: 0,
        email: "",
        phone: "",
        name: "",
        lastName: "",
        expertise: "",
        description: "",
        price: ""
    });
        const [shopEmployees, setShopEmployees] = useState<any>([]);
        const [userIdShop, setUserIdShop] = useState<any>(null);
            const [addShop, setAddShop] = useState<boolean>(false);
        

    const handleOnChange = useCallback((event: any) => {
        const value = event.target.value;
        const field = event.target.name;

        setEmployeesData((prevData: any) => ({
        ...prevData,
        idShop: userIdShop,
        [field]: value
        }));
    }, [userIdShop]);

    const handleSubmit = useCallback(async (event: any) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (!form.checkValidity()) {
        event.stopPropagation();
        return;
        }

        setIsLoading(true);

        try {
        const employeeData = {
            ...employeesData,
            price: parseInt(employeesData.price)
        };
        const request = employeeRequestType
            ? CreateEmployeeRequest(JSON.stringify(employeeData))
            : UpdateEmployeesRequest(JSON.stringify(employeeData));

        await Promise.all([request, setHasShop(!employeeRequestType)]);

        setAddShop(false);
        setIsLoading(false);
        setEmployeeRequestType(true);
        } catch (error) {
        setIsLoading(false);
        console.error(error);
        }
        //window.location.reload();
    }, [employeeRequestType, employeesData]);

    useEffect(() => {
        const fetchData = async () => {
        setIsLoading(true);

        try {
            if (userId) {
                const userShopResult = userId ? await GetUserShopRequest(userId) : null;
                console.log("this is shops", userShopResult)
                setUserShop(userShopResult);
                //setUserIdShop(shops?.idShop || null);
                let found = userShopResult ? userShopResult.find((item: any) => item.idShop === userIdShop) : null;
                setUserIdShop(found.idShop)
                console.log("found", found)
            
                if (userIdShop || found) {
                    console.log("found.idShop", found.idShop)
                    var shopEmployeesResult = await GetShopEmployeeRequest(found.idShop);
                    console.log("shopEmployeesResult", shopEmployeesResult)
            
                    setShopEmployees(shopEmployeesResult);
                }
                setIsLoading(false)
            } else {
                console.log("its loading dude");
            }
        } catch (error) {
            setIsLoading(false);
            console.error(error);
        }
        };
        fetchData();
    }, [addShop, hasShop, userId, userIdShop]);

        const handleShopChange = useCallback((event:any) => {
            setUserIdShop(event.target.value);
        }, []);
    const employeeProps = {
        hasShop,
        userShop,
        isLoading,
        employeesData,
        userIdShop,
        shopEmployees,
        employeeRequestType,
        setUserIdShop,
        setEmployeeRequestType,
        handleSubmit,
        handleShopChange,
        handleOnChange,
        setHasShop,
        setAddShop
    };

        return (
            <>
                {userId && !isLoading ? (
                    <>
                        {employeeRequestType ? (
                            <>
                                <ShopsDropdown {...employeeProps} />
                                <EmployeeShopList {...employeeProps} />
                                <CreateEmployees {...employeeProps} />
                            </>)
                            :
                            <EditEmployees {...employeeProps} />
                        }
                    </>  
                ) : (
                <p>Loading...</p>
                )}    
            </>
        )
}

export default EmployeesManager;