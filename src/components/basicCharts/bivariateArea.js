import * as React from 'react';
import * as d3 from 'd3';

class BasicBivariateArea extends React.Component {
  componentDidMount() {
    const width = 960;
    const height = 500;
    const margin = {top: 20, right: 20, bottom: 30, left: 50};
    const data = [];

    const t = Date.parse(new Date('2000-1-1'));
    for (let i = 0; i < 500; i++) {
      const low = Math.floor(Math.random() * 100);
      const high = low + Math.floor(Math.random() * 100);
      data.push({
        date: new Date(t + i * 1000 * 3600 * 24),
        low,
        high,
      })
    }

    const svg = d3.select('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);
    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`)

    const x = d3.scaleTime().domain(d3.extent(data, d => d.date)).range([0, width]);
    const y = d3.scaleLinear().domain([d3.min(data, d => d.low), d3.max(data, d => d.high)]).range([height, 0]);
    g.append('g').attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));
    g.append('g').attr('transform', `translate(0,0)`)
      .call(d3.axisLeft(y));

    const area = d3.area()
      .x(d => x(d.date))
      .y0(d => y(d.low))
      .y1(d => y(d.high));
    
    g.append('path')
      .datum(data)
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', area);
  }
  render() {
    return (
      <svg></svg>
    )
  }
}

export default BasicBivariateArea;
