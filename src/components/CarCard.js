import React, { Component } from 'react'
import {
  Card,
  CardContent,
  Typography,
  CardMedia
} from '@material-ui/core'
import { connect } from 'react-redux'
import compose from 'recompose/compose'
// import image from '../assets/modelX.png'
import modelX from '../assets/modelX.png'
import modelS from '../assets/modelS.png'
import modelY from '../assets/modelY.png'
import model3 from '../assets/model3.png'
import ModelMinDetail from './MinimalSpecView/MinimalModelSpecifications'

class CarCard extends Component {


  componentWillReceiveProps(nextProps) {
    
  }

  renderPicture = (modelName) => {
    switch (modelName) {
      case 'modelX':
        return modelX;
      case 'modelS':
        return modelS;
      case 'modelY':
        return modelY;
      case 'model3':
        return model3;
      default:
        return modelS;
    }
}


  render() {
    const { title, modelName, data } = this.props
    return (
          <Card className="eachCarCard">
      <CardMedia
      className='carImage'
      // style={{ width: "100%", height: "150px" }}
      image={this.renderPicture(modelName)}
      
        className="eachCarImage"
        title={title}
      />
      <CardContent>
        <ModelMinDetail modelData={data}/>
      </CardContent>
    </Card>
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
)(CarCard)
