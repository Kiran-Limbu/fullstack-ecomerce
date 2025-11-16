import {Outlet} from 'react-router-dom';
import Navigation from './pages/Auth/Navigation';
import {ToastContainer} from 'react-toastify';


const App = () => {
  return (
    <>
    <ToastContainer />
    <Navigation />
    <main className='w-full min-h-screen bg-zinc-800 text-white'>
      <Outlet />
    </main>
    </>
  );
};

export default App;
