"use client";
import { assets } from "@/Assets/assets";
import axios from "axios";
import Image from "next/image";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const [image, setImage] = useState(false);
  const [data, setDate] = useState({
    title: "",
    description: "",
    category: "Technology",
    author: "Ali Badawi",
    authorImg: "/author_img.png",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setDate((data) => ({ ...data, [name]: value }));
    console.log(data);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("description", data.description);
    formData.append("author", data.author);
    formData.append("authorImg", data.authorImg);
    formData.append("image", image);
    try {
      const response = await axios.post("/api/article", formData);
      if (response.data.success) {
        toast.success(response.data.msg);
        setImage(false);
        setDate({
          title: "",
          description: "",
          category: "Technology",
          author: "Ali Badawi",
          authorImg: "/author_img.png",
        });
      } else {
        toast.error("Error");
      }
    } catch (error) {
      console.error("Submission error:", error.response || error.message); // Log error details
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <>
      <form onSubmit={onSubmitHandler} className="pt-5 px-5 sm:pt-12 sm:pl-16">
        <p className="text-xl ">Upload Thumbnail</p>
        <label htmlFor="image">
          <Image
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            width={140}
            height={70}
            alt=""
            className="mt-4"
          />
        </label>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          id="image"
          hidden
          required
        />
        <p className="text-xl mt-4">Article Title</p>
        <input
          name="title"
          value={data.title}
          onChange={onChangeHandler}
          type="text"
          placeholder="Type here."
          required
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border focus:border-black focus:outline-none focus:border-2 rounded"
        />
        <p className="text-xl mt-4">Article Description</p>
        <textarea
          name="description"
          value={data.description}
          onChange={onChangeHandler}
          type="text"
          placeholder="Write the content here."
          required
          rows={6}
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border focus:border-black focus:outline-none focus:border-2 rounded"
        />
        <p className="text-xl mt-4">Article Category</p>
        <select
          className="w-40 mt-4 px-4 py-3 border text-gray-800"
          name="category"
          value={data.category}
          onChange={onChangeHandler}
        >
          <option value="Technology">Technology</option>
          <option value="Media">Media</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>
        <br />
        <button type="submit" className="mt-8 w-40 h-12 bg-black text-white">
          ADD
        </button>
      </form>
    </>
  );
};

export default page;
