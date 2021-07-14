import React, { Component } from 'react'
import {
  Grid
} from '@material-ui/core'
import { connect } from 'react-redux'
import compose from 'recompose/compose'
import blackCar from '../assets/MS-Specs-Hero-Desktop\ 1.png'
import ModelSpecView from './ModelDetailsGridView'
import {fetchModelDetails} from '../actions'

class CarCard extends Component {
    constructor(props) {
        super(props)
    
        this.onOrderClick = this.onOrderClick.bind(this);
      }

  componentWillReceiveProps(nextProps) {
    
  }

  onOrderClick = () => {
    const {history} = this.props
    const { location } = this.props
    const { modelName } = location.state

    history.push({
      pathname: '/modelOrder',
      state: {modelName}
    })
  }

  componentDidMount() {
    const { location } = this.props
    const { modelName } = location.state
    const { getModelDetails } = this.props

    getModelDetails(modelName)
  }


  render() {
    const { location, modelData } = this.props
    const { displayName } = location.state
    
    return (
        <div>
        <div className='modelContainer'>
            <button class='btn' onClick={this.onOrderClick} > Order </button>
        </div>
        <div className='modelDetailContainer'>
            <Grid container direction='row' justifyContent='center'>
                <Grid item lg={7}>
                    <img src={blackCar} alt='modelS'/>
                </Grid>
                <Grid item lg={5}>
                    {modelData.variants !== undefined ? <ModelSpecView role='modelSpec' displayName={displayName} modelData={modelData.variants}/> : null }
                </Grid>
            </Grid>
        </div>
        </div>
    )
  }
}

/**
 * Function to call the action to call API to send login credentials for verification
 */
function mapDispatchToProps(dispatch) {
  return {
      getModelDetails: (model) => dispatch(fetchModelDetails(model))
  }
}
/**
 * Function to receive the state of login api call response
 */
function mapStateToProps(state) {
  return {
    modelData: state.allCarReducer.selectedModelData
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(CarCard)
