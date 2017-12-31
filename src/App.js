import React, { Component } from 'react';
import { Button, Row } from 'antd';

import KeyJump from './components/keyjump';
import Bar from './components/bar';
import CodeInOut from './components/codeinout';

class App extends Component {
  state = {
    type: ''
  }
  render() {
    const type = this.state.type;
    let component = null;
    if (type === 'keyjump') {
      component = <KeyJump />
    } else if (type === 'bar') {
      component = <Bar />
    } else if (type === 'codeinout') {
      component = <CodeInOut />
    }
    return (
      <div className="App">
        <Row>
          <Button type='primary' onClick={() => this.setState({ type: 'bar' })}>
            柱状图
          </Button>
          <Button type='primary' onClick={() => this.setState({ type: 'codeinout' })}>
            字符淡入淡出
          </Button>
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
