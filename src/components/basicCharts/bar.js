import * as React from 'react';
import * as d3 from 'd3';

class BasicBar extends React.Component {
  componentDidMount() {
    const width = 960;
    const height = 500;
    const margin = {top: 20, right: 20, bottom: 30, left: 50};
    const data = [];
    const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
    letters.forEach(_letter => {
      data.push({letter: _letter, frequency: Math.random()});
    });

    const svg = d3.select('svg').attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    
    const x = d3.scaleBand().domain(letters).rangeRound([0, width]).padding(0.1);
    const y = d3.scaleLinear().domain([0, d3.max(data, d => d.frequency)]).range([height, 0]);

    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));
    g.append('g')
      .attr('transform', `translate(0,0)`)
      .call(d3.axisLeft(y).ticks(10, '%'));

    g.selectAll('rect').data(data)
      .enter().append('rect')
      .attr('x', d => x(d.letter))
      .attr('y', d => y(d.frequency))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.frequency))
      .attr('fill', 'steelblue');
  }
  render() {
    return (
      <svg></svg>
    )
  }
}

export default BasicBar;
