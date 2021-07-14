import React, { Component } from 'react'
import { jsPDF } from "jspdf";
import {
  Grid
} from '@material-ui/core'
import LinearProgress from '@material-ui/core/LinearProgress';
import { connect } from 'react-redux'
import compose from 'recompose/compose'
import Fab from '@material-ui/core/Fab'
// import image from '../assets/modelX.png'
import modelS from '../../assets/modelS.png'
import whiteModelS from '../../assets/compositor\ 1.png'
import redModelS from '../../assets/Tesla Ordering/compositor.png'
import successtick from '../../assets/check-mark.png'
import successImage2 from '../../assets/successImage2.png'
import TopBottomTextView from '../MinimalSpecView/TopBottomTextView'

import {fetchModelConfiguration} from '../../actions'
import { white } from 'material-ui/styles/colors'

class ModelOrderMainPage extends Component {
      constructor(props) {
        super(props)
        this.state = {
          isLoading: true
        }
        this.onColorSelectionChange = this.onColorSelectionChange.bind(this);
        this.onOrderSelection = this.onOrderSelection.bind(this);
        this.onclickExplore = this.onclickExplore.bind(this);
      }

  componentWillReceiveProps(nextProps) {
    
  }

  onColorSelectionChange = (color) => {
    const colorCode = color.toLowerCase().includes('red') ? 'red' : 'white'
    this.setState({selectedColor: colorCode});
  }

  onOrderSelection = (data) => {
    const {history} = this.props

    history.push('/finalOrderPage')
  }

  onclickExplore = () => {
    const {history} = this.props;
    history.push('/allCars');
  }

  onDownloadInvoice = (variantData, selectedPaint, selectedWheel, selectedInterior, totalPrice) => () => {
    const { location } = this.props
    const { modelConfig } = location.state

    var doc = new jsPDF('p', 'pt');
      
      doc.text(100, 20, 'Order Invoice')

      doc.addFont('helvetica', 'normal')
      doc.text(20, 60, `Variant: ${variantData.variantName}`)
      doc.text(20, 100, `Paint: ${selectedPaint.name}`)
      doc.text(20, 140, `Wheel: ${selectedWheel.name}`)
      doc.text(20, 180, `Interior: ${selectedInterior.name}`)
      doc.text(20, 220, `Total Price: $${totalPrice.toString()}`)    
      doc.text(20, 260, `Estimated delivery: 6-8`)   

      
      doc.save(`invoice_${modelConfig.displayName}.pdf`)
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({isLoading: false});
  }, 5000);
  }


  render() {
    const { location, onclickExplore } = this.props
    const { modelConfig, userData } = location.state

    const variantData = (modelConfig && modelConfig.variants) ? modelConfig.variants.filter((item) => {
        return (item.variant === (userData.selectedVariant !== '' ? userData.selectedVariant : modelConfig.variants[0].variant));
    })[0] : {};
    
    const selectedPaint = modelConfig.paints[userData.selectedPaint ? userData.selectedPaint : 0]
    const selectedWheel = modelConfig.wheels[userData.selectedWheel ? userData.selectedWheel : 0]
    const selectedInterior = userData.interiors[userData.selectedInterior ? userData.selectedInterior : 0]
    const selfDrivingConfig = modelConfig.selfDriving

    const totalPrice = parseInt(variantData.price) + parseInt(selectedPaint.price) + parseInt(selectedWheel.price) + parseInt(selectedInterior.price) + (userData.isSelfDrivingChoosen ? selfDrivingConfig.price : 0)
    
    return (
      this.state.isLoading ? <div> 
        <Grid container justifyContent='center' alignItems='center' style={{height: '100vh'}}>
          <Grid item>
            <LinearProgress style={{width: 500}}/> 
          </Grid>
        </Grid>
        
        </div> :
        <div style={{backgroundColor: 'white'}} id='invoiceContent' >
        <Grid container direction='column' style={{paddingTop: 50,}}  spacing={4} alignItems='center' justifyContent='center'>
            <Grid item>
                <Grid key='orderSuccessContainer' container alignItems='center' spacing={2}>
                    <Grid item>
                    <img src={successtick} alt='orderSuccessTick' class='tickImage'/>
                    </Grid>
                    <Grid item> 
                    <span class='orderCompleteMessage'> Your Order is Complete </span>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <img src={successImage2} alt='hurrayImage' class='hurrayImage'/>
            </Grid>
            <Grid item style={{width: '500px'}}>
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
            </Grid>
            </Grid>
            <Grid item>
            <img alt='orderSummaryCar' src={userData.selectedPaint === 1 ? redModelS : whiteModelS} style={{width: '600px'}}/>
            </Grid>
            <Grid item class='variantOrderSummary'>
                <span style={{float: 'left'}} >
                    {variantData.variantName}
                </span>
                <span style={{float: 'right'}}>
                    ${variantData.price}
                </span>
            </Grid>
            <Grid item class='specOrderSummaryBar'>
                <Grid container justifyContent='space-between'>
                    <Grid item>
                        <TopBottomTextView topData={selectedPaint.name} bottomData={selectedPaint.price === 0 ? 'Included' : `$${selectedPaint.price}`} style={{float: 'left'}}/>
                    </Grid>
                    <Grid item>
                        <img alt="orderSummaryPaint" src={selectedPaint.src} style={{float: 'right', width: 50, height: 50}} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item class='specOrderSummaryBar'>
                <Grid container justifyContent='space-between'>
                    <Grid item>
                        <TopBottomTextView topData={selectedWheel.name} bottomData={selectedWheel.price === 0 ? 'Included' : `$${selectedWheel.price}`} style={{float: 'left'}}/>
                    </Grid>
                    <Grid item>
                        <img alt="orderSummaryPaint" src={selectedWheel.src} style={{float: 'right', width: 50, height: 50}} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item class='specOrderSummaryBar'>
            <Grid container justifyContent='space-between'>
                    <Grid item>
                        <TopBottomTextView topData={selectedInterior.name} bottomData={selectedInterior.price === 0 ? 'Included' : `$${selectedInterior.price}`} style={{float: 'left'}}/>
                    </Grid>
                    <Grid item>
                    <div 
                    class={`interiorImg-${selectedInterior.color}`}
                    />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item class='specOrderSummaryBar'>
            <Grid container justifyContent='left'>
                    <Grid item>
                        <TopBottomTextView topData='Full Self-Driving Capabilities' bottomData={selfDrivingConfig.price === 0 ? 'Included' : `$${selfDrivingConfig.price}`} style={{float: 'left'}}/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item class='totalPriceBar'>
                <span >  ${totalPrice} </span>
            </Grid>
            </Grid>
            <Grid container justifyContent='center' style={{marginTop: 40}} spacing={4}>
                    <Grid item>
                        <button onClick={this.onclickExplore} class='exploreModelButton'> Explore {modelConfig.displayName} </button>
                    </Grid>
                    <Grid item>
                    <button class='invoiceButton' onClick={this.onDownloadInvoice(variantData, selectedPaint, selectedWheel, selectedInterior, totalPrice)}> Download Invoice </button>
                    </Grid>
            </Grid>
        </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
      getModelConfig: (model) => dispatch(fetchModelConfiguration(model))
  }
}

function mapStateToProps(state) {
  return {
    modelConfig: state.allCarReducer.selectedModelConfig
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ModelOrderMainPage)
