import "./CartItems.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ShopContext } from "../../Context/Context";
import remove_icon from "../Assets/cart_cross_icon.png";
import { BASE_URL } from "../../config";

export default function CartItems() {
  const {
    allProducts,
    token,
    cartItems,
    getCartItems,
    // addToCart,
    // removeFromCart,
    getTotalCartAmountAndQuantity,
  } = useContext(ShopContext);

  const removeFromCart = async (productId) => {
    try {
      const data = {
        productId: productId,
      };
      const res = await axios.post(BASE_URL + "/cart-delete-item", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      console.log(res);
      if (res.status === 200) {
        getCartItems();
      }
    } catch (err) {
      console.log("Error in removing from cart", err);
    }
  };

  const calculateTotalAmount = () => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice = totalPrice + item.productId.new_price * item.quantity;
    });

    return totalPrice;
  };

  console.log("cart items is=======>", cartItems);

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {cartItems?.map((cartItem, i) => {
        return (
          <div key={i}>
            <div className="cartitems-format cartitems-format-main">
              <img
                src={BASE_URL + "/" + cartItem?.productId.image}
                alt=""
                className="carticon-product-icon"
              />
              <p>{cartItem?.productId.name}</p>
              <p>${cartItem?.productId.new_price}</p>
              <button className="cartitems-quantity">
                {cartItem?.quantity}
              </button>
              <p>${cartItem?.productId.new_price * cartItem?.quantity}</p>
              <img
                src={remove_icon}
                onClick={() => removeFromCart(cartItem?.productId._id)}
                alt=""
                className="cartitems-remove-icon"
              />
            </div>
            <hr />
          </div>
        );
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${calculateTotalAmount().toFixed(2)}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${calculateTotalAmount().toFixed(2)}</h3>
            </div>
          </div>
          <button>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cartitems-promocode">
          <p>If you have a promo code, Enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}
