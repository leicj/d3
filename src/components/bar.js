import * as React from 'react';
import * as d3 from 'd3';
import 'd3-selection-multi';

class Bar extends React.Component {
  componentDidMount() {
    const data = d3.range(20).map(() => parseInt(Math.random() * 100, 10), 100);
    const height = 500;
    const width = 960;
    const barOffset = 10;
    const barWidth = width / data.length - barOffset;

    const y = d3.scaleLinear().domain([0, d3.max(data)]).range([height, 0]);
    const x = d3.scaleBand().domain(d3.range(20)).range([0, width]);

    const gx = d3.select('.chart').append('g').attr('transform', `translate(0,${height})`);
    const xAxis = d3.axisBottom(x);

    const gy = d3.select('.chart').append('g').attr('transform', `translate(0,0)`);
    const yAxis = d3.axisLeft(y);

    d3.select('.chart').attr('width', width + 50).attr('height', height + 50)
      .selectAll('rect').data(data)
      .enter().append('rect')
      .attrs({ x: (d, i) => x(i), y: d => y(d), width: barWidth, height: d => height - y(d) })
      .style('fill', 'green');

    d3.select('.chart').selectAll('text').data(data)
      .enter().append('text')
      .attrs({ x: (d, i) => x(i) + 10, y: d => y(d) })
      .text(d => d)
      
    gx.call(xAxis);
    gy.call(yAxis);

  }
  render() {
    return (
      <svg className='chart' style={{ margin: 50, padding: 20 }}></svg>
    )
  }
}

export default Bar;
