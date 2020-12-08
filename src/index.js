import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

// setting a default configuration app wide
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com/';
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

// Register axios interceptors
// shared accross all files so it affects all requests in the app
axios.interceptors.request.use(requestConfig => {
    console.log(requestConfig);
    return requestConfig;

}, error=>{
    // Handling requests errors, 
    // for example no internet connectivity it pops up if the request sending fails. 
    console.log(error);
    return Promise.reject(error);
});

axios.interceptors.response.use(responseConfig=>{
    console.log(responseConfig);
    return responseConfig;
}, error =>{
    // Handling response errors
    console.log(error);
    return Promise.reject(error);
});

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
