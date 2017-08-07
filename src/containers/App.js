import React, { Component } from 'react';
import SingleTarget from '../components/single-targets/';
import Sortable from '../components/sortable/';

class App extends Component {
    render() {
        return (
            <div>
                {/*<SingleTarget />*/}
                <Sortable />
            </div>
        );
    }
}

export default App;
