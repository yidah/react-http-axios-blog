import axios from 'axios';

// axios instances used to get the all posts in Blogs.js
const instance = axios.create({
    baseURL:'https://jsonplaceholder.typicode.com/'
})

//We can overwrite default  configuration in index.js
instance.defaults.headers.common['Authorization'] ='AUTH TOKEN FROM INSTANCE'

export default instance;