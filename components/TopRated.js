import Head from "next/head";
import Router, { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { stagger } from "../animations";
import Button from "./Button";
import Header from "./Header";
// import { ISOToDate, useIsomorphicLayoutEffect } f
import { ISOToDate, useIsomorphicLayoutEffect } from "../utils";
import axios from "axios";

const TopRated = () => {
  const text = useRef();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [posts, setPosts] = useState([]);

  useIsomorphicLayoutEffect(() => {
    stagger(
      [text.current],
      { y: 40, x: -10, transform: "scale(0.95) skew(10deg)" },
      { y: 0, x: 0, transform: "scale(1)" }
    );
    stagger([text.current], { y: 30 }, { y: 0 });
  }, []);

  useEffect(() => {
    setMounted(true);
    const fetchUserPosts = async () => {
      try {
        const username = localStorage.getItem('username'); // Получение имени пользователя из localStorage
        if (username) {
          const url = `http://127.0.0.1:8000/blog/top_rated_posts/`; // Формирование URL
          const res = await axios.get(url);
          setPosts(res.data);
        }
      } catch (error) {
        console.error('Error fetching user posts:', error);
      }
    };

    fetchUserPosts();
  }, []);

 

  return (
      <>
        <Head>
          <title>Blog</title>
        </Head>
        <div className={`container mx-auto mb-10 `}>
          <div className="mt-10">
            <h1
              ref={text}
              className="mx-auto mob:p-2 text-bold text-6xl laptop:text-8xl w-full"
            >
              Best Authors  
            </h1>
            <div className="mt-10 grid grid-cols-1 mob:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 justify-between gap-10">
              {Array.isArray(posts) && posts.length > 0 ? (
                posts.map((post) => (
                  <div
                    className="cursor-pointer relative"
                    key={post.slug}
                    onClick={() => Router.push(`/blog/${post.slug}`)}
                  >
                    <img
                      className="w-full h-60 rounded-lg shadow-lg object-cover"
                      src={post.image}
                      alt={post.title}
                    />
                    <h2 className="mt-5 text-4xl">{post.title}</h2>
                    <p className="mt-2 opacity-50 text-lg">{post.preview}</p>
                    <span className="text-sm mt-5 opacity-25 cursor-pointer">
                     {post.author}
                    </span>
                    {process.env.NODE_ENV === "development" && mounted && (
                      <div className="absolute top-0 right-0">
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p>No posts found.</p>
              )}
            </div>
          </div>
        </div>
        {process.env.NODE_ENV === "development" && mounted && (
          <div className="fixed bottom-6 right-6">
          </div>
        )}
      </>
    )
};

export default TopRated;
