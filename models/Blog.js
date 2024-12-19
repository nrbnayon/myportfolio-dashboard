const { Schema, models, model } = require("mongoose");

const BlogSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true }, // Ensure unique slugs
    images: [{ type: String }],
    description: { type: String },
    blogcategory: [{ type: String }],
    tags: [{ type: String }],
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  {
    timestamps: true,
  }
);

// Use existing model or create new one
export const Blog = models.Blog || model("Blog", BlogSchema, "blogs");
