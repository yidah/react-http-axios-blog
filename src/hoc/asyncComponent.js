import React, { Component } from 'react';
// the asyncComponent returns a normal react class component
// importComponent parameter: It is a function that returns a promise 
// and cmp.default, that is, the component we loaded dynamically 
// with {...this.props} we pass to the component the properties of the class in case we need them 

const asyncComponent = (importComponent) =>{
    return class extends Component {
        state = {
            component:null
        }
        componentDidMount(){
            importComponent()
            .then(cmp => {
                this.setState({component: cmp.default})
            });

        }
        render(){
            const C = this.state.component;
            return C ? <C {...this.props} /> : null;
        }
    }
}

export default asyncComponent;