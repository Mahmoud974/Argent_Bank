import { useSelector, useDispatch } from 'react-redux';
import Navbar from "../components/Navbar";
import Banner from "../assets/bank-tree.jpeg";
import Footer from "../components/Footer";
import { RootState } from '../store/store';
import { clearUser } from '../slice/userSlice';
import HomeIcons from '../components/HomeIcons';
import { logout } from '../actions/actions';  

export default function App() {
  const dispatch = useDispatch();
  const { token, firstName } = useSelector((state: RootState) => state.user);
  const isLoggedIn = !!token;

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(clearUser());
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <main>
      <Navbar isLoggedIn={isLoggedIn} email={firstName} password="" onLogout={handleLogout} />
      <section className="relative">
        <img src={Banner} alt="bank tree" className="w-full h-auto lg:-mt-36 lg:flex hidden" />
        {/* Responsive box mobile */}
        <article className="lg:absolute lg:right-28 lg:px-12 lg:top-1/4 p-8 text-center lg:text-left relative mx-auto bg-white lg:p-4 rounded shadow-lg">
          <h1 className="lg:text-xl mb-4">No fees.<br />No minimum deposit.<br />High interest rates.</h1>
          <p className="text-gray-700 text-sm">Open a savings account with<br /> Argent Bank today!</p>
        </article>
      </section>
      {/* Icon's List */}
      <section className="bg-white lg:-mt-96 -mt-96 relative z-50">
        <HomeIcons />
        <Footer />
      </section>
    </main>
  );
}
