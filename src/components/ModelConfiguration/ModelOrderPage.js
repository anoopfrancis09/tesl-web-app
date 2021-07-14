import React, { Component } from 'react'
import {
  Grid
} from '@material-ui/core'
import { connect } from 'react-redux'
import compose from 'recompose/compose'
import Fab from '@material-ui/core/Fab'
// import image from '../assets/modelX.png'
import modelS from '../../assets/modelS.png'
import whiteModelS from '../../assets/compositor\ 1.png'
import redModelS from '../../assets/compositor\ (1)\ 1.png'
import ModelOrderConfiguration from './ModelOrderConfigurations'
import {fetchModelConfiguration} from '../../actions'

class ModelOrderMainPage extends Component {
      constructor(props) {
        super(props)
        this.state = {
          selectedColor: 'white',
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

  onOrderSelection = (userData) => {

    const {history, modelConfig} = this.props

    // this.timeout(100000);
    history.push({
      pathname: '/finalOrderPage',
      state: {modelConfig, userData}
    });
  }

  onclickExplore = () => () => {
    console.log('Coming heree....')
    const {history, location} = this.props;
    const { modelName } = location.state
    history.push({
      pathname: '/carDetails',
      state: { modelName }
    });
}

  timeout(ms) { //pass a time in milliseconds to this function
    console.log('Coming here.....')
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  componentDidMount() {
    const { location } = this.props
    const { modelName } = location.state
    const { getModelConfig } = this.props

    getModelConfig(modelName)
  }


  render() {
    const { location, modelConfig, history } = this.props
    const { modelName } = location.state
    const { selectedColor } = this.state;
    
    return (
        <div>
        {modelConfig ? 
        (<Grid container style={{backgroundColor: 'white'}}>
                <Grid item lg={7}>
                    <img src={selectedColor === 'white' ? whiteModelS : redModelS} alt='modelS' class='orderModelImage'/>
                </Grid>
                <Grid item lg={5} style={{zIndex:999}}>
                    <ModelOrderConfiguration onclickExplore={this.onclickExplore} onOrderSelection={this.onOrderSelection} onColorChange={this.onColorSelectionChange} history={history} modelName= {modelName} modelConfig={modelConfig}/>
                </Grid>
            </Grid>
        ) : null }
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
