import React, { Component } from 'react'
import {
  withStyles,
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
  Button,
  Paper,
  CardMedia
} from '@material-ui/core'
import LinearProgress from '@material-ui/core/LinearProgress';
import { connect } from 'react-redux'
import compose from 'recompose/compose'
import image from '../assets/compositor\ 1.png'
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

  componentWillReceiveProps(nextProps) {
 
  }

  onClickCarCard = (modelName, displayName) => () => {
    console.log('Model::', modelName, displayName)
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
          justify="center">
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
        justify="center"
        spacing={2}
        // style={{ minHeight: '100vh' }}
        >
            {
                models.map((item) => {
                        return (
                            <Grid className="carGrid" item onClick={this.onClickCarCard(item.model, item.displayName)} key={item.model}>
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
