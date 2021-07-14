/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react'
import {
  Grid
} from '@material-ui/core'
import { connect } from 'react-redux'
import compose from 'recompose/compose'
import Fab from '@material-ui/core/Fab'
// import image from '../assets/modelX.png'
import TopBottomTextView from '../MinimalSpecView/TopBottomTextView'
import {fetchModelDetails} from '../../actions'

// eslint-disable-next-line jsx-a11y/alt-text

const interiors = [
  {name: 'All Black', color: 'black', price: 0},
  {name: 'Beige', color: 'beige', price: 1000},
  {name: 'All White', color: 'white', price: 2000},
];

class ModelOrderConfiguration extends Component {
    constructor(props) {
        super(props)
        this.state = {
          selectedVariant: '',
          selectedPaint: 0,
          selectedWheel: 0,
          selectedInterior: 0,
          isSelfDrivingChoosen: true
        }
    
        this.onVariantSelection = this.onVariantSelection.bind(this);
        this.onPaintSelection = this.onPaintSelection.bind(this);
        this.onWheelSection = this.onWheelSection.bind(this);
        this.oninteriorSelection = this.oninteriorSelection.bind(this);
        this.onFinalOrderSelection = this.onFinalOrderSelection.bind(this);
      }

  componentWillReceiveProps(nextProps) {
    
  }

  onVariantSelection = (variant) => () => {

    this.setState({selectedVariant: variant});
    
  }

  onFinalOrderSelection = () => {
    const { onOrderSelection } = this.props
    const { selectedVariant, selectedPaint, selectedInterior, isSelfDrivingChoosen } = this.state;
    onOrderSelection({selectedVariant, selectedPaint, selectedInterior, isSelfDrivingChoosen, interiors})
  }

  onPaintSelection = (paintindex) => () => {
    const { onColorChange, modelConfig } = this.props

    onColorChange(modelConfig.paints[paintindex].name)
    this.setState({selectedPaint: paintindex});
  }

  oninteriorSelection = (interiorIndex) => () => {
    this.setState({selectedInterior: interiorIndex});
  }

  onWheelSection = (wheelIndex) => () => {
    this.setState({selectedWheel: wheelIndex});
  }

