import React, { Component } from 'react';
import { Button, Row } from 'antd';

import KeyJump from './components/keyjump';

class App extends Component {
  state = {
    type: ''
  }
  render() {
    const type = this.state.type;
    let component = null;
    if (type === 'keyjump') {
      component = <KeyJump />
    }
    return (
      <div className="App">
        <Row>
          <Button type='primary' onClick={() => this.setState({ type: 'keyjump' })}>
            字符跳动
          </Button>
        </Row>
        <Row>
          {component}
        </Row>
      </div>
    );
  }
}

export default App;
