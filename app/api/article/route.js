import { ConnectDB } from "@/lib/config/db";
import ArticleModel from "@/lib/models/ArticleModel";
import axios from "axios";
import { log } from "console";
import { writeFile } from "fs/promises";
const { NextResponse } = require("next/server");
const fs = require("fs");

const LoadDB = async () => {
  try {
    await ConnectDB();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error:", error);
    throw new Error("Database connection failed");
  }
};
LoadDB();
//API Endpoint for getting the articles
export async function GET(request) {
  const articleId = request.nextUrl.searchParams.get("id");
  if (articleId) {
    const article = await ArticleModel.findById(articleId);
    return NextResponse.json(article);
  } else {
    const blog = await ArticleModel.find({});
    return NextResponse.json(blog);
  }
}
//API Endpoin for uploading articles
export async function POST(request) {
  try {
    const formData = await request.formData();
    const timestamp = Date.now();

    const image = formData.get("image");
    if (!image) {
      console.error("No image provided");
      return NextResponse.json(
        { success: false, msg: "No image provided" },
        { status: 400 }
      );
    }

    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const path = `./public/${timestamp}_${image.name}`;
    await writeFile(path, buffer);
    const imgURL = `/${timestamp}_${image.name}`;

    const articleData = {
      title: formData.get("title") || "",
      description: formData.get("description") || "",
      category: formData.get("category") || "Technology",
      author: formData.get("author") || "Unknown",
      image: imgURL,
      authorImg: formData.get("authorImg") || "",
    };

    await ArticleModel.create(articleData);
    console.log("Article Saved");

    return NextResponse.json({ success: true, msg: "Article Added" });
  } catch (error) {
    console.error("Error handling POST request:", error.message, error.stack);
    return NextResponse.json(
      { success: false, msg: "Failed to add article" },
      { status: 500 }
    );
  }
}

//API Endpoint to delete article/s
export async function DELETE(request) {
  const id = await request.nextUrl.searchParams.get("id");
  const article = await ArticleModel.findById(id);
  fs.unlink(`./public/${article.image}`, () => {});
  await ArticleModel.findByIdAndDelete(id);
  return NextResponse.json({ msg: "Blog Deleted" });
}
