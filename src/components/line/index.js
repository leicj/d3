import * as React from 'react';
import * as d3 from 'd3';

class Line extends React.Component {
  componentDidMount() {
    const data = [];
    const t = Date.parse(new Date());
    for (let i = 0; i < 20; i++) {
      const date = new Date(t + i * 1000 * 3600 * 24);
      const value = Math.floor(Math.random() * 100);
      data.push({date: date, value});
    }

    const margin = {top: 20, right: 20, bottom: 30, left: 50}
    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const x = d3.scaleTime().domain([d3.min(data, d => d.date), d3.max(data, d => d.date)]).range([0, width]);
    const y = d3.scaleLinear().domain([d3.min(data, d => d.value), d3.max(data, d => d.value)]).range([height, 0]);
    const valueline = d3.line()
      .x(d => x(d.date))
      .y(d => y(d.value));

    const svg = d3.select('svg').append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    svg.append('path').data([data])
      .style('fill', 'none')
      .style('stroke', 'steelblue')
      .style('stroke-width', '2px')
      .attr('d', valueline)

    svg.append('g').call(d3.axisLeft(y));
    svg.append('g').attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat(d3.timeFormat('%Y-%m-%d')));
    
  }
  render() {
    return (
      <svg width="960" height="500"></svg>
    )
  }
}

export default Line;