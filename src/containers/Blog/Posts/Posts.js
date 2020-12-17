import React, { Component } from 'react';
//import axios from 'axios';
// Using axios instance
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
import './Posts.css';
import { Route } from 'react-router-dom';
import FullPost from '../FullPost/FullPost';

class Posts extends Component {
  state = {
    posts: [],
  };

  postSelectedHandler = (id) => {
    //Navigating programatically - navigation is stack of pages
    this.props.history.push({ pathname: '/posts/' + id });
    // Alternatively
    // this.props.history.push('/posts/' +id);
  };

  // The componentDidMount life cycle hook is the place were http request go
  componentDidMount() {
    // accessing information passed by react-router
    // console.log(this.props)
    axios
      .get('/posts')
      .then((response) => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map((post) => {
          return {
            ...post,
            author: 'Yidah',
          };
        });
        // So componentDidMount is the place for causing side effects but not for updating state since it triggers a re-render.
        // However we updated the state here once the HTTP request has gone and got us new data because we actually want to re-update the page,
        // so here this is actually a wanted behavior
        this.setState({ posts: updatedPosts });
        // console.log(response);
      })
      .catch((error) => {
        console.log(error); // rearanged to enable routing and keep it simple
        // this.setState({ error: true });
      });
  }

  render() {
    let posts = <p style={{ textAlign: 'center' }}>Something went wrong!</p>;

    if (!this.state.error) {
      posts = this.state.posts.map((post) => {
        return (
          <Post
            key={post.id}
            title={post.title}
            author={post.author}
            clicked={() => this.postSelectedHandler(post.id)}
          />
        );
      });
    }
    return (
      <div>
        <section className="Posts">{posts}</section>
        <Route path={this.props.match.url + '/:id'} exact component={FullPost} />
      </div>
    );
  }
}

export default Posts;
