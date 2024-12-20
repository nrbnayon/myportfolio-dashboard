// app/api/blogs/route.js
import { mongooseConnect } from "@/lib/mongoose";
import { Blog } from "@/models/Blog";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await mongooseConnect();
    const body = await req.json();

    const { title, slug, description, category, tags, status, images } = body;

    // Validate required fields
    if (!title || !slug) {
      return NextResponse.json(
        { success: false, message: "Title and Slug are required" },
        { status: 400 }
      );
    }

    const blogDoc = await Blog.create({
      title,
      slug,
      description,
      category: Array.isArray(category) ? category : [],
      tags: Array.isArray(tags) ? tags : [],
      status,
      images: Array.isArray(images) ? images : [],
    });

    return NextResponse.json(
      {
        success: true,
        message: "Blog created successfully",
        data: blogDoc,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
