// models/Blog.js
import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    category: {
      type: [String],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: {
        values: ["draft", "published"],
        message: "{VALUE} is not a valid status",
      },
      default: "draft",
    },
    images: {
      type: [String],
      default: [],
    },
    // comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate model compilation error
export const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

// // models/Blog.js

// const { Schema, models, model } = require("mongoose");

// const BlogSchema = new Schema(
//   {
//     title: { type: String, required: true },
//     slug: { type: String, required: true, unique: true }, // Ensure unique slugs
//     images: [{ type: String }],
//     description: { type: String },
//     blogcategory: [{ type: String }],
//     tags: [{ type: String }],
//     status: {
//       type: String,
//       enum: ["draft", "published", "archived"],
//       default: "draft",
//     },
//     comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
//   },
//   {
//     timestamps: true,
//   }
// );

// // Use existing model or create new one
// export const Blog = models.Blog || model("Blog", BlogSchema, "blogs");
