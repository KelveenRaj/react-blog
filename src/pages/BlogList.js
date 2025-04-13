import { useEffect, useState } from "react";
import { Divider, Box, Heading, Text, SimpleGrid } from "@chakra-ui/react";
import BlogForm from "../components/BlogForm";
import { base } from "framer-motion/client";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem("blog-posts")) || [];
    setBlogs(storedBlogs);
  }, []);

  return (
    <>
      <BlogForm />
      <Divider my={8} />
      {blogs.length === 0 ? (
        <Text>No blogs found.</Text>
      ) : (
        <SimpleGrid columns={3} spacing={6}>
          {blogs.map((blog) => (
            <Box>
              <Heading size={"md"} mb={1}>
                {blog.title}
              </Heading>
              <Text fontSize={"sm"} color={"gray.500"}>
                {blog.date}
              </Text>
              <Text mt={2} noOfLines={3}>
                {blog.content}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </>
  );
};

export default BlogList;
