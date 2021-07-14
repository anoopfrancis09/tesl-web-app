import { cleanup, fireEvent, render } from '@testing-library/react'
import * as React from 'react'
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom';
import configureStore from '../../store'
import LandingPage from '../LandingPage'

const store = configureStore()

describe('Landing Page tests', () =>{
    test('if component renders without crashing', () => {
        const {getByText}= render(<LandingPage store={store} />)
        const controlElement = getByText('All Cars');
        expect(controlElement).toBeInTheDocument();
    });

    test ('if the button clicks redirects to next ur', () => {
        const history = createMemoryHistory();

           const {getByText} = render(
                <Router history={history}>
                    <LandingPage store={store} history={history}/>
                </Router>);
            const controlElement = getByText('All Cars');
            fireEvent.click(controlElement);

            expect(history.location.pathname).toBe('/allCars');
    });
})
