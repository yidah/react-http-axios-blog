import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {

    state = {
        loadedPost:null
    }
    componentDidUpdate(){
        if(this.props.id){
            // Add this condition to avoid infinite loop 
            // "this.setState({loadedPost:response.data})"  will trigger componentDidUpdate again so we need to add this condition 
            // if do not have loadedPost (initially null) or we have it and have a different id of the id we are planning loading
            if(!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)){
                axios.get('/posts/'+ this.props.id)
                .then(response=>{
                    this.setState({loadedPost:response.data})
                    // console.log(response);
                });
            }

        }

    }
    
    deletePostHandler = ()=>{
        axios.delete('/posts/'+ this.props.id)
        .then(response =>{
            console.log(response);
        })

    }    
    render () {
        let post = <p style={{textAlign:'center'}}>Please select a Post!</p>;
        
        // initially id is null as defined in the Blog.js state and null is treated as false
        // we also give time to load
        if(this.props.id){
            post = <p style={{textAlign:'center'}}>Loading!</p>;
        }
        
        if(this.state.loadedPost){
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button 
                            className="Delete" onClick={this.deletePostHandler}>Delete</button>
                    </div>
                </div>
    
            );
        }

        return post;
    }
}

export default FullPost;