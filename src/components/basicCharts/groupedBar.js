import * as React from 'react';
import * as d3 from 'd3';

class BasicGroupedBar extends React.Component {
  componentDidMount() {
    const width = 960;
    const height = 600;
    const margin = {top: 20, right: 40, bottom: 40, left: 50};
    const data = [];

    const x0Name = ['a', 'b', 'c', 'd', 'e'];
    const x1Name = [2000, 2001, 2002, 2003];
    x0Name.forEach(_x0n => {
      const _data = [];
      x1Name.forEach(_x1n => {
        _data.push(Math.floor(Math.random() * 100));
      });
      data.push(_data);
    });
    console.log(data);

    const svg = d3.select('svg').attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom);
    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    const x0 = d3.scaleBand().domain(x0Name).range([0, width]).paddingInner(0.1);
    const x1 = d3.scaleBand().domain(x1Name).rangeRound([0, x0.bandwidth()]).padding(0.05);
    const y = d3.scaleLinear().domain([0, 100]).range([height, 0]);
    const z = d3.scaleOrdinal()
      .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b"]);

    g.append('g').attr('transform', `translate(0,${height})`).call(d3.axisBottom(x0));
    g.append('g').attr('transform', `translate(0,0)`).call(d3.axisLeft(y));

    g.append('g')
      .selectAll('g')
      .data(data)
      .enter().append('g')
      .attr('transform', (d, i) => `translate(${x0(x0Name[i])},0)`)
      .selectAll('rect')
      .data(d => d)
      .enter().append('rect')
      .attr('x', (d, i) => x1(x1Name[i]))
      .attr('y', d => y(d))
      .attr('width', x1.bandwidth())
      .attr('height', d => height - y(d))
      .attr('fill', (d, i) => z(i));

    const legend = g.append('g')
      .attr('font-family', 'sanf-serif')
      .attr('font-size', 10)
      .attr('text-anchor', 'end')
      .selectAll('g')
      .data(x1Name)
      .enter().append('g')
      .attr('transform', (d, i) => `translate(0,${i * 20})`);
    legend.append('rect')
      .attr('x', width - 19)
      .attr('width', 19)
      .attr('height', 19)
      .attr('fill', z);
    legend.append('text')
      .attr('x', width - 24)
      .attr('y', 9.5)
      .attr('dy', '0.32em')
      .text(d => d);
  }
  render() {
    return (
      <svg></svg>
    )
  }
}

export default BasicGroupedBar;
