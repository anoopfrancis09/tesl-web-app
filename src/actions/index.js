import network from '../common/network'

const receiveAllCars = (list) => ({
    type: 'RECEIVE_ALL_CARS',
    list
  });

  const receiveModelDetails = (details) => ({
    type: 'RECEIVE_MODEL_DATA',
    details
  });

  const receiveModelConfig = (config) => ({
    type: 'RECEIVE_MODEL_CONFIG',
    config
  });

export function fetchAllCars() {
    return (dispatch) => {
        network.get({url: 'https://tesla-app-server.herokuapp.com/models/all'})
        .then((response) => {
          if (!response.ok) {
            throw new Error('Cars list fetch failed')
          }
          return response
        })
        .then((result) => result.json())
        .then((result) => {
          dispatch(receiveAllCars(result))
        })
        .catch()
    }
  }

  export function fetchModelDetails(model) {
    return (dispatch) => {
        network.get({url: `https://tesla-app-server.herokuapp.com/models/${model}`})
        .then((response) => {
          if (!response.ok) {
            throw new Error('Model detail fetch failed')
          }
          return response
        })
        .then((result) => result.json())
        .then((result) => {
          dispatch(receiveModelDetails(result))
        })
        .catch()
    }
  }


  export function fetchModelConfiguration(model) {
    return (dispatch) => {
        network.get({url: `https://tesla-app-server.herokuapp.com/models/${model}/configure`})
        .then((response) => {
          if (!response.ok) {
            throw new Error('Model detail fetch failed')
          }
          return response
        })
        .then((result) => result.json())
        .then((result) => {
          dispatch(receiveModelConfig(result))
        })
        .catch()
    }
  }