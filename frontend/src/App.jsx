import {Outlet} from 'react-router-dom';
import Navigation from './pages/Auth/Navigation';
import {ToastContainer} from 'react-toastify';


const App = () => {
  return (
    <>
    <ToastContainer />
    <Navigation />
    <main className='w-full min-h-screen'>
      <Outlet />
    </main>
    </>
  );
};

export default App;
