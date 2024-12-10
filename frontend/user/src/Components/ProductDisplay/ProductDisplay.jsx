import axios from "axios";

import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { useContext } from "react";
import { ShopContext } from "../../Context/Context";
import { BASE_URL } from "../../config";

export default function ProductDisplay({ product }) {
  const { token, getCartItems } = useContext(ShopContext);
  const handleAddToCart = async (id) => {
    const data = {
      productId: id,
    };
    const response = await axios.post(BASE_URL + "/cart", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    if (response.status === 200) {
      getCartItems();
    }

    console.log("add to cart response ===>", response);
  };
  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={BASE_URL + "/" + product?.image} alt="" />
          <img src={BASE_URL + "/" + product?.image} alt="" />
          <img src={BASE_URL + "/" + product?.image} alt="" />
          <img src={BASE_URL + "/" + product?.image} alt="" />
        </div>
        <div className="productdisplay-img">
          <img
            className="productdisplay-main-img"
            src={BASE_URL + "/" + product?.image}
            alt=""
          />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-star">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>122</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            ${product.old_price}
          </div>
          <div className="productdisplay-right-price-new">
            ${product.new_price}
          </div>
        </div>
        <div className="productdisplay-right-description">
          This tank top is loose on the armpits, perfect for the festival season
          or for your yoga class. It also looks great under a jacket or with a
          thick vest on colder days.
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
            <div>S</div>
            <div>N</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>
        <button onClick={() => handleAddToCart(product._id)}>
          ADD TO CART
        </button>
      </div>
    </div>
  );
}
