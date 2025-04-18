import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import ShowRooms from "./ShowRooms";
import axios from "axios";

function Hotel_Description() {

    const location = useLocation();
    const hotel = location.state;

    const [allRooms, setAllRooms] = useState([]);
    const [bookedRooms, setBookedRooms] = useState([]);

    useEffect(() => {
        const getRoomData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/hotel/${hotel.hotel_id}/rooms`);
                setAllRooms(response.data.allRooms);
                setBookedRooms(response.data.bookedRooms);
            } catch (error) {
                console.log(error);
            }
        };
    
        getRoomData();
    }, [hotel.hotel_id, hotel.user_email]);    

    return (
        <div>
            <Navbar name={hotel.user_name} />
            <div className="hotel-description">
                <img src={hotel.image} alt={hotel.name} style={{ width: "400px", borderRadius: "10px" }} />
                <div>
                    <h2>{hotel.name}</h2>
                    <p><strong>Location:</strong> {hotel.location}</p>
                    <p><strong>Phone:</strong> {hotel.phone}</p>
                    <p><strong>Email:</strong> {hotel.hotel_email}</p>
                </div>
            </div>
            <ShowRooms allRooms = {allRooms} bookedRooms = {bookedRooms}  user_email = {hotel.user_email} hotel_id = {hotel.hotel_id} user_name = {hotel.user_name}/>
        </div>
    );
}
export default Hotel_Description;