  render() {
    const { modelConfig } = this.props;
    const { selectedVariant, selectedPaint, selectedWheel, selectedInterior } = this.state;

    const variants = (modelConfig && modelConfig.variants) ? modelConfig.variants.map((item) => {
      return {variant: item.variant, variantDisplayName: item.variantName};
  }) : [];

  const variantData = (modelConfig && modelConfig.variants) ? modelConfig.variants.filter((item) => {
      return (item.variant === (selectedVariant !== '' ? selectedVariant : variants[0].variant));
  })[0] : {};

    return (
        <div class='modelConfigPage'>
          {
            Object.keys(variantData).length > 0 ? 
          
          (<>
          <Grid key='modelDataContainer' container direction='column' justifyContent='center' alignItems='center' spacing={4} style={{width: '100%'}}>
                  <Grid item>
                      <span class='modelName'>
                      {modelConfig.displayName}
                      </span>
                  </Grid>
                  <Grid item style={{width: '100%'}}>
                    <Grid container direction='row' spacing={2} justifyContent='space-between'>
                      <Grid item>
                          <TopBottomTextView topData={variantData.range} bottomData="Est Range" />
                      </Grid>
                      <Grid item>
                          <TopBottomTextView topData={variantData.topSpeed} bottomData="Top Speed" />
                      </Grid>
                      <Grid item>
                          <TopBottomTextView topData={`${variantData.acceleration.time} sec`} bottomData={`${variantData.acceleration.speed} sec`} />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item style={{width: '100%'}}>
                    <Grid container direction='column' spacing={2}>
                    {
                      variants.map((eachVariant, index) => {
                        return (
                          <Grid item style={{width: '100%'}}>
                          <button 
                            class={(selectedVariant === eachVariant.variant || (selectedVariant === '' && index === 0)) ? 'bt-active shadow-none' : 'btn shadow-none'} 
                            onClick={this.onVariantSelection(eachVariant.variant)}> 
                            {eachVariant.variantDisplayName} 
                          </button>
                          </Grid>
                        )
                      })
                    }
                    </Grid>
                  </Grid>
            </Grid>
            <Grid key='paintSelectionContainer' container direction='column' justifyContent='center' alignItems='center' spacing={4} style={{marginTop: 60}}>
              <Grid item>
                        <span class='modelName'>
                        Paint
                        </span>
              </Grid>
              <Grid item>
                    <Grid container direction='row' spacing={4}>
                      {
                        modelConfig.paints.map((eachPaint, index) => {
                          return (
                            <Grid item>
                              <img onClick={this.onPaintSelection(index)} class={selectedPaint === index ? 'paintImg-active' : ''} src={eachPaint.src} style={{width: 50, height: 50}}/>
                            </Grid>
                          )
                        })
                      }
                    </Grid>
              </Grid>
              <Grid item>
                <span style={{color: 'black'}}>
                  {`${modelConfig.paints[selectedPaint].name} `}
                </span>
                <span style={{color: 'gray', fontWeight: 'bold'}}>
                  {`    $${modelConfig.paints[selectedPaint].price}`}
                </span>
              </Grid>
            </Grid>
            <Grid key='wheelSelectionContainer' container direction='column' justifyContent='center' alignItems='center' spacing={4} style={{marginTop: 60}}>
              <Grid item>
                        <span class='modelName'>
                        Wheels
                        </span>
              </Grid>
              <Grid item>
                    <Grid container direction='row' spacing={4}>
                      {
                        modelConfig.wheels.map((eachPaint, index) => {
                          return (
                            <Grid item>
                              <img 
                                onClick={this.onWheelSection(index)} 
                                class={selectedWheel === index ? 'wheelImg-active' : 'wheelImg'} 
                                src={eachPaint.src}
                                alt='wheelImage'
                              />
                            </Grid>
                          )
                        })
                      }
                    </Grid>
              </Grid>
              <Grid item>
                <span style={{color: 'black'}}>
                  {`${modelConfig.wheels[selectedWheel].name} `}
                </span>
                <span style={{color: 'gray', fontWeight: 'bold'}}>
                  {`    $${modelConfig.wheels[selectedWheel].price}`}
                </span>
              </Grid>
            </Grid>
            <Grid key='interiorSelectionContainer' container direction='column' justifyContent='center' alignItems='center' spacing={4} style={{marginTop: 60}}>
              <Grid item>
                          <span class='modelName'>
                          Interiors
                          </span>
              </Grid>
              <Grid item>
                    <Grid container direction='row' spacing={4}>
                      {
                        interiors.map((eachInterior, index) => {
                          return (
                            <Grid item>
                              <div 
                                onClick={this.oninteriorSelection(index)} 
                                class={selectedInterior === index ? `interiorImg-active${eachInterior.color}` : `interiorImg-${eachInterior.color}`} 
                              />
                            </Grid>
                          )
                        })
                      }
                    </Grid>
              </Grid>
              <Grid item>
                <span style={{color: 'black'}}>
                  {`${interiors[selectedInterior].name} `}
                </span>
                <span style={{color: 'gray', fontWeight: 'bold'}}>
                  {`    $${interiors[selectedInterior].price}`}
                </span>
              </Grid>
            </Grid>
            <Grid key='autoDriveSelectionContainer' container direction='column' justifyContent='center' alignItems='center' spacing={4} style={{marginTop: 60}}>
              <Grid item>
                          <span class='modelName'>
                          Full Self-Driving Capabilities
                          </span>
              </Grid>
              <Grid item>
                    <Grid container direction='column'>
                      <Grid item><span class='selfDrvingText'>Navigate on Autopilot</span></Grid>
                      <Grid item><span class='selfDrvingText'>Auto Lane change</span></Grid>
                      <Grid item><span class='selfDrvingText'>Auto Park</span></Grid>
                      <Grid item><span class='selfDrvingText'>Summon</span></Grid>
                      <Grid item><span class='selfDrvingText'>Full Self Driving Computer</span></Grid>
                      <Grid item><span class='selfDrvingText'>Traffic Light and Stop Sign Control</span></Grid>
                    </Grid>
              </Grid>
              <Grid item>
              <button 
                class='removeButton'
                onClick={this.onFullAutoDrivingCancelled}> 
                Remove
                </button>
              </Grid>
            </Grid>
            <Grid key='orderContainer' container direction='column' justifyContent='center' alignItems='center' spacing={2} style={{marginTop: 60}}>
            <Grid item><span class='orderYourModelText'>{`Order Your ${modelConfig.displayName}`}</span></Grid>
            <Grid item><span class='selfDrvingText'>Estimated Delivery: 6-8 Weeks</span></Grid>
            <Grid item>
              <button 
                class='finalOrderButton'
                onClick={this.onFinalOrderSelection}> 
                Order
                </button>
              </Grid>
          </Grid>
            </>
              ) : null }
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
)(ModelOrderConfiguration)
