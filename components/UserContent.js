import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import ServiceCard from "./ServiceCard";
import Socials from "./Socials";
import WorkCard from "./WorkCard";
import { stagger } from "../animations";
import Link from 'next/link';
import Button from "./Button";

const UserContent = ({ handleWorkScroll, handleAboutScroll, username }) => {
  const [userData, setUserData] = useState(null);
  const workRef = useRef();
  const aboutRef = useRef();
  const textOne = useRef();
  const textTwo = useRef();
  const textThree = useRef();
  const textFour = useRef();

  useEffect(() => {
    // Fetch user data from backend
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/userprofile/${username}/`);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [username]);

  useEffect(() => {
    if (userData && textOne.current && textTwo.current && textThree.current && textFour.current) {
      stagger(
        [textOne.current, textTwo.current, textThree.current, textFour.current],
        { y: 40, x: -10, transform: "scale(0.95) skew(10deg)" },
        { y: 0, x: 0, transform: "scale(1)" }
      );
    }
  }, [userData]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="laptop:mt-20 mt-10">
        <div className="mt-5">
          <h1
            ref={textOne}
            className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-4/5 mob:w-full laptop:w-4/5"
          >
            {username}
          </h1>
          <h1
            ref={textTwo}
            className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-full laptop:w-4/5"
          >
            {userData.header_tagline_two}
          </h1>
          <h1
            ref={textThree}
            className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-full laptop:w-4/5"
          >
            {userData.header_tagline_three}
          </h1>
          <h1
            ref={textFour}
            className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-full laptop:w-4/5"
          >
            {userData.header_tagline_four}
          </h1>
        </div>

        <Socials className="mt-2 laptop:mt-5" socials={userData.socials} />
      </div>
      <div className="mt-10 laptop:mt-30 p-2 laptop:p-0" ref={workRef}>
        <h1 className="text-2xl text-bold">Work.</h1>

        <div className="mt-5 laptop:mt-10 grid grid-cols-1 tablet:grid-cols-2 gap-4">
          {userData.projects.map((project) => (
            <WorkCard
              key={project.id}
              img={project.image_src}
              name={project.title}
              description={project.description}
              onClick={() => window.open(project.url)}
            />
          ))}
        </div>
      </div>

      <div className="mt-10 laptop:mt-30 p-2 laptop:p-0">
        <h1 className="tablet:m-10 text-2xl text-bold">Services.</h1>
        <div className="mt-5 tablet:m-10 grid grid-cols-1 laptop:grid-cols-2 gap-6">
          {userData.services.map((service, index) => (
            <ServiceCard
              key={index}
              name={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>

      <div className="fixed bottom-5 right-5">
        <Link href="/edit">
          <Button type="primary">Edit Data</Button>
        </Link>
      </div>
      
      <div className="mt-10 laptop:mt-40 p-2 laptop:p-0" ref={aboutRef}>
        <h1 className="tablet:m-10 text-2xl text-bold">About.</h1>
        <p className="tablet:m-10 mt-2 text-xl laptop:text-3xl w-full laptop:w-3/5">
          {userData.about_para}
        </p>
      </div>
    </div>
  );
};

export default UserContent;
