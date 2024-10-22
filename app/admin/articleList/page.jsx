"use client";

import ArticleTableiItem from "@/Components/AdminComponents/ArticleTableiItem";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    try {
      const response = await axios.get("/api/article");
      setArticles(response.data || []);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  const deleteArticle = async (mongoId) => {
    const response = await axios.delete("/api/article", {
      params: {
        id: mongoId,
      },
    });
    toast.success(response.data.msg);
    fetchArticles();
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <h1>All Articles</h1>
      <div className="relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-sm text-gray-700 text-left uppercase bg-gray-50">
            <tr>
              <th scope="col" className="hidden sm:block px-6 py-3 ">
                Author Name
              </th>
              <th scope="col" className="px-6 py-3 ">
                Article Title
              </th>
              <th scope="col" className="px-6 py-3 ">
                Date
              </th>
              <th scope="col" className="px-6 py-3 ">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {articles.map((item, index) => {
              return (
                <ArticleTableiItem
                  key={index}
                  mongoId={item._id}
                  title={item.title}
                  author={item.author}
                  authorImg={item.authorImg}
                  date={item.date}
                  deleteArticle={deleteArticle}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
