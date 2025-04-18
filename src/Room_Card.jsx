import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Room_Card({ room, color, user_email, hotel_id, user_name}) {
    const navigate = useNavigate();
    const [currColor, changeCurrColor] = useState(color);
    function handleCheckOut() {
        navigate("/check_out", {
            state: {
                "room" : room, // for id, and amount
                "hotel_id" : hotel_id,
                "user_name" : user_name,
                "user_email" : user_email
            }
        });
    }

    async function handleBook() {
        changeCurrColor("green");
        try {
            const response = await axios.post("http://localhost:5000/Book", {
                "user_email": user_email,
                "room_id" : room.room_id
            });
            alert(response.data.message);
        }
        catch (error) {
            alert(error.response?.data?.error || "Something went wrong!");
        }
    }

    return (
        <div className="room_card_container" style={{ backgroundColor: currColor }}>
            <div className="room_card_text">
                <h4>Room {room.room_no}</h4>
                <p>Amount: ₹{room.amount}</p>
                <p>ID: {room.room_id}</p>
            </div>

            <div className="room_card_buttons">
                {currColor === "green" ? <button onClick={handleCheckOut} >Check-Out</button> : (currColor === "white" ? <button onClick={handleBook}>Book</button> : "")}
            </div>
        </div>
    );
}

export default Room_Card;