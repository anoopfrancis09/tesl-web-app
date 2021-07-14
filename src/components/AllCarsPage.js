import React, { Component } from 'react'
import {
  Typography,
  Grid,
} from '@material-ui/core'
import LinearProgress from '@material-ui/core/LinearProgress';
import { connect } from 'react-redux'
import compose from 'recompose/compose'
import CarCard from './CarCard'
import {fetchAllCars} from '../actions'

class LandingPage extends Component {
  constructor(props) {
    super(props)

    this.onClickCarCard = this.onClickCarCard.bind(this);
  }

  componentDidMount() {
    this.props.receiveAllCarModels()
}

onClickCarCard = (modelName, displayName) => () => {
        const {history} = this.props;
        history.push({
          pathname: '/carDetails',
          state: { modelName, displayName }
        });
}

  render() {
    const { models } = this.props

    return (
      <div className="allCarsPage">
          <Grid container
          spacing={8}
           className="mainGrid"
          direction="column"
          alignItems="center"
          justifyContent="center">
              <Grid item cstyle={{marginBottom: 20}}>
              <Typography variant="h5" className="allModelText">
          All Models
        </Typography>
        </Grid>
        {
          models.length <= 0 ?
          (
          <Grid item>
          <LinearProgress style={{width: 500}}/>
          </Grid>
          )
          : null
        }
        
        <Grid item>
        <Grid container
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={2}
        >
            {
                models.map((item) => {
                        return (
                            <Grid role='modelCard' className="carGrid" item onClick={this.onClickCarCard(item.model, item.displayName)} key={item.model}>
                                <CarCard  title={item.displayName} modelName={item.model} data={item}/>
                            </Grid>
                        )
                    
                }) 
            }
            
        </Grid>
        </Grid>
        </Grid>
      </div>
    )
  }
}

/**
 * Function to call the action to call API to send login credentials for verification
 */
function mapDispatchToProps(dispatch) {
  return {
    receiveAllCarModels: () => dispatch(fetchAllCars()),
  }
}
/**
 * Function to receive the state of login api call response
 */
function mapStateToProps(state) {
  return {
      models: state.allCarReducer.models
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(LandingPage)
