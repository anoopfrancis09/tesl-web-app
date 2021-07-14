import React, { Component } from 'react'
import {
  Typography,
  Grid
} from '@material-ui/core'
import LeftRightGridLayout from './LeftRightGridContainer'

class DetailGridView extends Component {
    constructor(props) {
        super(props)
        this.state = {
          selectedVariant: ''
        }

        this.onVariantChange = this.onVariantChange.bind(this);
      }
    

  componentWillReceiveProps(nextProps) {
    
  }

  onVariantChange = (variant) => () => {

    this.setState({selectedVariant: variant})
}

  componentDidMount() {

  }


  render() {
    const { modelData, displayName } = this.props
    const {selectedVariant} = this.state;


    const variants = modelData ? modelData.map((item) => {
        return {variant: item.variant, variantDisplayName: item.variantName};
    }) : [];

    const variantData = modelData ? modelData.filter((item) => {
        return (item.variant === (selectedVariant !== '' ? selectedVariant : variants[0].variant));
    })[0] : {};

    return (
    <div class='modelDetailDataContainer'>
        <Typography variant="h5" >{displayName}</Typography>
        
        {
            variants.map((item) => {
                return (
                    <button class='btn' onClick={this.onVariantChange(item.variant)}> {item.variantDisplayName} </button>
                )
            })
        }
        <Grid container direction='column' spacing={2} style={{maxWidth: 400, marginTop: 30}}>
            <Grid item>
                <LeftRightGridLayout 
                leftData={{title: 'Range', 'value': variantData.range}} 
                rightData={{title: 'Power Train', value: variantData.powertrain}}
                />  
            </Grid>
            <Grid item>
                <LeftRightGridLayout 
                    leftData={{'title': 'Peak Power', 'value': variantData.range}} 
                    rightData={
                        {
                            title: 'Acceleration', 
                            value: `${variantData.acceleration.time}s ${variantData.acceleration.speed}mph`
                        }
                    }
                />  
            </Grid>
            <Grid item>
                <LeftRightGridLayout 
                leftData={{'title': 'Top Speed', 'value': variantData.topSpeed}} 
                rightData={{title: 'Drag Coefficient', value: variantData.dragCoefficient}}
                />  
            </Grid>
            <Grid item>
                <LeftRightGridLayout 
                leftData={{'title': 'Weight', 'value': `${variantData.weight}lbs`}} 
                rightData={{title: 'Wheels', value: `${variantData.wheels[0]}" or ${variantData.wheels[1]}"`}}
                />  
            </Grid>
            <Grid item>
                <LeftRightGridLayout 
                leftData={{'title': 'Cargo Capacity', 'value': variantData.cargo}} 
                rightData={{title: 'Charging', value: variantData.superchargingMax}}
                />  
            </Grid>
        </Grid>
    </div>
        
    )
  }
}


export default DetailGridView
