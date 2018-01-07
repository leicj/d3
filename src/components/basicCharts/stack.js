import * as React from 'react';
import * as d3 from 'd3';

class BasicStack extends React.Component {
  componentDidMount() {
    const width = 960;
    const height = 500;
    const margin = {top: 20, right: 20, bottom: 30, left: 50};
    const data = [];

    const t = Date.parse(new Date('2000-1-1'));
    const keys = ['Google Chrome', 'Internet Explorer', 'Firefox',
      'Safari', 'Microsoft Edge', 'Opera', 'Mozilla', 'Other/Unknown'];
    const dates = [];
    for (let i = 0; i < 100; i++) {
      dates.push(new Date(t + i * 1000 * 3600 * 24));
      const key1 = 48 + Math.random() * 2;
      const key2 = 23 + Math.random() * 2;
      const key3 = 18 + Math.random();
      const key4 = 5 + Math.random();
      const key5 = 0.03 + Math.random() / 100;
      const key6 = 1.3 + Math.random() / 10;
      const key7 = 0.11 + Math.random() /100;
      const key8 = 100 - key1 - key2 - key3 - key4 - key5 - key6 - key7;
      data.push([key1, key2, key3, key4, key5, key6, key7, key8]);
    }

    const svg = d3.select('svg').attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);
    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);
    const x = d3.scaleTime().domain(d3.extent(dates)).range([0, width]);
    const y = d3.scaleLinear().domain([0, 100]).range([height, 0]);
    const color = d3.scaleOrdinal(d3.schemeCategory10).domain(keys);

    const area = d3.area()
      .x((d, i) => x(dates[i]))
      .y0(d => y(d[0]))
      .y1(d => y(d[1]));
    
    const stack = d3.stack().keys(d3.range(keys.length))
    const layer = g.selectAll('.layer')
      .data(stack(data))
      .enter().append('g')
      .attr('class', 'layer');
    layer.append('path')
      .attr('class', 'area')
      .style('fill', (d, i) => color(keys[i]))
      .attr('d', area);
    layer.append('text')
      .attr('x', width - 6)
      .attr('y', d => y((d[d.length - 1][0] + d[d.length - 1][1]) / 2))
      .attr('dy', '.35em')
      .style('font', '10px sans-serif')
      .style('text-anchor', 'end')
      .text((d, i) => keys[i]);

    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));
    g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y));

  }
  render() {
    return (
      <svg></svg>
    )
  }
}

export default BasicStack;
