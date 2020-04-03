import React, { Component } from 'react';
import { connect } from 'react-redux';
import PetsListItem from '../Pets/PetsListItem'



class Pets extends Component {

    componentDidMount=()=>{
        this.getPets();
        this.getOwners();
    }
    componentDidUpdate = (prevProps) =>{
        if (this.props.reduxState.ownersReducer !== prevProps.reduxState.ownersReducer)
           this.setState({
               newPet: {
                   ...this.state.newPet,
                   owner_id: this.props.reduxState.ownersReducer[0].id
                }
           }) 
        }
    
    getPets = () =>{
        //get array of pets from the server
        fetch("/api/pets", {method: 'GET'})
            .then(response =>
                response.json().then(data=>{
                    //send the array to the reducer
                    this.props.dispatch({type: 'SET_PETS', payload: data})
                }))
        
        }

    getOwners = () => {
        fetch("/api/owners", { method: 'GET' })
            .then(response =>
                response.json().then(data => {
                    this.props.dispatch({ type: 'SET_OWNERS', payload: data })
                }))
//         { this.props.reduxState.ownersReducer &&
//          this.setState({
//         newPet: {
//                 ...this.state.newPet,
//                 owner_id: this.props.reduxState.ownersReducer[0].id
//         }
//     })
// }   
    }
    
    async postPet (){
        console.log(this.state.newPet);
        const newPet = this.state.newPet;
        const response= await fetch("/api/pets", {
            method: 'POST',
            //we send this Content-Type to tell the server that it is recieving json
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPet)
        });
        if(response.ok){
            console.log('post worked');
            this.getPets();
        }
    }
    
  
    state = {
        newPet: {
            pet: '',
            color: '',
            breed: '',
            owner_id: ''
        }
    }
    handleChangeFor = (propertyName, event) => {
        this.setState({
            newPet: {
                ...this.state.newPet,
                [propertyName]: event.target.value
            }
        })
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        this.postPet();
    }
    render() {
        return (<div className="CustForm">
            <form onSubmit={this.handleSubmit}>
                <input required placeholder="Pet Name"
                    value={this.state.newPet.pet}
                    onChange={(event) => this.handleChangeFor('pet', event)}
                />
                <input required placeholder="Pet Color"
                    value={this.state.newPet.color}
                    onChange={(event) => this.handleChangeFor('color', event)}
                />
                <input required placeholder="Pet Breed"
                    value={this.state.newPet.breed}
                    onChange={(event) => this.handleChangeFor('breed', event)}
                />
                <select onChange={(event) => this.handleChangeFor('owner_id', event)} id="ownerName" name="Owner Name">
                    {this.props.reduxState.ownersReducer.map((owner) => {
                        return (
                            <option value={owner.id}>{owner.name}</option>
                        );
                    })}
                </select>
                <input type='submit'>
                </input>

                </form>
                
            <table>
                <thead>
                    <tr>
                        <th>Pet Owner</th>
                        <th>Pet Name</th>
                        <th>Pet Breed</th>
                        <th>Pet Color</th>
                        <th>Checked In</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className="">
                    {this.props.reduxState.petsReducer &&
                        this.props.reduxState.petsReducer.map((pet) => {
                            return (
                                <PetsListItem pet={pet}/>
                            );
                    })}
                </tbody>
            </table>
                </div>
        )
    }
}

const mapStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapStateToProps)(Pets);