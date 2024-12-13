import React, { useState } from "react";
import { generateSlug } from "../utils/generateSlug";
import Spinner from "./Spinner";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";

export default function Blog() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);

    // Automatically generate slug when title changes
    const generatedSlug = generateSlug(newTitle);
    setSlug(generatedSlug);
  };

  return (
    <form className='addWebsiteform'>
      <div className='w-100 flex flex-col flex-left mb-2'>
        <label htmlFor='title'>Title</label>
        <input
          type='text'
          id='title'
          placeholder='Enter small title'
          value={title}
          onChange={handleTitleChange}
          className='w-full p-2 border rounded'
        />
      </div>

      <div className='w-100 flex flex-col flex-left mb-2'>
        <label htmlFor='slug'>Slug</label>
        <input
          type='text'
          id='slug'
          value={slug}
          readOnly
          className='w-full p-2 border rounded bg-gray-100 cursor-not-allowed'
          placeholder='Automatically generated slug'
        />
      </div>

      <div className='w-100 flex flex-col flex-left mb-2'>
        <label htmlFor='category'>
          Select Category (for multi select ctr + mouse left key)
        </label>
        <select name='category' id='category' multiple>
          <option value='' disabled>
            Select
          </option>
          <option value='reactjs'>React.js</option>
          <option value='nextjs'>Next.js</option>
          <option value='nodejs'>Node.js</option>
          <option value='html'>HTML</option>
          <option value='css'>CSS</option>
          <option value='javascript'>JavaScript</option>
          <option value='typescript'>TypeScript</option>
          <option value='mongodb'>MongoDB</option>
          <option value='express'>Express.js</option>
        </select>
      </div>

      <div className='w-100 flex flex-col flex-left mb-2 '>
        <div className='w-100'>
          <label htmlFor='images'>
            Images (first image will be show as thumbnail, you can drag and
            drop){" "}
          </label>
          <input
            type='file'
            id='fileInput'
            className='mt-1'
            accept='image/*'
            multiple
          />
        </div>
        <div className='w-100 flex flex-col flex-left mt-1'>
          <Spinner />
        </div>
      </div>

      {/* Image preview */}

      <div className='w-100 flex flex-col flex-left mb-2'>
        <label htmlFor="'description'">
          Blog Content (for image: first upload and copy link and paste in ![alt
          text](link))
        </label>
        <MDEditor
          value={value}
          onChange={setValue}
          previewOptions={{
            rehypePlugins: [[rehypeSanitize]],
          }}
        />
      </div>
    </form>
  );
}
