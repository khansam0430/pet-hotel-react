import React, { Component } from 'react';
import { connect } from 'react-redux';


class OwnersListItem extends Component {
    componentDidMount=()=>{
        console.log(this.props.owner);
        
    }
  
deleteMe = () =>{
    console.log('deleting owner')
}
    render() {
        return (
            
            <tr key={this.props.owner.id}>
                <td>{this.props.owner.name}</td>
                <td>{this.props.owner.number_of_pets}</td>
                <td><button onClick={this.deleteMe} className="deleteButton">Delete</button></td>
            </tr>
          
        );
    }
}

const mapStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapStateToProps)(OwnersListItem);