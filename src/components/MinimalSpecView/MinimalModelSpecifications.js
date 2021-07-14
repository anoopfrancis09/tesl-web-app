import React, { Component } from 'react'
import {
  Typography,
  Grid
} from '@material-ui/core'
import { connect } from 'react-redux'
import compose from 'recompose/compose'
import DetailGrid from './TopBottomTextView'

class MinimalModelSpecifications extends Component {


  componentWillReceiveProps(nextProps) {
    
  }


  render() {
    const { modelData } = this.props
    return (
      <Grid container
      direction="column">
        <Grid item>
    <Grid container className="minDataGrid">
        <Grid item>
            <Typography variant="h6">
                {modelData.displayName}
            </Typography>
        </Grid>
        <Grid item>
            <Typography color="textSecondary">
                390mi
            </Typography>
        </Grid>
    </Grid>
    </Grid>
      <Grid item>
        <Grid container spacing={2} className="detailTextGrid" key="anoop">
          {modelData.acceleration ? 
            <Grid item>
              <DetailGrid topData={`${modelData.acceleration.time}s`} bottomData={modelData.acceleration.speed}/>
                </Grid>
           : null}
          {
           modelData.topSpeed ? 
           (<Grid item>
            <DetailGrid topData={modelData.topSpeed} bottomData="Top Speed"/>
              </Grid>) : null
           }
        
        
        {
          modelData.peakPower ? 
          (<Grid item>
            <DetailGrid topData={modelData.peakPower} bottomData={"Peak Power"}/>
              </Grid>) : null
        }
        
        {
          modelData.range ? 
          (<Grid item>
            <DetailGrid topData={modelData.range} bottomData={"Range"}/>
              </Grid>)
              : null
        }
        
          </Grid>
      </Grid>
    </Grid>
        
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
)(MinimalModelSpecifications)
