import React from "react";
import Room_Card from "./Room_Card";

function ShowRooms(props) {
    const { allRooms, bookedRooms, user_email, hotel_id, user_name} = props;

    // Helper function to determine the color for each room
    function getRoomColor(room) {
        const booking = bookedRooms.find(b => b.room_id === room.room_id);
        if (!booking) return "white";
        return booking.user_email === user_email ? "green" : "grey";
    }

    return (
        <div className="rooms-container">
            {allRooms.map(room => (
                <Room_Card
                    key={room.room_id}
                    room={room}
                    color={getRoomColor(room)}
                    user_email={user_email}
                    hotel_id={hotel_id}
                    user_name = {user_name}
                />
            ))}
        </div>
    );
}

export default ShowRooms;
