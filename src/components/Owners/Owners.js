import React, { Component } from "react";
import { connect } from "react-redux";
import OwnersListItem from '../Owners/OwnersListItem'

class Owners extends Component {
    state={
        ownerName:''
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

    handleChangeFor = (event, typeofChange) => {
        console.log('in handleChangeFor OWNER:', this.state)
        this.setState({
            ownerName: event.target.value
            },
        );
    }

    submitClick = () =>{
        console.log('on submitClick in OWNERS')
        this.props.dispatch({
            type:'SET_OWNERS',
            payload:this.state
        })
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