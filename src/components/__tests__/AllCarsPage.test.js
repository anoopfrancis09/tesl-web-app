import { cleanup, fireEvent, getByTestId, render, waitFor } from '@testing-library/react'
import * as React from 'react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom';
import configureStore from '../../store'
import AllCarsPage from '../AllCarsPage'

const store = configureStore()

const models = [{"model":"modelS","displayName":"Model S","range":390,"acceleration":{"speed":"0-60","time":1.99},"topSpeed":200,"peakPower":1020},{"model":"model3","displayName":"Model 3","range":353,"acceleration":{"speed":"0-60","time":3.1},"AWD":"Dual Motor"},{"model":"modelX","displayName":"Model X","range":340,"acceleration":{"speed":"0-60","time":2.5},"peakPower":1020},{"model":"modelY","displayName":"Model Y","range":326,"AWD":"Dual Motor"}];

describe('All cars Page tests', () =>{
    test('if component renders without crashing', () => {
        const {getByText}= render(<AllCarsPage store={store} models={models}/>)
        const controlElement = getByText('All Models');
        expect(controlElement).toBeInTheDocument();
    });
})
