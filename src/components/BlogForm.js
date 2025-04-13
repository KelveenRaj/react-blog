import React, { useState } from "react";
import {
  Box,
  Input,
  Textarea,
  Button,
  VStack,
  useToast,
} from "@chakra-ui/react";

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) {
      toast({
        title: "All fields are required",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    const timestamp = Date.now();

    // create blog obj
    const newPost = {
      id: String(timestamp),
      title: title,
      content: content,
      date: new Date(timestamp).toLocaleDateString(),
    };

    // save new blog with existing blogs in localStorage
    const existingBlogs = JSON.parse(localStorage.getItem("blog-posts")) || [];
    const updatedBlogs = [newPost, ...existingBlogs];
    localStorage.setItem("blog-posts", JSON.stringify(updatedBlogs));

    // after creating reset title and content
    setTitle("");
    setContent("");
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <VStack>
        <Input
          placeholder="Blog Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <Textarea
          placeholder="Blog Content"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          rows={6}
        />
        <Button type="submit" colorScheme="teal">
          Create Post
        </Button>
      </VStack>
    </Box>
  );
};

export default BlogForm;
