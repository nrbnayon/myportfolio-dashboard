"use client";

import React, { useState, useCallback } from "react";
import { generateSlug } from "../utils/generateSlug";
import rehypeHighlight from "rehype-highlight";
import rehypeSanitize from "rehype-sanitize";
import MDEditor from "@uiw/react-md-editor";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Existing components remain unchanged
const Spinner = () => (
  <div className='flex items-center justify-center'>
    <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500'></div>
  </div>
);

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    const cleanText = text.replace(/\u200B/g, "").trim();
    navigator.clipboard.writeText(cleanText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      style={{
        position: "absolute",
        width: "20%",
        top: "8px",
        right: "0",
        zIndex: 1,
        padding: "1px 2px",
        backgroundColor: copied ? "#28a745" : "#007bff",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        transition: "background-color 0.3s",
      }}
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
};

const CustomMarkdownComponents = {
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    const code = String(children).replace(/\n$/, "");

    if (!inline && match) {
      return (
        <div style={{ position: "relative" }}>
          <SyntaxHighlighter
            style={materialDark}
            language={match[1]}
            PreTag='div'
            {...props}
          >
            {code}
          </SyntaxHighlighter>
          <CopyButton text={code} />
        </div>
      );
    }

    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  img({ src, alt }) {
    if (!src) return null;

    return (
      <Image
        src={src}
        alt={alt || ""}
        width={800}
        height={400}
        style={{
          maxWidth: "100%",
          height: "auto",
          display: "block",
          margin: "10px 0",
        }}
      />
    );
  },
};

export default function Blog() {
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    category: [],
    status: "",
    tags: [],
  });

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  // Handle title change and generate slug
  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title: newTitle,
      slug: generateSlug(newTitle),
    }));
  };

  // Handle description (MDEditor) change
  const handleDescriptionChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      description: value,
    }));
  };

  // Handle multiple select (categories and tags)
  const handleMultipleSelect = (e, field) => {
    const selected = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFormData((prev) => ({
      ...prev,
      [field]: selected,
    }));
  };

  // Handle status change
  const handleStatusChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      status: e.target.value,
    }));
  };

  // Handle file upload
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setIsUploading(true);
    setSelectedFiles(files);

    try {
      // Create image previews
      const filePreviews = files.map((file) => URL.createObjectURL(file));
      setPreviews(filePreviews);

      // Prepare for upload
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`image${index}`, file);
      });

      // TODO: Replace with your actual upload API endpoint
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload images");
      }

      const data = await response.json();
      // Handle successful upload (e.g., save image URLs)
    } catch (error) {
      setError("Error uploading images: " + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Validate form data
      if (!formData.title || !formData.description || !formData.status) {
        throw new Error("Please fill in all required fields");
      }

      // Prepare the post data
      const postData = {
        ...formData,
        images: selectedFiles.length > 0 ? previews : [],
        createdAt: new Date().toISOString(),
      };

      console.log("Submitting data:", postData); // Debug log

      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create post");
      }

      // Handle successful submission
      router.push(`/blog/${data.data.slug}`);
    } catch (error) {
      setError(error.message);
      console.error("Submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log("first", formData);

  return (
    <form className='addWebsiteform max-w-[85%]' onSubmit={handleSubmit}>
      {error && (
        <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
          {error}
        </div>
      )}

      <div className='w-100 flex flex-col flex-left mb-2'>
        <label htmlFor='title'>Title</label>
        <input
          type='text'
          id='title'
          placeholder='Enter small title'
          value={formData.title}
          onChange={handleTitleChange}
          className='w-full p-2 border rounded'
        />
      </div>

      <div className='w-100 flex flex-col flex-left mb-2'>
        <label htmlFor='slug'>Slug</label>
        <input
          type='text'
          id='slug'
          value={formData.slug}
          readOnly
          className='w-full p-2 border rounded bg-gray-100 cursor-not-allowed'
          placeholder='Automatically generated slug'
        />
      </div>

      <div className='w-100 flex flex-col flex-left mb-2'>
        <label htmlFor='category'>
          Select Category (for multi select ctr + mouse left key)
        </label>
        <select
          name='category'
          id='category'
          multiple
          onChange={(e) => handleMultipleSelect(e, "category")}
          value={formData.category}
        >
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
          <option value='database'>Database</option>
        </select>
      </div>

      <div className='w-100 flex flex-col flex-left mb-2'>
        <div className='w-100'>
          <label htmlFor='images'>
            Images (first image will be show as thumbnail, you can drag and
            drop)
          </label>
          <input
            type='file'
            id='fileInput'
            className='mt-1'
            accept='image/*'
            multiple
            onChange={handleFileChange}
          />
        </div>

        {isUploading && <Spinner />}

        {previews.length > 0 && (
          <div className='flex space-x-2 mt-2'>
            {previews.map((preview, index) => (
              <Image
                key={index}
                src={preview}
                alt={`Preview ${index + 1}`}
                width={100}
                height={100}
                className='object-cover rounded'
              />
            ))}
          </div>
        )}
      </div>

      <div className='w-100 flex flex-col flex-left mb-2'>
        <label htmlFor='description'>
          Blog Content (for image: first upload and copy link and paste in ![alt
          text](link))
        </label>
        <MDEditor
          value={formData.description}
          onChange={handleDescriptionChange}
          height={400}
          style={{ width: "100%" }}
          previewOptions={{
            components: CustomMarkdownComponents,
            rehypePlugins: [rehypeSanitize, rehypeHighlight],
          }}
          textareaProps={{
            placeholder: "Write your blog content here... (Supports Markdown)",
            spellCheck: true,
          }}
        />
      </div>

      <div className='w-100 flex flex-col flex-left mb-2'>
        <label htmlFor='tags'>Tags </label>
        <select
          name='tags'
          id='tags'
          multiple
          onChange={(e) => handleMultipleSelect(e, "tags")}
          value={formData.tags}
        >
          <option value='reactjs'>React.js</option>
          <option value='nextjs'>Next.js</option>
          <option value='nodejs'>Node.js</option>
          <option value='html'>HTML</option>
          <option value='css'>CSS</option>
          <option value='javascript'>JavaScript</option>
          <option value='typescript'>TypeScript</option>
          <option value='mongodb'>MongoDB</option>
          <option value='express'>Express.js</option>
          <option value='database'>Database</option>
        </select>
      </div>

      <div className='w-100 flex flex-col flex-left mb-2'>
        <label htmlFor='status'>Status </label>
        <select
          name='status'
          id='status'
          onChange={handleStatusChange}
          value={formData.status}
        >
          <option value=''>No Select</option>
          <option value='draft'>Draft</option>
          <option value='published'>Publish</option>
        </select>
      </div>

      <div className='w-100 mb-2'>
        <button
          type='submit'
          disabled={isLoading}
          className='addwebbtn hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          {isLoading ? "SAVING..." : "SAVE BLOG"}
        </button>
      </div>
    </form>
  );
}
