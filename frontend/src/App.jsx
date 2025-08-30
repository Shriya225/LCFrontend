import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { ToastContainer } from "react-toastify";
import { Outlet } from 'react-router-dom';
const App = () => {

  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};
export default App