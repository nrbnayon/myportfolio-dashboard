// Correct way to structure the handler
import { mongooseConnect } from "@/lib/mongoose";
import { Blog } from "@/models/Blog";

export async function POST(req, res) {
  await mongooseConnect(); // Ensure that MongoDB is connected

  console.log("req:", req);
  console.log("res:", res);

  try {
    const { title, slug, description, blogcategory, tags, status, images } =
      req.body;

    if (!title || !slug) {
      return res
        .status(400)
        .json({ success: false, message: "Title and Slug are required" });
    }

    // Create a new blog post
    const blogDoc = await Blog.create({
      title,
      slug,
      description,
      blogcategory,
      tags,
      status,
      images,
    });

    // Return a success response
    return res.status(201).json({ success: true, data: blogDoc });
  } catch (error) {
    console.error("Error creating blog:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

// // Import necessary dependencies
// import { mongooseConnect } from "@/lib/mongoose"; // MongoDB connection utility
// import { Blog } from "@/models/Blog"; // Blog model

// // POST: Create a new blog
// export async function POST(req, res) {
//   await mongooseConnect(); // Ensure that MongoDB is connected

//   try {
//     const { title, slug, description, blogcategory, tags, status, images } =
//       req.body; // Extract data from the request body

//     // Validate that required fields are provided
//     if (!title || !slug) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Title and Slug are required" });
//     }

//     // Create a new blog post
//     const blogDoc = await Blog.create({
//       title,
//       slug,
//       description,
//       blogcategory,
//       tags,
//       status,
//       images,
//     });

//     // Return a success response
//     return res.status(201).json({ success: true, data: blogDoc });
//   } catch (error) {
//     console.error("Error creating blog:", error);
//     // Return an internal server error if something goes wrong
//     return res
//       .status(500)
//       .json({ success: false, message: "Internal server error" });
//   }
// }

// // GET: Fetch all blogs or a single blog by id
// export async function GET(req, res) {
//   await mongooseConnect(); // Ensure that MongoDB is connected

//   try {
//     const { id } = req.query;

//     if (id) {
//       // If an ID is provided, fetch a single blog
//       const blog = await Blog.findById(id);
//       if (!blog) {
//         return res
//           .status(404)
//           .json({ success: false, message: "Blog not found" });
//       }
//       return res.status(200).json({ success: true, data: blog });
//     } else {
//       // If no ID is provided, fetch all blogs
//       const blogs = await Blog.find({});
//       return res.status(200).json({ success: true, data: blogs });
//     }
//   } catch (error) {
//     console.error("Error fetching blogs:", error);
//     // Return an internal server error if something goes wrong
//     return res
//       .status(500)
//       .json({ success: false, message: "Internal server error" });
//   }
// }

// // PUT: Update a blog by id
// export async function PUT(req, res) {
//   await mongooseConnect(); // Ensure that MongoDB is connected

//   try {
//     const { id } = req.query;
//     if (!id) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Blog ID is required" });
//     }

//     const { title, slug, description, blogcategory, tags, status, images } =
//       req.body;

//     // Update the blog with the new data
//     const blogDoc = await Blog.findByIdAndUpdate(
//       id,
//       {
//         title,
//         slug,
//         description,
//         blogcategory,
//         tags,
//         status,
//         images,
//       },
//       { new: true } // Return the updated document
//     );

//     if (!blogDoc) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Blog not found" });
//     }

//     return res.status(200).json({ success: true, data: blogDoc });
//   } catch (error) {
//     console.error("Error updating blog:", error);
//     return res
//       .status(500)
//       .json({ success: false, message: "Internal server error" });
//   }
// }

// // DELETE: Delete a blog by id
// export async function DELETE(req, res) {
//   await mongooseConnect(); // Ensure that MongoDB is connected

//   try {
//     const { id } = req.query;
//     if (!id) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Blog ID is required" });
//     }

//     // Delete the blog by its ID
//     const blogDoc = await Blog.findByIdAndDelete(id);
//     if (!blogDoc) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Blog not found" });
//     }

//     return res
//       .status(200)
//       .json({ success: true, message: "Blog deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting blog:", error);
//     return res
//       .status(500)
//       .json({ success: false, message: "Internal server error" });
//   }
// }

// // Handle unsupported methods
// export async function handler(req, res) {
//   res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
//   return res
//     .status(405)
//     .json({ success: false, message: `Method ${req.method} not allowed` });
// }
