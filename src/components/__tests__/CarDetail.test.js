import { cleanup, fireEvent, render } from '@testing-library/react'
import * as React from 'react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom';
import configureStore from '../../store';
import CarDetail from '../CarDetail';

const store = configureStore()

describe('Car Detail Page tests', () =>{
    test('if component renders without crashing', () => {
        const {getByText}= render(<CarDetail store={store} location={{state: {displayName: 'Model S'}}}/>)
        const controlElement = getByText('Order');
        expect(controlElement).toBeInTheDocument();
    });

    test ('if the button clicks redirects to next ur', () => {
        const history = createMemoryHistory();

           const {getByText} = render(
                <Router history={history}>
                    <CarDetail store={store} history={history} location={{state: {displayName: 'Model S'}}}/>
                </Router>);
            const controlElement = getByText('Order');
            fireEvent.click(controlElement);

            expect(history.location.pathname).toBe('/modelOrder');
    });
})
