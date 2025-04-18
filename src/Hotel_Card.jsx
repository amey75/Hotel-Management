import React from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";

function Hotel_Card(props) {
    const { name, location, rating, phone, hotel_email, image } = props;
    const navigate = useNavigate();

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<span key={`star-${i}`} className="star">★</span>);
        }

        if (hasHalfStar) {
            stars.push(<span key="half-star" className="star half">★</span>);
        }

        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<span key={`empty-star-${i}`} className="star empty">☆</span>);
        }

        return stars;
    };

    return (
        <div className="hotel-card"
            onClick={() => navigate(`/hotel/${props.hotel_id}`, { state: { ...props } })}
            style={{ cursor: "pointer" }}
        >
            <div className="hotel-image">
                <img src={image} alt={name} />
            </div>
            <div className="hotel-info">
                <h2 className="hotel-name">{name}</h2>
                <div className="hotel-location">
                    <i className="location-icon">📍</i>
                    <span>{location}</span>
                </div>
                <div className="hotel-rating">
                    {renderStars(rating)}
                    <span className="rating-number">({rating})</span>
                </div>
                <div className="hotel-contact">
                    <div className="contact-item">
                        <i className="phone-icon">📞</i>
                        <span>{phone}</span>
                    </div>
                    <div className="contact-item">
                        <i className="email-icon">✉️</i>
                        <span>{hotel_email}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hotel_Card;
