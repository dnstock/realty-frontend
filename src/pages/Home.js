import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated()) {
    return (
      <div>
        <h1>Welcome to the Home Page</h1>
        <button onClick={() => navigate('/login')}>Log in</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <button onClick={() => navigate('/logout')}>Log out</button>
    </div>
  );
};

export default Home;
