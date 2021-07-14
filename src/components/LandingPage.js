import React, { Component } from 'react'
import { connect } from 'react-redux'
import compose from 'recompose/compose'
import Fab from '@material-ui/core/Fab'

class LandingPage extends Component {
  constructor(props) {
    super(props)

    this.onClick = this.onClick.bind(this);
  }

    onClick = () => {
        const {history} = this.props;
        
        history.push('/allCars')
  }

  render() {
    return (
      <div className="landingPage">
          
          <Fab onClick={this.onClick} variant="extended" style={{padding: '5px', backgroundColor: '#333333eb', color: "white", width: 160, height: 35, left: "50%", top: "90%", transform: "translateX(-50%)"}} > All Cars </Fab>
      </div>
    )
  }
}

/**
 * Function to call the action to call API to send login credentials for verification
 */
function mapDispatchToProps(dispatch) {
  return {
  }
}
/**
 * Function to receive the state of login api call response
 */
function mapStateToProps(state) {
  return {
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(LandingPage)
