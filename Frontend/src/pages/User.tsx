import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { setUser, clearUser } from '../slice/userSlice';
import { handleSignIn, updateUserProfile } from '../actions/service';

const User = () => {
  const dispatch = useDispatch();
  const { email, password, firstName: reduxFirstName, lastName: reduxLastName } = useSelector((state: RootState) => state.user);
  const [firstName, setFirstName] = useState<string>(reduxFirstName);
  const [lastName, setLastName] = useState<string>(reduxLastName);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const token = useSelector((state: RootState) => state.user.token);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (email && password) {
        try {
          // Remplacer handleSignIn avec votre fonction d'API pour récupérer les détails de l'utilisateur
          const { user } = await handleSignIn(email, password);
          setFirstName(user.firstName);
          setLastName(user.lastName);

          // Mettre à jour les données utilisateur dans Redux
          dispatch(
            setUser({
              email: user.email,
              password,
              token,
              firstName: user.firstName,
              lastName: user.lastName,
            })
          );
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      }
    };

    fetchUserDetails();
  }, [dispatch, email, password]);

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();

    if (token) {
      try {
        await updateUserProfile(token, firstName, lastName);
        dispatch(
          setUser({
            email,
            password,
            token,
            firstName,
            lastName,
          })
        );
        setShowConfirmation(true);
        setTimeout(() => {
          setShowConfirmation(false);
          setIsEditing(false); // Retour à l'état initial après la confirmation
        }, 3000);
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    } else {
      console.error('No token available for updating profile');
    }
  };

  const handleLogout = () => {
    // Déconnexion de l'utilisateur en supprimant les données de l'utilisateur dans Redux
    dispatch(clearUser());
    setIsLoggedIn(false);
  };

  return (
    <div className="">
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} email={firstName} password="" />
      <div className="bg-[#12022B] min-h-screen flex flex-col items-center pt-12">
        <div className="text-center mb-8">
          <h1 className="text-white text-4xl mb-4">Welcome back</h1>
          {!isEditing ? (
            <div>
              <p className="text-white text-4xl">{firstName} {lastName} !</p>
              <button
                className="bg-[#00BC77] text-white hover:bg-[#2aa075] px-4 py-2 mt-4"
                onClick={() => setIsEditing(true)}
              >
                Edit Name
              </button>
            </div>
          ) : (
            <form onSubmit={handleSave}>
              <div className="flex flex-col sm:flex-row justify-center items-center mb-4">
                {showConfirmation ? (
                  <div className="text-green-500 text-lg">Modification faite !</div>
                ) : (
                  <>
                    <input
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="bg-gray-200 border border-gray-400 rounded py-2 px-4 mb-2 sm:mb-0 sm:mr-2 w-full sm:w-auto"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="bg-gray-200 border border-gray-400 rounded py-2 px-4 w-full sm:w-auto"
                    />
                  </>
                )}
              </div>
              <div className="flex justify-center space-x-4">
                <button
                  type="submit"
                  className="bg-white text-purple-800 border-purple-800 w-4/12 hover:bg-purple-800 hover:text-white px-4 py-2 focus:outline-none focus:shadow-outline"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="bg-white text-purple-800 border-purple-800 hover:bg-purple-800 hover:text-white w-4/12 px-4 py-2 focus:outline-none focus:shadow-outline"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        <ul className="container mx-auto px-4">
          <li className="w-5/6 flex- mx-auto mb-12">
            <div className="bg-white p-6 border-purple-800 shadow-md w-98">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                <div>
                  <h2 className="">Argent Bank Checking (x8349)</h2>
                  <p className="text-gray-700 text-3xl font-bold space-y-6">$2,082.79</p>
                  <p className="text-gray-500">Available Balance</p>
                </div>
                <button className="bg-[#00BC77] sm:w-auto w-full text-white sm:mt-0 mt-2 px-4 py-2 focus:outline-none focus:shadow-outline">
                  View transactions
                </button>
              </div>
            </div>
          </li>
          <li className="w-5/6 flex- mx-auto mb-12">
            <div className="border-purple-800 bg-white p-6 shadow-md w-98">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                <div>
                  <h2 className="">Argent Bank Checking (x67124)</h2>
                  <p className="text-gray-700 text-3xl font-bold space-y-6">$10,928.42</p>
                  <p className="text-gray-500">Available Balance</p>
                </div>
                <button className="bg-[#00BC77] sm:w-auto w-full text-white sm:mt-0 mt-2 px-4 py-2 focus:outline-none focus:shadow-outline">
                  View transactions
                </button>
              </div>
            </div>
          </li>
          <li className="w-5/6 flex- mx-auto mb-12">
            <div className="border-purple-800 bg-white p-6 shadow-md w-98">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                <div>
                  <h2 className="">Argent Bank Checking (x5201)</h2>
                  <p className="text-gray-700 text-3xl font-bold space-y-6">$184.30</p>
                  <p className="text-gray-500">Available Balance</p>
                </div>
                <button className="bg-[#00BC77] sm:w-auto w-full text-white sm:mt-0 mt-2 px-4 py-2 focus:outline-none focus:shadow-outline">
                  View transactions
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default User;
