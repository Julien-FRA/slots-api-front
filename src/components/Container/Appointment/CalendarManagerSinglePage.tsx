import { useContext, useEffect, useState } from 'react';
import { GetEmployeeWorkingHoursRequest, GetShopEmployeesWorkingHoursRequest } from '../../../services/WorkingHoursRequest';
import { GetShopEmployeeRequest } from '../../../services/EmployeeRequests';
import Calendar from '../Appointment/Calendar';
import ShopsDropdown from '../../Input/ShopsDropdown';
import { GetUserShopRequest } from '../../../services/ShopRequest';
import { UserContext } from '../../../App';

const CalendarManagerSinglePage = (props: any) => {
    var user: any = useContext(UserContext);
    var userRole = user.role;
    var userId = user.idUser;
    
    const [currentWeek, setCurrentWeek] = useState(getCurrentWeekDates());
    const [employees, setEmployees] = useState<any>();
    const [employeeWorkingHours, setEmployeeWorkingHours] = useState<any>([]);
    const [userShop, setUserShop] = useState<any>([]);
    const [shopEmployeesWorkinghours, setShopEmployeesWorkinghours] = useState<any>([]);
    /**
     * On admin selected shop hook is handled by dropdown, 
     * On customer its handled by shopCard containing shopId (this is in order to display shopEmployees)
    */
   //const [selectedShop, setSetSelectedShop] = useState<any>(2);
   const [userIdShop, setUserIdShop] = useState<any>(1);
   const [selectedEmployee, setSelectedEmployee] = useState(4);
   
   /**
    * This is for testing, we need to get the role somehow, cookies ? | false === user
    * This will hide/show some components, since we're using calendar on both sessions
   */
  /**
   * Function to get currentWeekDates
  */
 function getCurrentWeekDates():any {
     const currentDate = new Date();
     const weekStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay() + 1);
     const weekDates = [];
     for (let i = 0; i < 7; i++) {
         const date = new Date(weekStart);
         date.setDate(date.getDate() + i);
         weekDates.push(date);
        }
        return weekDates;
    }
    
    /**
     * Function to handle clicking the "previous week" arrow button
    */
   const handlePrevWeek = () => {
       const newWeek = currentWeek.map((day:any) => {
           const newDay = new Date(day);
           newDay.setDate(newDay.getDate() - 7);
           return newDay;
        });
        setCurrentWeek(newWeek);
    };
    
    /**
     * Function to handle clicking the "next week" arrow button
    */
   const handleNextWeek = () => {
       const newWeek = currentWeek.map((day:any) => {
           const newDay = new Date(day);
           newDay.setDate(newDay.getDate() + 7);
           return newDay;
        });
        setCurrentWeek(newWeek);
    };
    var regexHour = "([0-9]+(:[0-9]+))";
    var regexWeek = "[0-9]{4}-[0-9]{2}-[0-9]{2}";
    var dateArray:any = [];
    
    /**
     * Loop over each currentWeek days and push an object of day data to dateArray array
    */
   for (var i = 0; i < currentWeek.length; i++) {
       var dateRegexed:any = JSON.stringify(currentWeek[i]).match(regexWeek)
       var date = dateRegexed[0];
       var stringDay = new Date(date).toLocaleString('en-us', { weekday: 'long' });
       var stringMonth = new Date(date).toLocaleString('en-us', { month: 'long' });
       var numberDay = ('0' + date).slice(-2);
       
       dateArray.push({
           date: date,
           numberDay: numberDay,
           stringDay: stringDay,
           stringMonth: stringMonth,
           workingHours: []
        });
    };
    console.log("THIS IS DATE ARRAY", dateArray)
    /**
     * Calls API requests and register their response in a useState hook, each time an employee is selected
    */
   console.log("THIS IS PROPS MG", props.singleShop)
   useEffect(() => {
       console.log("THIS IS USER ID", userId)
       if (userId) {
           const fetchData = async () => {
               const [employeeResponse, workingHoursResponse, userShopResponse] = await Promise.all([
                   GetShopEmployeeRequest(props.singleShop.idShop),
                   GetEmployeeWorkingHoursRequest(selectedEmployee),
                   GetUserShopRequest(userId)
               ]);
               console.log("THIS IS EMPLOYEE RESPONSE", employeeResponse)
                setEmployees(employeeResponse);
                setEmployeeWorkingHours(workingHoursResponse);
                //setShopEmployeesWorkinghours(shopEmployeesResponse);
                //console.log("THIS IS GOOD", shopEmployeesResponse)
                setUserShop(userShopResponse);
                setUserIdShop(userShopResponse[0].idShop);
            }
            const fetchData2 = async () => {
                try {
                    
                    let response = await GetShopEmployeesWorkingHoursRequest(userIdShop);
                    setShopEmployeesWorkinghours(response);
                } catch (error) {
                    console.log("THIS IS ERROR", error)
                }
            }
            fetchData();
            fetchData2();
        }
    }, [props.singleShop, selectedEmployee, userId, userIdShop]);
    /**
     * Handle selected employee toggle change
     * @param value 
     */
    const handleToggleChange = (value:any) => {
        setSelectedEmployee(value);
    };

    /**
     * Matching dateArray weekday with employeeWorkingHours day, for each employee
     * Then we push the workingHours inside an object within the weekDay
     * We will call each weekDay.workingHours for the calendar
     */
    if (employeeWorkingHours.length > 0) {
        for (var j = 0; j < employeeWorkingHours.length; j++) {
            var employeeWorkingHoursDate:any = JSON.stringify(employeeWorkingHours[j].day).match(regexWeek);
            var employeeWorkingHoursDay:any = employeeWorkingHoursDate[0];
    
            for (var k = 0; k < dateArray.length; k++) {
                if (dateArray[k].date === employeeWorkingHoursDay) {
                    var employeeWorkingHoursStartTime = employeeWorkingHours[j].startTime.match(regexHour);
                    dateArray[k].workingHours.push({
                        employeeId: employeeWorkingHours[j].idEmployee,
                        startTime: employeeWorkingHoursStartTime[0], //here maybe add the workingHour status => taken/available
                        idWorkingHours: employeeWorkingHours[j].idWorkingHours,
                        status: employeeWorkingHours[j].status,
                    });
                }
            }
        }
    };
    const calendarProps: any = {
        singleShopData: props.singleshop,
        employees: employees,
        selectedEmployee: selectedEmployee,
        userRole: userRole,
        shopEmployeesWorkinghours: shopEmployeesWorkinghours,
        dateArray: dateArray,
        shopData: props.shopData,
        setUserIdShop: setUserIdShop,
        getCurrentWeekDates: getCurrentWeekDates,
        userIdShop: userIdShop,
        userShop: userShop,
        handlePrevWeek: handlePrevWeek,
        handleNextWeek: handleNextWeek,
        handleToggleChange: handleToggleChange

    }
    return (
            <>
                {user.role === 1 && <ShopsDropdown {...calendarProps} />}
                <Calendar {...calendarProps} />
            </>
    )
}

export default CalendarManagerSinglePage;