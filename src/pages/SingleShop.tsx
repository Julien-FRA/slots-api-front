import React, { useContext, useEffect, useState } from 'react';
import {  useParams } from 'react-router-dom';
import { GetSingleShop } from '../services/ShopRequest';
import CalendarManagerSinglePage from '../components/Container/Appointment/CalendarManagerSinglePage';

interface Shop {
    idShop: number;
    name: string;
    address: string;
    service: string;
}

const SingleShop = () => {
    const { shopId } = useParams();
    const [singleShop, setSingleShop] = useState<any>();
    
    useEffect(() => {
        const fetchSingleShop = async () => {
            try {
                const response: any = await GetSingleShop(shopId);
                setSingleShop(response);
            } catch (error) {
                console.error(error);
            }
        };
        fetchSingleShop();
    }, []);
    const singlePropsShop:any = {
        singleShop: singleShop
    }
    return (
        <div className="container">
            <h2>{singleShop?.name}</h2>
            <p>{singleShop?.address}</p>
            <p>{singleShop?.service}</p>

            <CalendarManagerSinglePage {...singlePropsShop} />

        </div>
    );
}

export default SingleShop;
