import { useRef, useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Head from "next/head";
import UserProfile from "../components/UserProfile";
import GuestContent from "../components/GuestContent";
import TopRated from "../components/TopRated"
// Local Data
import data from "../data/portfolio.json";

export default function Home() {
  const [username, setUsername] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Проверка выполнения на клиенте
    if (typeof window !== 'undefined') {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        setIsAuthenticated(true);
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
          setUsername(storedUsername);
        }
      }
    }
  }, []);

  // Handling Scroll

  return (
    <div className={`relative p-6 min-h-screen flex flex-col p-6 max-w-[1440px] mx-auto`}>
      <Head>
        <title>{username}</title>
      </Head>

      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>

      <Header />
      <div className="flex-grow">
        {/* {isAuthenticated ? (
          <UserProfile
            username={username}
          />
        ) : (
          <div className="flex items-center justify-center h-full mt-[20%]">
            <GuestContent />
          </div>
        )} */}
        <TopRated></TopRated>
      </div>
    </div>
  );
}
