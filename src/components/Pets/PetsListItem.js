import React, { Component } from 'react';
import { connect } from 'react-redux';


class PetsListItem extends Component {
    componentDidMount=()=>{
        console.log(this.props.pet);
        
    }
  
deletePet = (event) =>{

        const petToDelete = {
                                deleteId: event.target.value
                            }
    console.log('deleting pet', petToDelete)
        const response = fetch("/api/pets", {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
            body: petToDelete
        });
        if (response.ok) {
            console.log('delete pets worked');
            this.getPets();
        }
}

checkIn = () => {
    console.log('checking in pet');
    
}
    render() {
        return (
            
                <tr key={this.props.pet.id}>
                <td>{this.props.pet.owner}</td>
                <td>{this.props.pet.pet}</td>
                <td>{this.props.pet.breed}</td>
                <td>{this.props.pet.color}</td>
                <td>{this.props.pet.checked_in}</td>
                <td><button onClick={(event) => this.deletePet(event)} value={this.props.pet.id} className="deleteButton">Remove Pet</button></td>
                <td><button onClick={this.checkIn} className="deleteButton">Check In Pet</button></td>
            </tr>
          
        );
    }
}

const mapStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapStateToProps)(PetsListItem);