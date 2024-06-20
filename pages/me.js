import UserProfile from '../components/UserProfile';
import Header from '../components/Header';
const MePage = () => {
  return <div>
    <Header></Header>
    <UserProfile isCurrentUser={true} /></div>;
};

export default MePage;
