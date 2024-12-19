// / app/api/blogs/route.js
import { mongooseConnect } from "@/lib/mongoose";
import { Blog } from "@/models/Blog";
import { NextResponse } from "next/server";

export async function POST(req) {
  console.log("Starting POST request handler");

  try {
    // 1. Connect to MongoDB
    console.log("Connecting to MongoDB...");
    await mongooseConnect();
    console.log("Successfully connected to MongoDB");

    // 2. Parse request body
    console.log("Parsing request body...");
    const body = await req.json();
    console.log("Received body:", body);

    // 3. Extract and validate required fields
    const {
      title,
      slug,
      description,
      category,
      tags,
      status = "draft",
      images = [],
    } = body;

    // 4. Validate required fields
    if (!title || !slug) {
      console.log("Validation failed: Missing required fields");
      return NextResponse.json(
        { success: false, message: "Title and Slug are required" },
        { status: 400 }
      );
    }

    // 5. Prepare blog data with proper status value
    const blogData = {
      title,
      slug,
      description,
      category: Array.isArray(category) ? category : [],
      tags: Array.isArray(tags) ? tags : [],
      status: status === "publish" ? "published" : status, // Convert 'publish' to 'published'
      images: Array.isArray(images) ? images : [],
    };

    console.log("Prepared blog data:", blogData);

    // 6. Create blog document
    console.log("Creating blog document...");
    const blogDoc = await Blog.create(blogData);
    console.log("Blog document created successfully:", blogDoc);

    // 7. Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Blog created successfully",
        data: blogDoc,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error details:", {
      name: error.name,
      message: error.message,
      stack: error.stack,
      errors: error.errors, // Mongoose validation errors
    });

    // Handle specific error types
    if (error.name === "ValidationError") {
      return NextResponse.json(
        {
          success: false,
          message: "Validation error",
          errors: Object.values(error.errors).map((err) => err.message),
        },
        { status: 400 }
      );
    }

    if (error.code === 11000) {
      // Duplicate key error
      return NextResponse.json(
        {
          success: false,
          message: "Duplicate slug found. Please use a different title.",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
