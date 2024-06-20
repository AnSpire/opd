import UserProfile from '../components/UserProfile';
import { useRouter } from 'next/router';

const UserProfilePage = () => {
  const router = useRouter();
  const { username } = router.query;

  return <UserProfile isCurrentUser={false} username={username} />;
};

export default UserProfilePage;
