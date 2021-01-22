import React, { Component } from 'react';
import ReactDom from 'react-dom';

class A extends Component {
    render() {
        return <div>hello world</div>;
    }
};

ReactDom.render(<App />, document.getElementById('app'));