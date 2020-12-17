import React, { Component } from 'react';
import './Blog.css';
import '../Blog/Posts/Posts';
import Posts from './Posts/Posts';
//routing
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
// import NewPost from '../Blog/NewPost/NewPost';
// using lazy loading to load NewPost instead 
import asyncComponent from '../..//hoc/asyncComponent';
// import(); This means, whatever is within the parenthesis is only imported
// whenever the function (()=>{return import();) is executed, 
// the function gets executed when we render AsyncNewPost to the screen
const AsyncNewPost = asyncComponent(()=>{
  return import('../Blog/NewPost/NewPost');
});

class Blog extends Component {
  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              {/* We use Link/NavLink(can add styles) to prevent default behavior 
                and reloading the page everytime we click a link 
                NOTE: the exact in the NavLink refers to the css active class only applied to the "/" */}
              <li>
                <NavLink to="/posts/" exact>
                  Posts
                </NavLink>
              </li>
              <li>
                <NavLink to="/new-post">New Post</NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <Switch>
          <Route path="/new-post" component={AsyncNewPost} />
          <Route path="/posts" component={Posts} />
          <Redirect from="/" to="/posts" />
        </Switch>
      </div>
    );
  }
}

export default Blog;
