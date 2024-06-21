import { useRouter } from 'next/router';
import UserProfile from '../components/UserProfile';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
const UserProfilePage = () => {
    const router = useRouter();
    const [username, setUsername] = useState(null);
  
    useEffect(() => {
      if (router.query.username) {
        setUsername(router.query.username);
      }
    }, [router.query.username]);
  
    if (!username) {
      return <div>Loading...</div>;
    }
  
    console.log(username);
    return <div className='p-6 max-w-[1440px] mx-auto'><Header></Header><UserProfile isCurrentUser={false} username={username} /></div>;
  };
  
  export default UserProfilePage;