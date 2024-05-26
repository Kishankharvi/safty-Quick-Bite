import React from "react";
import "./RestaurantModal.css";
import { imageUrl } from "../../utils/constants";
import { StarIcon } from "../../assets/StarSvg";

const RestaurantModal = ({ restaurant, onClose, addIteam }) => {
  if (!restaurant) return null;

  const {
    id,
    name,
    cuisines,
    areaName,
    costForTwo,
    avgRatingString,
    cloudinaryImageId,
  } = restaurant.info;
  const handleAddToCart = () => {
    const result = addIteam(id);
    if (result) {
      alert(`Item ${result.itemName} added to cart. Count: ${result.count}`);
    }
  };

  return (
    <div className="modal1">
      <div className="modal-content1">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <div className="modal-header">
          <img src={imageUrl + cloudinaryImageId} alt={name} />
        </div>
        <div className="modal-body">
          <h2>{cuisines}</h2>
          <div className="modal-rating">
            <StarIcon />
            <span>{avgRatingString}</span>
          </div>
          <p>{name}</p>
          <p>{areaName}</p>
          <p>{costForTwo}</p>
          <button className="add-to-cart-button" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantModal;
