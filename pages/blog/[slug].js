import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import Header from "../../components/Header";
import ContentSection from "../../components/ContentSection";
import Footer from "../../components/Footer";
import Head from "next/head";
import { useIsomorphicLayoutEffect } from "../../utils";
import { stagger } from "../../animations";
import Button from "../../components/Button";
import { useRouter } from "next/router";

const BlogPost = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const textOne = useRef();
  const textTwo = useRef();
  const router = useRouter();
  const { slug } = router.query;

  useIsomorphicLayoutEffect(() => {
    if (post) {
      stagger([textOne.current, textTwo.current], { y: 30 }, { y: 0 });
    }
  }, [post]);

  useEffect(() => {
    if (slug) {
      const fetchPost = async () => {
        try {
          const res = await axios.get(`http://127.0.0.1:8000/blog/posts/slug/${slug}/`, {
            timeout: 5000, // Таймаут в миллисекундах
          });
          if (res.status === 200) {

            setPost(res.data);
          } else {
            setError('Post not found');
          }
        } catch (error) {
          setError('Error fetching post data');
        } finally {
          setLoading(false);
        }
      };

      fetchPost();
    }
  }, [slug]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <Head>
        <title>{"Blog - " + post.title}</title>
        <meta name="description" content={post.preview} />
      </Head>

      <div className={`container mx-auto mt-10`}>
        <Header/>
        <div className="mt-10 flex flex-col max-w-[1024px mx-auto">
          <img
            className="w-full h-96 rounded-lg shadow-lg object-cover max-w-[800px]"
            src={post.image}
            alt={post.title}
          ></img>
          <h1
            ref={textOne}
            className="mt-10 text-4xl mob:text-2xl laptop:text-6xl text-bold"
          >
            {post.title}
          </h1>
          <h2
            ref={textTwo}
            className="mt-2 text-xl max-w-4xl text-darkgray opacity-50"
          >
            {post.tagline}
          </h2>
          <div className="text-wrap">
        <p className="text-wrap">{post.description}</p>
        </div>
        </div>
       
      </div>
      {/* {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-6 right-6">
          <Button onClick={() => setShowEditor(true)} type={"primary"}>
            Edit this blog
          </Button>
        </div>
      )} */}

      
    </>
  );
};

export default BlogPost;
// pages/blog/[slug].js

// const BlogPost = () => {
//     return (
//       <>
//         <h1>Hello</h1>
//       </>
//     );
//   };
  
//   export default BlogPost;
  