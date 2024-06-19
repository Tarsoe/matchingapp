import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/AuthService';

interface LoginProps {
    setToken: (token: string) => void;
    setUser: (user: { username: string; email: string }) => void;
}

const Login: React.FC<LoginProps> = ({ setToken, setUser }) => {
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // State for loading indicator
    const navigate = useNavigate();

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true); // Start loading
        try {
            const response = await login(usernameOrEmail, password);
            setToken(response.token);
            console.log("response.token", response.token);
            setUser({ username: response.username, email: response.email });
            console.log("response.user", { username: response.username, email: response.email });
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify({ username: response.username, email: response.email }));
            navigate('/home');
        } catch (error) {
            console.error('Login failed', error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-80">
                <div className="mb-4">
                    <label className="block text-gray-700">Username or Email:</label>
                    <input
                        type="text"
                        value={usernameOrEmail}
                        onChange={(e) => setUsernameOrEmail(e.target.value)}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 px-4 bg-blue-500 text-white rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
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
                        'Login'
                    )}
                </button>
            </form>
        </div>
    );
};

export default Login;


//! End 

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { login } from '../services/AuthService';

// interface LoginProps {
//     setToken: (token: string) => void;
//     setUser: (user: { username: string; email: string }) => void;
// }

// const Login: React.FC<LoginProps> = ({ setToken, setUser }) => {
//     const [usernameOrEmail, setUsernameOrEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();

//     const handleLogin = async (event: React.FormEvent) => {
//         event.preventDefault();
//         try {
//             const response = await login(usernameOrEmail, password);
//             setToken(response.token);
//             console.log("response.token", response.token);
//             setUser({ username: response.username, email: response.email });
//             console.log("response.user", { username: response.username, email: response.email });
//             localStorage.setItem('token', response.token);
//             localStorage.setItem('user', JSON.stringify({ username: response.username, email: response.email }));
//             navigate('/home');
//         } catch (error) {
//             console.error('Login failed', error);
//         }
//     };


//     return (
//         <div>
//             <h2>Login</h2>
//             <form onSubmit={handleLogin}>
//                 <div>
//                     <label>Username or Email:</label>
//                     <input
//                         type="text"
//                         value={usernameOrEmail}
//                         onChange={(e) => setUsernameOrEmail(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Password:</label>
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <button type="submit">Login</button>
//             </form>
//         </div>
//     );
// };

// export default Login;


// const handleLogin = async (event: React.FormEvent) => {
//     event.preventDefault();
//     try {
//         const response = await login(usernameOrEmail, password);
//         setToken(response.token);
//         console.log("response.token", response.token);
//         setUser(response.user);
//         console.log("response.user", response.user);
//         localStorage.setItem('token', response.token);
//         navigate('/home');
//     } catch (error) {
//         console.error('Login failed', error);
//     }
// };


//! End 

// import React, { useState } from 'react';
// import AuthService from '../services/AuthService';
// import { useAuth } from '../context/AuthContext';

// const Login = () => {
//     const [usernameOrEmail, setUsernameOrEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const { login } = useAuth();

//     const handleLogin = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             const response = await AuthService.login(usernameOrEmail, password);
//             login(response.data.accessToken, response.data.user);
//             console.log("In the components Login.txs")
//         } catch (error) {
//             console.error('Login failed', error);
//         }
//     };

//     return (
//         <form onSubmit={handleLogin}>
//             <div>
//                 <label>Username or Email:</label>
//                 <input
//                     type="text"
//                     value={usernameOrEmail}
//                     onChange={(e) => setUsernameOrEmail(e.target.value)}
//                 />
//             </div>
//             <div>
//                 <label>Password:</label>
//                 <input
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                 />
//             </div>
//             <button type="submit">Login</button>
//         </form>
//     );
// };

// export default Login;
