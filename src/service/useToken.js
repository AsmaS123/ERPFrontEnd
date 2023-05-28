import { useState } from 'react';

export const getToken = () => {
    const token = sessionStorage.getItem('token');
    return token;
};

export const setToken = (token) => {
debugger
sessionStorage.setItem('token', token);
};


// export  function useToken() {

//   const [token, setToken] = useState(getToken());

//   const getToken = () => {
//     const tokenString = sessionStorage.getItem('token');
//     // const userToken = JSON.parse(tokenString);
//     // return userToken?.token
//     return tokenString;
//   };


//   const saveToken = (token) => {
//     debugger
//     // sessionStorage.setItem('token', JSON.stringify(userToken));
//     // setToken(userToken.token);

//     sessionStorage.setItem('token', token);
//     setToken(token);
//   };

// //   return {
// //     setToken: saveToken,
// //     token
// //   }
// }