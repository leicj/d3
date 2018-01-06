import React, { Component } from 'react';
import { Button, Row } from 'antd';

import KeyJump from './components/keyjump';
import Bar from './components/bar';
import CodeInOut from './components/codeinout';
import Transition from './components/transition';
import Bubble from './components/bubble';
import Clock from './components/clock';
import Line from './components/line';
import SunBurst from './components/sunburst';
import Grid from './components/grid';
import Brush from './components/brush';

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
    } else if (type === 'transition') {
      component = <Transition />
    } else if (type === 'bubble') {
      component = <Bubble />
    } else if (type === 'clock') {
      component = <Clock />
    } else if (type === 'line') {
      component = <Line />
    } else if (type === 'sunburst') {
      component = <SunBurst />
    } else if (type === 'grid') {
      component = <Grid />
    } else if (type === 'brush') {
      component = <Brush />
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
          <Button type='primary' onClick={() => this.setState({ type: 'transition' })}>
            延时转换
          </Button>
          <Button type='primary' onClick={() => this.setState({ type: 'bubble' })}>
            散点图
          </Button>
          <Button type='primary' onClick={() => this.setState({ type: 'clock' })}>
            时钟
          </Button>
          <Button type='primary' onClick={() => this.setState({ type: 'line' })}>
            线图
          </Button>
          <Button type='primary' onClick={() => this.setState({ type: 'sunburst' })}>
            饼状图
          </Button>
          <Button type='primary' onClick={() => this.setState({ type: 'grid' })}>
            网格
          </Button>
          <Button type='primary' onClick={() => this.setState({ type: 'brush' })}>
            刷子
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
