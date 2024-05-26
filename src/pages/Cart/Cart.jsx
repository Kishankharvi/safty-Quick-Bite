import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { imageUrl } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartIteams, rest_info, addItem, removeIteam, getTotalCartAmount } =
    useContext(StoreContext);
  const navigate = useNavigate();

  const isCartEmpty = Object.keys(cartIteams).length === 0;

  return (
    <div className="cart">
      {!isCartEmpty && (
        <div className="cart-items">
          <div className="cart-items-title">
            <p>Item</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <hr />
          {rest_info.map((item) => {
            const itemId = item.info.id;
            const price = item.info.costForTwo
              ? parseInt(item.info.costForTwo.replace(/\D/g, ""), 10)
              : 0;
            if (cartIteams[itemId] > 0) {
              return (
                <div key={itemId}>
                  <div className="cart-items-row">
                    <img src={imageUrl + item.info.cloudinaryImageId} alt="" />
                    <p>{item.info.cuisines}</p>
                    <p>₹{price}</p>
                    <p>{cartIteams[item.info.id]}</p>
                    <p>₹{price * cartIteams[item.info.id]}</p>
                    <p
                      onClick={() => removeIteam(item.info.id)}
                      className="cross"
                    >
                      x
                    </p>
                  </div>
                  <hr />
                </div>
              );
            }
            return null;
          })}
        </div>
      )}
      {isCartEmpty ? (
        <div className="cart-empty">
          <h2>Your cart is empty</h2>
          <p>Add some items to the cart to proceed to checkout.</p>
        </div>
      ) : (
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Total</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>₹{getTotalCartAmount()}</p>
              </div>
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>₹{getTotalCartAmount() === 0 ? 0 : 2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Total</p>
                <p>
                  ₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
                </p>
              </div>
            </div>
            <button onClick={() => navigate("/order")}>
              PROCEED TO CHECKOUT
            </button>
          </div>
          <div className="cart-promocode">
            <div>
              <p>If you have a promo code, enter it here</p>
              <div className="cart-promocode-input">
                <input type="text" placeholder="promo code" />
                <button>Submit</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
