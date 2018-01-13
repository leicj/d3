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
import Drag from './components/drag';
import Ease from './components/ease';

import BasicArea from './components/basicCharts/area';
import BasicLine from './components/basicCharts/line';
import BasicBivariateArea from './components/basicCharts/bivariateArea';
import BasicMultiLine from './components/basicCharts/multiLine';
import BasicStack from './components/basicCharts/stack';
import BasicBar from './components/basicCharts/bar';
import BasicStackedBar from './components/basicCharts/stackedBar';
import BasicStackedBar2 from './components/basicCharts/stackedBar2';
import BasicGroupedBar from './components/basicCharts/groupedBar';
import BasicScatterplot from './components/basicCharts/scatterPlot';
import BasicDonut from './components/basicCharts/donut';

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
    } else if (type === 'drag') {
      component = <Drag />
    } else if (type === 'ease') {
      component = <Ease />
    } else if (type === 'basicarea') {
      component = <BasicArea />
    } else if (type === 'basicline') {
      component = <BasicLine />
    } else if (type === 'basicbivariatearea') {
      component = <BasicBivariateArea />
    } else if (type === 'basicmultiline') {
      component = <BasicMultiLine />
    } else if (type === 'basicstack') {
      component = <BasicStack />
    } else if (type === 'basicbar') {
      component = <BasicBar />
    } else if (type === 'basicstackedbar') {
      component = <BasicStackedBar />
    } else if (type === 'basicstackedbar2') {
      component = <BasicStackedBar2 />
    } else if (type === 'basicgroupedbar') {
      component = <BasicGroupedBar />
    } else if (type === 'basicscatterplot') {
      component = <BasicScatterplot />
    } else if (type === 'basicdonut') {
      component = <BasicDonut />
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
          <Button type='primary' onClick={() => this.setState({ type: 'drag' })}>
            拖拽
          </Button>
          <Button type='primary' onClick={() => this.setState({ type: 'ease' })}>
            渐变
          </Button>
        </Row>
        <Row>
          <Button type='primary' onClick={() => this.setState({ type: 'basicarea' })}>
            Basic Area
          </Button>
          <Button type='primary' onClick={() => this.setState({ type: 'basicline' })}>
            Basic Line
          </Button>
          <Button type='primary' onClick={() => this.setState({ type: 'basicbivariatearea' })}>
            Basic Bivariate Area
          </Button>
          <Button type='primary' onClick={() => this.setState({ type: 'basicmultiline' })}>
            Basic Multi Line
          </Button>
          <Button type='primary' onClick={() => this.setState({ type: 'basicstack' })}>
            Basic Stack
          </Button>
          <Button type='primary' onClick={() => this.setState({ type: 'basicbar' })}>
            Basic Bar
          </Button>
          <Button type='primary' onClick={() => this.setState({ type: 'basicstackedbar' })}>
            Basic Stacked Bar
          </Button>
          <Button type='primary' onClick={() => this.setState({ type: 'basicstackedbar2' })}>
            Basic Stacked Bar2
          </Button>
          <Button type='primary' onClick={() => this.setState({ type: 'basicgroupedbar' })}>
            Basic Grouped Bar
          </Button>
          <Button type='primary' onClick={() => this.setState({ type: 'basicscatterplot' })}>
            Basic scallterPlot
          </Button>
          <Button type='primary' onClick={() => this.setState({ type: 'basicdonut' })}>
            Basic donut 
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
