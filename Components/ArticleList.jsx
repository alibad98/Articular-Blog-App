import { blog_data } from "@/Assets/assets";
import React, { useEffect, useState } from "react";
import ArticleItem from "./ArticleItem";
import axios from "axios";

const ArticleList = () => {
  const [menu, setMenu] = useState("All");
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    const response = await axios.get("/api/article");
    setArticles(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div>
      <div className="flex justify-center gap-6 my-10">
        <button
          onClick={() => setMenu("All")}
          className={
            menu === "All" ? "bg-black text-white py-1 px-4 rounded-sm" : ""
          }
        >
          All
        </button>
        <button
          onClick={() => setMenu("Technology")}
          className={
            menu === "Technology"
              ? "bg-black text-white py-1 px-4 rounded-sm"
              : ""
          }
        >
          Technology
        </button>
        <button
          onClick={() => setMenu("Media")}
          className={
            menu === "Media" ? "bg-black text-white py-1 px-4 rounded-sm" : ""
          }
        >
          Media
        </button>
        <button
          onClick={() => setMenu("Lifestyle")}
          className={
            menu === "Lifestyle"
              ? "bg-black text-white py-1 px-4 rounded-sm"
              : ""
          }
        >
          Lifestyle
        </button>
      </div>
      <div className="flex justify-around flex-wrap gap-6 gap-y-10 mb-16 xl:mx-24">
        {articles
          .filter((item) => (menu === "All" ? true : item.category === menu))
          .map((item, index) => (
            <ArticleItem
              key={index}
              title={item.title}
              image={item.image}
              description={item.description}
              category={item.category}
              id={item._id}
            />
          ))}
      </div>
    </div>
  );
};

export default ArticleList;
