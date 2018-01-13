import * as React from 'react';
import * as d3 from 'd3';

class BasicWaterfallChart extends React.Component {
  componentDidMount() {
    const width = 960;
    const height = 600;
    const margin = {top: 20, right: 20, bottom: 40, left: 40};
    const names = ['Product', 'Services', 'Fixed Costs', 'Variable Costs'];
    const values = [420000, 210000, -170000, -140000];
    names.push('Total');
    values.push(d3.sum(values));

    const svg = d3.select('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);
    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand().domain(names).rangeRound([0, width]).padding(0.3);
    const y = d3.scaleLinear().domain([0, 630000]).range([height, 0]);
    g.append('g').attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));
    g.append('g').attr('transform', `translate(0,0)`)
      .call(d3.axisLeft(y).tickFormat(d => `$${d / 1000}K`));

    g.append('g')
      .selectAll('rect').data(values)
      .enter().append('rect')
      .attr('x', (d, i) => x(names[i]))
      .attr('y', (d, i) => {
        if (i + 1 !== values.length) {
          if (d > 0) {
            return y(d + d3.sum(values.slice(0, i)));
          }
          return y(d3.sum(values.slice(0, i)));
        } else {
          return y(d);
        }
      })
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(Math.abs(d)))
      .style('fill', (d, i) => i + 1 === values.length ? 'steelblue' : d > 0 ? 'darkolivegreen' : 'red')

    g.append('g')
      .selectAll('text').data(values)
      .enter().append('text')
      .attr('x', (d, i) => x(names[i]) + x.bandwidth() / 2)
      .attr('y', (d, i) => {
        if (i + 1 !== values.length) {
          if (d > 0) {
            return y(d + d3.sum(values.slice(0, i))) + 15;
          }
          return y(d3.sum(values.slice(0, i)) + d) - 5;
        } else {
          return y(d) + 15;
        }
      })
      .style('text-anchor', 'middle')
      .text(d => `$${d / 1000}k`);
  }
  render() {
    return (
      <svg></svg>
    )
  }
}

export default BasicWaterfallChart;
