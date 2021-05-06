import React from 'react';
import { Container } from 'react-bootstrap';
import Players from './containers/Players/Players';

function App() {
    return (
        <Container className="mt-5">
            <Players />
        </Container>
    );
}

export default App;
