import React, { Component } from "react";
import { connect } from "react-redux";
import OwnersListItem from '../Owners/OwnersListItem'

class Owners extends Component {
    state={
        newOwner: {
            ownerName: '',
            num_pets: 0
        }
    }

    componentDidMount=()=>{
      this.getOwners();
  }

  getOwners = () =>{
      fetch("/api/owners", {method: 'GET'})
          .then(response =>
              response.json().then(data=>{
                  this.props.dispatch({type: 'SET_OWNERS', payload: data})
              }))
      
      }

    async postOwner (){
        console.log(this.state.newOwner);
        const newOwner = this.state.newOwner;
        const response= await fetch("/api/owners", {
            method: 'POST',
            //we send this Content-Type to tell the server that it is recieving json
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newOwner)
        });
        if(response.ok){
            console.log('post worked for owner');
            this.getOwners();
        }
    }

    handleChangeFor = (event, typeofChange) => {
        console.log('in handleChangeFor OWNER:', this.state)
        this.setState({
            newOwner:{
                ...this.state.newOwner,
                ownerName: event.target.value
                }
            },
        );
    }

    submitClick = () =>{
        console.log('on submitClick in OWNERS')
       this.postOwner();
    }

    // deleteOwner = () => {
    //     console.log('in deleteOwner function');
    // }

    backClick = () =>{
        this.props.history.push('/')
      }

 render() {
    return (
        <div>
            <button className="backButton" onClick={this.backClick}>Back to Home</button>
            <h1>This is the Owners page</h1>
            <h2>Add Owner:</h2>
            <input placeholder="Owner Name" className="ownerInput" onChange={this.handleChangeFor}/>
            <button className="submitButton" onClick={this.submitClick}>Submit</button>
            <br/>
            <br/>
            <>
          <center>
            <table>
                <thead>
                    <tr>
                        <th>Owner Name</th>
                        <th>Number of Pets</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className="">
                    {this.props.reduxState.ownersReducer &&
                        this.props.reduxState.ownersReducer.map((owner) => {
                            return (
                                <OwnersListItem owner={owner}/>
                            );
                    })}
                </tbody>
            </table>
            </center>
          </>

        </div>
    );
 }};

   const mapStateToProps = reduxState => ({
    reduxState
   });

export default connect(mapStateToProps)(Owners);