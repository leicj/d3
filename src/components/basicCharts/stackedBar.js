import * as React from 'react';
import * as d3 from 'd3';

class BasicStackedBar extends React.Component {
  componentDidMount() {
    const width = 660;
    const height = 300;
    const margin = {top: 20, right: 20, bottom: 30, left: 50};
    const data = [];

    const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const legends = ['legend1', 'legend2', 'legend3'];
    letters.forEach((_letter, i) => {
      const _dict = {};
      legends.forEach((_legend, j) => {
        _dict[_legend] = Math.floor(Math.random() * 5 + 2);
      });
      data.push(_dict);
    });

    const svg = d3.select('svg').attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    const x = d3.scaleBand().domain(letters).range([0, width]).padding(0.1);
    const y = d3.scaleLinear().domain([0, 22]).range([height, 0]);
    const color = d3.scaleOrdinal().range(["red", "black", "green"]).domain(legends);

    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));
    g.append('g')
      .attr('transform', `translate(0,0)`)
      .call(d3.axisLeft(y));

    const stack = d3.stack()
      .keys(legends);

    const area = d3.area()
      .x((d, i) => x(letters[i]))
      .y0(d => y(d[0]))
      .y1(d => y(d[1]));

    let colorIndex = -1;
    g.selectAll('.stack').data(stack(data))
      .enter().append('g').attr('class', 'stack')
      .selectAll('rect').data(d => d)
      .enter().append('rect')
      .style('fill', (d, i) => {
        if (i === 0) {
          colorIndex += 1;
        }
        return color(legends[colorIndex])
      })
      .attr('x', (d, i) => x(letters[i % letters.length]))
      .attr('y', d => y(d[1]))
      .attr('width', x.bandwidth())
      .attr('height', d => y(d[0]) - y(d[1]))
  }
  render() {
    return (
      <svg></svg>
    )
  }
}

export default BasicStackedBar;
