import UserProfile from '../components/UserProfile';
import Header from '../components/Header';
const MePage = () => {
  return <div className='p-6 max-w-[1440px] mx-auto'>
    <Header></Header>
    <UserProfile isCurrentUser={true} /></div>;
};

export default MePage;
