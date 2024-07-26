import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaUserCircle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { clearUser, setUser } from '../slice/userSlice';
import { login } from '../actions/actions';

/**
 * Connecter son email et password
 */
const SignIn = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /**
   * Gère la soumission du formulaire de connexion.
   * Effectue la requête de connexion et met à jour l'état de connexion de l'utilisateur.
   * @param {FormEvent<HTMLFormElement>} event - Événement de soumission du formulaire.
   */
  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const responseData = await login(email, password);
      dispatch(
        setUser({
          email,
          password,
          token: responseData.token,
          firstName: responseData.user.firstName,
          lastName: responseData.user.lastName,
        })
      );
      setIsLoggedIn(true);
      navigate('/profile');
    } catch (error) {
      console.error('Erreur de connexion:', (error as Error).message);
      setErrorMessage((error as Error).message);
    }
  };

  /**
   * Gèrer la déconnexion de l'utilisateur.
   */
  const handleLogout = () => {   
    dispatch(clearUser());
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <main className="flex flex-col min-h-screen">
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} email={email} password={password} />
      <section className="flex-grow flex items-center justify-center bg-[#12022B]">
        <article className="bg-white py-8 rounded shadow-md px-12">
          <FaUserCircle className="mx-auto my-4" size={16} />
          <h2 className="text-2xl mb-4 text-center">Sign In</h2>
          <form onSubmit={handleFormSubmit}>
            <fieldset className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Username
              </label>
              <input
                id="email"
                type="email"
                placeholder="Entrez votre adresse email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </fieldset>
            <fieldset className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Entrez votre mot de passe"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </fieldset>
            <fieldset className="mb-4">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2 text-gray-500">Remember me</span>
              </label>
            </fieldset>
            <fieldset className="flex items-center justify-between">
              <button
                type="submit"
                className="underline bg-[#02BC77] hover:bg-blue-700 text-white font-bold py-2 w-full rounded focus:outline-none focus:shadow-outline"
              >
                Sign In
              </button>
            </fieldset>
            {errorMessage && <p className="mt-4 text-red-500 text-center">{errorMessage}</p>}
          </form>
        </article>
      </section>
      <Footer />
    </main>
  );
};

export default SignIn;
