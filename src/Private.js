import React, { Component } from 'react';

class Private extends Component {
    //**student code change start**
    state = {
        message: "",
        profile: null,
        error:""
    }
    componentDidMount(){
        fetch("/private", {
            headers: { Authorization: `Bearer ${this.props.auth.getAccessToken()}`}
        }).then(response => {
            if (response.ok) return response.json();
            throw new Error("Network response was not ok.");
        })
        .then(response => this.setState({ message: response.message}))
        .catch(error => this.setState({ message: error.message }));
        this.loadUserProfile();
    }

    loadUserProfile(){
        this.props.auth.getProfile((profile, error) =>
        this.setState({profile, error})
        );
    }

    render() {
        const {profile} = this.state;
        if (!profile) return null;
       
    }
}//**student code change end**

export default Private;