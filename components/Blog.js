import React, { useState } from "react";
import { generateSlug } from "../utils/generateSlug"; // Adjust path as needed

export default function Blog() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);

    // Automatically generate slug when title changes
    const generatedSlug = generateSlug(newTitle);
    setSlug(generatedSlug);
  };

  return (
    <div className='addWebsiteform'>
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

      <div className='w-100 flex flex-col flex-left -mb-2'>
        <label htmlFor='category'>Select Category</label>
      </div>
    </div>
  );
}
