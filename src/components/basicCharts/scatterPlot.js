import * as React from 'react';
import * as d3 from 'd3';

class BasicScatterPlot extends React.Component {
  componentDidMount() {
    const width = 960;
    const height = 600;
    const margin = {top: 20, right: 20, bottom: 40, left: 40};
    const data = [];

    const x0Name = ['setosa', 'versicolor', 'virginica'];
    x0Name.forEach(_x0n => {
      const _data = d3.range(20).map(() => {
        return {cx: Math.floor(Math.random() * 10), cy: Math.floor(Math.random() * 20)};
      });
      data.push(_data);
    });

    const svg = d3.select('svg').attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom);
    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);
    const x = d3.scaleLinear().domain([0, 10]).range([0, width]);
    const y = d3.scaleLinear().domain([0, 20]).range([height, 0]);
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    g.append('g').attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));
    g.append('g').attr('transform', `translate(0,0)`)
      .call(d3.axisLeft(y));

    let colorIndex = -1;
    g.selectAll('.gCircle').data(data)
      .enter().append('g')
      .attr('class', 'gCircle')
      .selectAll('circle').data(d => d)
      .enter().append('circle')
      .attr('r', 5)
      .attr('cx', d => x(d.cx))
      .attr('cy', d => y(d.cy))
      .attr('fill', (d, i) => {
        if (i === 0) {
          colorIndex++;
        }
        return color(colorIndex)
      });

    const legend = svg.selectAll('.legend')
      .data(color.domain())
      .enter().append('g')
      .attr('class', 'legend')
      .attr('transform', (d, i) => `translate(0,${i * 20})`)

    legend.append('rect')
      .attr('x', width - 19)
      .attr('width', 18)
      .attr('height', 18)
      .style('fill', color);

    legend.append('text')
      .attr('x', width - 24)
      .attr('y', 9)
      .attr('dy', '.35em')
      .style('text-anchor', 'end')
      .text(d => d);
  }
  render() {
    return (
      <svg></svg>
    )
  }
}

export default BasicScatterPlot;
