import React, { Component } from 'react'
import {
  Typography,
  Grid
} from '@material-ui/core'

class DetailGridView extends Component {


  componentWillReceiveProps(nextProps) {
    
  }


  render() {
    const { topData, bottomData } = this.props
    return (
    <Grid container
    direction="column">
        <Grid item>
            <span className="minDetailText">
                {topData}
            </span>
        </Grid>
        <Grid item>
            <span color="textSecondary" className="minDetailText">
                {bottomData}
            </span>
        </Grid>
    </Grid>
        
    )
  }
}


export default DetailGridView
