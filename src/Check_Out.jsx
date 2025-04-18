import React, { useState } from "react";
import Navbar from "./Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Check_Out() {
    const location = useLocation();
    const details = location.state;
    const navigate = useNavigate();

    const [review, setReview] = useState("");
    const [rating, setRating] = useState(5);
    const [loading, setLoading] = useState(false);

    const handleProceed = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post("http://localhost:5000/checkout", {
                "user_email": details.user_email,
                "hotel_id": details.hotel_id,
                "room_id": details.room.room_id,
                "review" : review,
                "rating" : rating,
                "amount": details.room.amount
            });
            alert("Thank you for your review and payment!");
            navigate("/Hotels", {
                state: {
                    name: details.user_name,
                    user_email : details.user_email
                }
            });
        } catch (error) {
            alert(error.response?.data?.error || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar name={details.user_name} />
            <div className="checkout-container">
                <h2>Check Out</h2>
                <div className="checkout-details">
                    <p><strong>Room:</strong> {details.room.room_no}</p>
                    <p><strong>Amount to Pay:</strong> ₹{details.room.amount}</p>
                </div>
                <form className="checkout-form" onSubmit={handleProceed}>
                    <label>
                        Your Review:
                        <textarea
                            value={review}
                            onChange={e => setReview(e.target.value)}
                            placeholder="Write your review here..."
                            rows={4}
                            required
                        />
                    </label>
                    <label>
                        Rating:
                        <select value={rating} onChange={e => setRating(Number(e.target.value))}>
                            {[5, 4, 3, 2, 1].map(star => (
                                <option key={star} value={star}>{star}</option>
                            ))}
                        </select>
                    </label>
                    <button type="submit" disabled={loading}>
                        {loading ? "Processing..." : "Proceed"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Check_Out;
