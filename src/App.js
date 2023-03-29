import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';
import { AuthContextProvider } from './components/context/AuthContext';

function App() {
  return (
    <AuthContextProvider>
      <Navbar />
      <Outlet />
    </AuthContextProvider>
  );
}

export default App;
