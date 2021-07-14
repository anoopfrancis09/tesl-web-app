import React, { Component } from 'react'
import {
  Typography,
  Grid
} from '@material-ui/core'
import TopBottomGridLayout from './MinimalSpecView/TopBottomTextView'

class LeftRightGridLayout extends Component {


  componentWillReceiveProps(nextProps) {
    
  }


  render() {
    const { leftData, rightData } = this.props
    return (
    <Grid container
    direction="row"
    spacing={8}
    justifyContent='space-between'>
        <Grid item style={{width: 200}}>
           <TopBottomGridLayout topData={leftData.title} bottomData={leftData.value} />
        </Grid>
        <Grid item style={{width: 200}}>
            <TopBottomGridLayout topData={rightData.title} bottomData={rightData.value} />
        </Grid>
    </Grid>
        
    )
  }
}


export default LeftRightGridLayout
