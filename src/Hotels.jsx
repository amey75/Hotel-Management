import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Hotel_Card from "./Hotel_Card";

function Hotels() {
    const [hotels, setHotels] = useState([]);
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const location = useLocation();
    const name = location.state?.name;
    const user_email = location.state?.user_email;

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                setLoading(true);
                const response = await axios.get("http://localhost:5000/hotels");
                setHotels(response.data.hotel);
                setReviews(response.data.review);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch hotels");
                setLoading(false);
                console.error(err);
            }
        };

        fetchHotels();
    }, []);

    if (loading) return <div>Loading hotels...</div>;
    if (error) return <div>{error}</div>;

    function averageRating(hotel_id, reviews) {
        const ratings = reviews
            .filter(review => review.hotel_id === hotel_id)
            .map(review => review.rating);
        if (ratings.length === 0) return 0;
        const sum = ratings.reduce((acc, curr) => acc + curr, 0);
        return sum / ratings.length;
    }

    return (
        <div>
            <Navbar name={name} />
            <div className="hotels-container">
                {hotels.length === 0 ? (
                    <p>No hotels found</p>
                ) : (
                    hotels.map(hotel => (

                        <Hotel_Card
                            key={hotel.hotel_id}
                            hotel_id={hotel.hotel_id}
                            name={hotel.name}
                            location={hotel.location}
                            rating={averageRating(hotel.hotel_id, reviews)}
                            phone={hotel.phone}
                            hotel_email={hotel.hotel_email}
                            image={hotel.image_url}
                            user_name={name}
                            user_email = {user_email}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default Hotels;
