import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import CalendarManager from "../../components/Container/Appointment/CalendarManager";
import { GetAllShops, GetUserShopRequest } from "../../services/ShopRequest";

const Calendar = () => {
    var user: any = useContext(UserContext);
    var userRole = user.role;
    var userId = user.idUser;
    const [hasShop, setHasShop] = useState<boolean>(false);
    const [shopData, setHasShopData] = useState<any>([]);
    
    useEffect(() => {
        if (userId) {
            const hasShopRequest = async () => {
                var result;
                try {
                    if (userRole === 1) {
                        result = await GetUserShopRequest(userId); //add user ID in this func
        
                        if (!result) {
                            setHasShop (false);
                        } else {
                            setHasShop(true);
                            setHasShopData(result);
                        }
                    } else {
                        result = await GetAllShops(); //add user ID in this func
        
                        if (!result) {
                            setHasShop (false);
                        } else {
                            setHasShop(true);
                            setHasShopData(result);
                        }
                    }
                } catch (error) {
                    console.error(error);
                }
            }
            hasShopRequest()
        } else {
            return;
        }
    }, [hasShop, userId, userRole]);

    console.log("THIS IS SHOPS DATA USER", shopData)

    const shopProps:any = {
        shopData: shopData
    }
    
    return (
        <div className="calendar-dashboard-nested-page">
            <h1>Appointment calendar</h1>
            {hasShop ? <CalendarManager {...shopProps} /> : ''/*here add like a link button to take us to shop creation*/}
            
        </div>
    )
};

export default Calendar;