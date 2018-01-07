import * as React from 'react';
import * as d3 from 'd3';

class BasicMultiLine extends React.Component {
  componentDidMount() {
    const width = 960;
    const height = 500;
    const margin = {top: 20, right: 20, bottom: 30, left: 50};
    const data = [];

    const t = Date.parse(new Date('2000-1-1'));
    const cities = ['New York', 'San Francisco', 'Austin'];
    const dates = [];
    for (let i = 0; i < 100; i++) {
      dates.push(new Date(t + i * 1000 * 3600 * 24));
    }
    cities.forEach(_c => {
      const _data = [];
      for (let i = 0; i < 100; i++) {
        _data.push(Math.floor(Math.random() * 100));
      }
      data.push(_data);
    })

    const svg = d3.select('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);
    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleTime().domain(d3.extent(dates)).range([0, width]);
    const y = d3.scaleLinear()
      .domain([d3.min(data, d => d3.min(d)), d3.max(data, d => d3.max(d))])
      .range([0, height]);
    const color = d3.scaleOrdinal(d3.schemeCategory10).domain(cities);
    const line = d3.line()
      .x((d, i) => x(dates[i]))
      .y((d, i) => y(d));
    
    g.selectAll('g')
      .data(data)
      .enter().append('g').append('path')
      .attr('stroke', (d, i) => color(cities[i]))
      .attr('stroke-width', .5)
      .attr('fill', 'none')
      .attr('d', line);

    g.append('g').attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));
    g.append('g').attr('transform', `translate(0,0)`)
      .call(d3.axisLeft(y));
  }
  render() {
    return (
      <svg></svg>
    )
  }
}

export default BasicMultiLine;
