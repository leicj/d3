import * as React from 'react';
import * as d3 from 'd3';

import './index.css'

class Drag extends React.Component {
  componentDidMount() {
    const width = 500;
    const height = 500;
    const svg = d3.select('svg')
      .attr('width', width)
      .attr('height', height);
    const radius = 32;
    const circles = d3.range(20).map(() => {
      return {
        x: Math.round(Math.random() * (width - radius * 2) + radius),
        y: Math.round(Math.random() * (height - radius * 2) + radius),
      }
    });

    const color = d3.scaleOrdinal().range(d3.schemeCategory10);

    svg.selectAll('circle')
      .data(circles)
      .enter().append('circle')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', radius)
      .style('fill', (d, i) => color(i))
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));

    function dragstarted(d) {
      d3.select(this).raise().classed('active', true);
    }
    function dragged(d) {
      d3.select(this).attr('cx', d.x = d3.event.x).attr('cy', d.y = d3.event.y);
    }
    function dragended(d) {
      d3.select(this).classed('active', false);
    }
  }
  render() {
    return (
      <div className='drag'>
        <svg></svg>
      </div>
    )
  }
}

export default Drag;
