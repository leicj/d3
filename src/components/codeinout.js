import * as React from 'react';
import * as d3 from 'd3';
import { Row, Button } from 'antd';

import './codeinout.css';

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

class CodeInOut extends React.Component {
  componentDidMount() {
    this.svg1();
    this.svg2();
    this.svg3();
  }
  svg1 = () => {
    const svg = d3.select('.svg1');
    const g = svg.append('g').attr('transform', `translate(32,100)`);

    const update = (data) => {
      const text = g.selectAll('text').data(data);
      text.attr('class', 'update');

      text.enter().append('text')
        .attr('class', 'enter')
        .attr('x', (d, i) => i * 32)
        .attr('dy', '.35em')
        .merge(text)
        .text(d => d);
      
      text.exit().remove();
    }

    update(alphabet);

    setInterval(() => {
      update(d3.shuffle(alphabet).slice(0, Math.floor(Math.random() * 26)).sort());
    }, 1500);
  }
  svg2 = () => {
    const svg = d3.select('.svg2');
    const g = svg.append('g').attr('transform', 'translate(32,100)');

    const update = (data) => {
      const text = g.selectAll('text').data(data, d => d);
      text.attr('class', 'update');

      text.enter().append('text')
        .attr('class', 'enter')
        .attr('dy', '.35em')
        .merge(text)
        .attr('x', (d, i) => i * 32)
        .text(d => d);

      text.exit().remove();
    }

    update(alphabet);

    setInterval(() => {
      update(d3.shuffle(alphabet).slice(0, Math.floor(Math.random() * 26)).sort());
    }, 1500);
  }
  svg3 = () => {
    const svg = d3.select('.svg3');
    const g = svg.append('g').attr('transform', 'translate(32,100)');

    const update = (data) => {
      const text = g.selectAll('text').data(data, d => d);
      const t = d3.transition().duration(750);

      text.exit()
        .attr('class', 'exit')
        .transition(t)
        .attr('y', 60)
        .style('fill-opacity', 1e-6)
        .remove();

      text.attr('class', 'update')
        .attr('y', 0)
        .style('fill-opacity', 1)
        .transition(t)
        .attr('x', (d, i) => i * 32);

      text.enter().append('text')
        .attr('class', 'enter')
        .attr('y', -60)
        .attr('x', (d, i) => i * 32)
        .style('fill-opacity', 1e-6)
        .text(d => d)
        .transition(t)
        .attr('y', 0)
        .style('fill-opacity', 1);
    }

    update(alphabet);

    setInterval(() => {
      update(d3.shuffle(alphabet).slice(0, Math.floor(Math.random() * 26)).sort());
    }, 1500);
  }
  render() {
    return (
      <Row className="codeinout">
        <svg width="960" height="200" className='svg1'></svg>
        <svg width="960" height="200" className='svg2'></svg>
        <svg width="960" height="200" className='svg3'></svg>
      </Row>
    )
  }
}

export default CodeInOut;

