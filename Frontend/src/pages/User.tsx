
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { setUser } from '../slice/userSlice';
import {  getUser, updateUserProfile, logout } from '../actions/service';
import Transactions from '../components/Transactions';


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
      if (token) {
        try {
          const { firstName: userFirstName, lastName: userLastName } = await getUser(token);
          setFirstName(userFirstName);
          setLastName(userLastName);
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      }
    };

    fetchUserDetails();
  }, [token]);

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
          setIsEditing(false);
        }, 3000);
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    } else {
      console.error('No token available for updating profile');
    }
  };



  return (
    <div className="">
      <Navbar isLoggedIn={isLoggedIn} onLogout={logout} email={firstName} password="" />
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

        <Transactions/>
      </div>
      <Footer />
    </div>
  );
};

export default User;
