import React, { useState } from "react";
import BoxContainer from "../components/BoxContainer";
import axios from "axios";

import { BASE_URL } from "../../config";

const AddProduct = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    console.log(data);
    try {
      const response = await axios.post(BASE_URL + "/admin/add-product", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  console.log(image);
  return (
    <BoxContainer>
      <form
        className="w-[600px] p-6 flex flex-col gap-6 border border-[#7a7a7a] ml-6 mt-6 rounded-2xl "
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="flex flex-col">
          <span>Name</span>
          <input
            placeholder="Name"
            type="text"
            name="name"
            className="border border-[#7a7a7a] rounded-[8px] p-2"
          />
        </div>
        <div className="flex gap-2">
          <div className="flex flex-col flex-1">
            <span>New Price</span>
            <input
              placeholder="New Price"
              type="number"
              name="new_price"
              className="border border-[#7a7a7a] rounded-[8px] p-2"
            />
          </div>
          <div className="flex flex-col flex-1">
            <span>Old Price</span>
            <input
              placeholder="Old Price"
              type="number"
              name="old_price"
              className="border border-[#7a7a7a] rounded-[8px] p-2"
            />
          </div>
        </div>
        <div className="flex gap-3">
          <div className="flex flex-col flex-1">
            <span>Category</span>
            <select
              name="category"
              className="border border-[#7a7a7a] rounded-[8px] p-2"
            >
              <option value="women">Women</option>
              <option value="men">Men</option>
              <option value="kid">Kid</option>
            </select>
          </div>
          <div className="flex flex-col flex-1">
            <span>Product Image</span>
            <input type="file" name="image" accept=".png, .jpg, .jpeg" />
          </div>
        </div>
        <button
          type="submit"
          className=" bg-[#ff4141] text-[#ffff] px-4 py-2 rounded-xl"
        >
          Submit
        </button>
      </form>
    </BoxContainer>
  );
};

export default AddProduct;
