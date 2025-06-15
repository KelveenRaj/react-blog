import React, { useState } from "react";
import {
  Box,
  Input,
  Textarea,
  Button,
  useToast,
  FormControl,
  FormLabel,
  Image,
  Stack,
} from "@chakra-ui/react";

const UPLOAD_PRESET = "free-upload";
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dkzvmyuvk/image/upload";

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const uploadImageToCloudinary = async (imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", UPLOAD_PRESET);

    const response = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      return data.public_id;
    } else {
      throw new Error(data.error.message || "Image upload failed");
    }
  };

  const handleSubmit = async (e) => {
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

    setIsSubmitting(true);

    try {
      let imageUrl = "";
      if (imageFile) {
        imageUrl = await uploadImageToCloudinary(imageFile);
      }

      const timestamp = Date.now();

      // create blog obj
      const newPost = {
        title: title,
        content: content,
        date: new Date(timestamp).toLocaleDateString(),
        imageUrl,
      };

      addBlog(newPost);

      // after creating reset title and content and image
      setTitle("");
      setContent("");
      setImageFile(null);
      setPreviewUrl(null);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <Stack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Title</FormLabel>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Content</FormLabel>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter blog content"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Cover Image</FormLabel>
          <Input type="file" accept="image/*" onChange={handleImageChange} />
        </FormControl>

        {previewUrl && (
          <Image
            src={previewUrl}
            alt="Preview-Image"
            boxSize="200px"
            objectFit="cover"
          />
        )}

        <Button type="submit" colorScheme="blue" isLoading={isSubmitting}>
          Add Blog
        </Button>
      </Stack>
    </Box>
  );
};

export default BlogForm;
