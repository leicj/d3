import * as React from 'react';
import * as d3 from 'd3';

import './index.css'

class BasicBarChart extends React.Component {
  componentDidMount() {
    const width = 960;
    const height = 500;
    const margin = {top: 20, right: 20, bottom: 40, left: 40};
    const names = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const values = [-15, -20, -22, -18, 2, 6, 26, 18];

    const svg = d3.select('svg').attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);
    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);
    const x = d3.scaleLinear().domain(d3.extent(values)).range([0, width]);
    const y = d3.scaleBand().domain(names).range([0, height], 0.1);

    g.selectAll('.bar').data(values)
      .enter().append('rect')
      .attr('class', d => 'bar bar--' + (d < 0 ? 'negative' : 'positive'))
      .attr('x', d => x(Math.min(0, d)))
      .attr('y', (d, i) => y(names[i]))
      .attr('width', d => Math.abs(x(d) - x(0)))
      .attr('height', y.bandwidth() - 5);

    g.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));
    g.append('g')
      .attr('class', 'y axis')
      .attr('transform', `translate(${x(0)},0)`)
      .call(d3.axisLeft(y).tickSize(0).tickPadding(6));
  }
  render() {
    return (
      <svg></svg>
    )
  }
}

export default BasicBarChart;
