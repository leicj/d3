import * as React from 'react';
import * as d3 from 'd3';

import { GERD, growth, GDPcap, population, country, continent } from './data';

class Bubble extends React.Component {
  componentDidMount() {
    const width = 500;
    const height = 500;
    const margin = 50;
    const svg = d3.select('svg').attr('width', width).attr('height', height);
    const x = d3.scaleLinear().domain([0, 5]).range([margin, width - margin])
    const y = d3.scaleLinear().domain([-10, 10]).range([height - margin, margin])
    const r = d3.scaleLinear().domain([0, 500]).range([0, 20])
    const o = d3.scaleLinear().domain([10000, 100000]).range([.5, 1])
    const c = d3.scaleOrdinal(d3.schemeCategory10).domain(["Africa", "America", "Asia", "Europe", "Oceania"])

    const gx = d3.select('svg').append('g').attr('transform', `translate(0, ${height - margin})`)
    const gy = d3.select('svg').append('g').attr('transform', `translate(${margin},0)`)

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    const bubble = svg.selectAll('circle').data(country)
      .enter().append('circle')
      .attr('cx', (d, i) => x(GERD[i]))
      .attr('cy', (d, i) => y(growth[i]))
      .attr('r', (d, i) => r(Math.sqrt(population[i])))
      .style('fill', (d, i) => c(continent[i]))
      .style('opacity', (d, i) => o(GDPcap[i]))
      .append('title')
      .text(String);

    gx.call(xAxis);
    gy.call(yAxis);

    svg.selectAll('.h').data(d3.range(-8, 10, 2))
      .enter().append('line')
      .attr('class', 'h')
      .style('stroke', 'black')
      .style('stroke-dasharray', '4 4')
      .style('stroke-width', 1)
      .style('stroke-opacity', .5)
      .attr('x1', margin).attr('x2', width - margin)
      .attr('y1', y).attr('y2', y);

    svg.selectAll('.v').data(d3.range(.5, 5, .5))
      .enter().append('line')
      .attr('class', 'v')
      .style('stroke', 'black')
      .style('stroke-dasharray', '4 4')
      .style('stroke-width', 1)
      .style('stroke-opacity', .5)
      .attr('x1', x).attr('x2', x)
      .attr('y1', height - margin).attr('y2', margin);
  }
  render() {
    return (
      <div>
        <svg></svg>
      </div>
    )
  }
}

export default Bubble;
