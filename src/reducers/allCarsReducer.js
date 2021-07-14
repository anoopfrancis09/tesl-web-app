const initialState = {
    models: [],
    selectedModelData: {},
    selectedModelConfig: {}
}

export default function alarmReducer(state = initialState, action) {
    switch (action.type) {
        case 'RECEIVE_ALL_CARS': {
            return {
                ...state,
                models: action.list.elements
            }
        }
        case 'RECEIVE_MODEL_DATA': {
            return {
                ...state,
                selectedModelData: action.details
            }
        }
        case 'RECEIVE_MODEL_CONFIG': {
            return {
                ...state,
                selectedModelConfig: action.config
            }
        }
        default:{
            return {
                ...state
            }
        }
        
    }
}
