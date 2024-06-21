import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import jwt_decode from 'jwt-decode';
import { jwtDecode } from 'jwt-decode';
import { logout } from '../services/AuthService';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

interface HomePageProps {
    token: string;
}

interface User {
    username: string;
    email: string;
}

interface JwtPayload {
    exp: number;
    iat?: number;
    sub?: string;
    // Add any other fields you expect to find in your JWT payload here
}

const HomePage: React.FC<HomePageProps> = ({ token }) => {
    const [user, setUser] = useState<User | null>(null);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false); // State for loading indicator
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    useEffect(() => {
        const checkTokenExpiration = () => {
            try {
                const decodedToken = jwtDecode<JwtPayload>(token);
                const currentTime = Date.now() / 1000;

                if (decodedToken.exp < currentTime) {
                    setOpen(true);
                }
            } catch (error) {
                console.error('Error decoding token:', error);
                setOpen(true); // In case of any error, show the dialog
            }
        };

        const interval = setInterval(checkTokenExpiration, 60000); // Check every minute

        return () => clearInterval(interval); // Cleanup on unmount
    }, [token]);

    const handleLogout = async () => {
        setLoading(true); // Start loading
        try {
            await logout(token);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            // navigate('/login');
            navigate('/');
        } catch (error) {
            console.error('Logout failed', error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const handleClose = () => {
        setOpen(false);
        handleLogout();
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Home Page</h1>
            {user && (
                <>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                </>
            )}
            <p>Token: {token}</p>
            <button
                onClick={handleLogout}
                className={`mt-4 py-2 px-4 bg-red-500 text-white rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                disabled={loading}
            >
                {loading ? (
                    <div className="flex items-center justify-center">
                        <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8H4z"
                            ></path>
                        </svg>
                        <span className="ml-2">Loading...</span>
                    </div>
                ) : (
                    'Logout'
                )}
            </button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Session Expired</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Your session has expired. Please log in again to continue using our site.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default HomePage;


//! End 

// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// // import jwt_decode from 'jwt-decode';
// import { jwtDecode } from 'jwt-decode';
// import { logout } from '../services/AuthService';
// import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

// interface HomePageProps {
//     token: string;
// }

// interface User {
//     username: string;
//     email: string;
// }

// interface JwtPayload {
//     exp: number;
//     iat?: number;
//     sub?: string;
//     // Add any other fields you expect to find in your JWT payload here
// }

// const HomePage: React.FC<HomePageProps> = ({ token }) => {
//     const [user, setUser] = useState<User | null>(null);
//     const [open, setOpen] = useState(false);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const userData = localStorage.getItem('user');
//         if (userData) {
//             setUser(JSON.parse(userData));
//         }
//     }, []);

//     useEffect(() => {
//         const checkTokenExpiration = () => {
//             try {
//                 const decodedToken = jwtDecode<JwtPayload>(token);
//                 const currentTime = Date.now() / 1000;

//                 if (decodedToken.exp < currentTime) {
//                     setOpen(true);
//                 }
//             } catch (error) {
//                 console.error('Error decoding token:', error);
//                 setOpen(true); // In case of any error, show the dialog
//             }
//         };

//         const interval = setInterval(checkTokenExpiration, 60000); // Check every minute

//         return () => clearInterval(interval); // Cleanup on unmount
//     }, [token]);

//     const handleLogout = async () => {
//         await logout(token);
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         navigate('/login');
//     };

//     const handleClose = () => {
//         setOpen(false);
//         handleLogout();
//     };

//     return (
//         <div>
//             <h1>Home Page</h1>
//             {user && (
//                 <>
//                     <p>Username: {user.username}</p>
//                     <p>Email: {user.email}</p>
//                 </>
//             )}
//             <p>Token: {token}</p>
//             <button onClick={handleLogout}>Logout</button>

//             <Dialog open={open} onClose={handleClose}>
//                 <DialogTitle>Session Expired</DialogTitle>
//                 <DialogContent>
//                     <DialogContentText>
//                         Your session has expired. Please log in again to continue using our site.
//                     </DialogContentText>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose} color="primary">
//                         OK
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </div>
//     );
// };

// export default HomePage;


//* End

// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// // import jwt_decode from 'jwt-decode';
// import { jwtDecode } from 'jwt-decode';
// // import { jwt_decode } from 'jwt-decode';
// import { logout } from '../services/AuthService';

// interface HomePageProps {
//     token: string;
// }

// interface User {
//     username: string;
//     email: string;
// }

// interface JwtPayload {
//     exp: number;
//     iat?: number;
//     sub?: string;
//     // Add any other fields you expect to find in your JWT payload here
// }

// const HomePage: React.FC<HomePageProps> = ({ token }) => {
//     const [user, setUser] = useState<User | null>(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const userData = localStorage.getItem('user');
//         if (userData) {
//             setUser(JSON.parse(userData));
//         }
//     }, []);

//     useEffect(() => {
//         const checkTokenExpiration = () => {
//             try {
//                 // const decodedToken = jwt_decode<JwtPayload>(token);
//                 const decodedToken = jwtDecode<JwtPayload>(token);
//                 // const decodedToken = jwt_decode<JwtPayload>(token);
//                 const currentTime = Date.now() / 1000;

//                 if (decodedToken.exp < currentTime) {
//                     handleLogout();
//                 }
//             } catch (error) {
//                 console.error('Error decoding token:', error);
//                 handleLogout(); // In case of any error, logout the user
//             }
//         };

//         const interval = setInterval(checkTokenExpiration, 60000); // Check every minute

//         return () => clearInterval(interval); // Cleanup on unmount
//     }, [token]);

//     const handleLogout = async () => {
//         await logout(token);
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         navigate('/login');
//     };

//     return (
//         <div>
//             <h1>Home Page</h1>
//             {user && (
//                 <>
//                     <p>Username: {user.username}</p>
//                     <p>Email: {user.email}</p>
//                 </>
//             )}
//             <p>Token: {token}</p>
//             <button onClick={handleLogout}>Logout</button>
//         </div>
//     );
// };

// export default HomePage;



//! End 

// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { logout } from '../services/AuthService';

// interface HomePageProps {
//     token: string;
// }

// interface User {
//     username: string;
//     email: string;
// }

// const HomePage: React.FC<HomePageProps> = ({ token }) => {
//     const [user, setUser] = useState<User | null>(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const userData = localStorage.getItem('user');
//         if (userData) {
//             setUser(JSON.parse(userData));
//         }
//     }, []);

//     const handleLogout = async () => {
//         await logout(token);
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         navigate('/login');
//     };

//     return (
//         <div>
//             <h1>Home Page</h1>
//             {user && (
//                 <>
//                     <p>Username: {user.username}</p>
//                     <p>Email: {user.email}</p>
//                 </>
//             )}
//             <p>Token: {token}</p>
//             <button onClick={handleLogout}>Logout</button>
//         </div>
//     );
// };

// export default HomePage;


//! End 

// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { logout } from '../services/AuthService';
// // import { logout } from '../api';

// interface HomePageProps {
//     token: string;
//     user: { username: string; email: string } | null;
// }

// const HomePage: React.FC<HomePageProps> = ({ token, user }) => {
//     const navigate = useNavigate();

//     const handleLogout = async () => {
//         try {
//             await logout(token);
//             localStorage.removeItem('token');
//             navigate('/login');
//         } catch (error) {
//             console.error('Logout failed', error);
//         }
//     };

//     return (
//         <div>
//             <h2>Home Page</h2>
//             {user && (
//                 <div>
//                     <p>Username: {user.username}</p>
//                     <p>Email: {user.email}</p>
//                 </div>
//             )}
//             <div>
//                 <p>Token: {token}</p>
//             </div>
//             <button onClick={handleLogout}>Logout</button>
//         </div>
//     );
// };

// export default HomePage;

