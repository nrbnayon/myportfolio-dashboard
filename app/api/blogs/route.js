// app/api/blogs/route.js

import { mongooseConnect } from "@/lib/mongoose";
import { Blog } from "@/models/Blog";

export default async function handle(req, res) {
  await mongooseConnect();

  const { method } = req;

  try {
    // POST: Create a new blog
    if (method === "POST") {
      console.log("body", req.body);
      const { title, slug, description, blogcategory, tags, status, images } =
        req.body;

      if (!title || !slug) {
        return res
          .status(400)
          .json({ success: false, message: "Title and Slug are required" });
      }

      const blogDoc = await Blog.create({
        title,
        slug,
        description,
        blogcategory,
        tags,
        status,
        images,
      });
      return res.status(201).json({ success: true, data: blogDoc });
    }

    // GET: Fetch all blogs or a single blog by id
    if (method === "GET") {
      const { id } = req.query;

      if (id) {
        // Fetch a single blog by id
        const blog = await Blog.findById(id);
        if (!blog) {
          return res
            .status(404)
            .json({ success: false, message: "Blog not found" });
        }
        return res.status(200).json({ success: true, data: blog });
      } else {
        // Fetch all blogs
        const blogs = await Blog.find({});
        return res.status(200).json({ success: true, data: blogs });
      }
    }

    // PUT: Update a blog by id
    if (method === "PUT") {
      const { id } = req.query;
      if (!id) {
        return res
          .status(400)
          .json({ success: false, message: "Blog ID is required" });
      }

      const { title, slug, description, blogcategory, tags, status, images } =
        req.body;

      const blogDoc = await Blog.findByIdAndUpdate(
        id,
        {
          title,
          slug,
          description,
          blogcategory,
          tags,
          status,
          images,
        },
        { new: true }
      );

      if (!blogDoc) {
        return res
          .status(404)
          .json({ success: false, message: "Blog not found" });
      }

      return res.status(200).json({ success: true, data: blogDoc });
    }

    // DELETE: Delete a blog by id
    if (method === "DELETE") {
      const { id } = req.query;
      if (!id) {
        return res
          .status(400)
          .json({ success: false, message: "Blog ID is required" });
      }

      const blogDoc = await Blog.findByIdAndDelete(id);
      if (!blogDoc) {
        return res
          .status(404)
          .json({ success: false, message: "Blog not found" });
      }

      return res
        .status(200)
        .json({ success: true, message: "Blog deleted successfully" });
    }

    // Handle unsupported methods
    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
    return res
      .status(405)
      .json({ success: false, message: `Method ${method} not allowed` });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}
