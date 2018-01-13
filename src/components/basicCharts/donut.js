import * as React from 'react';
import * as d3 from 'd3';

class BasicDonut extends React.Component {
  componentDidMount() {
    const width = 960;
    const height = 500;
    const margin = {top: 20, right: 20, bottom: 40, left: 40};
    const radius = Math.min(width, height) / 2;
    const data = [2704659, 4499890, 2159981, 3853788, 14106543, 8819342, 612463];
    const keys = ['<5', '5-13', '14-17', '18-24', '25-44', '45-64', '≥65'];

    const svg = d3.select('svg').attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom);
    const g = svg.append('g').attr('transform', `translate(${width / 2},${height / 2})`);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const arc = d3.arc().innerRadius(radius - 10).outerRadius(radius - 70)
      .startAngle(d => d.startAngle)
      .endAngle(d => d.endAngle)
    const pie = d3.pie().sort(null).value(d => d);

    const gArc = g.selectAll('.arc').data(pie(data))
      .enter().append('g')
      .attr('class', 'arc');

    gArc.append('path')
      .attr('d', arc)
      .style('fill', (d, i) => color(i));

    gArc.append('text')
      .attr('transform', (d, i) => {
        const [x, y] = arc.centroid(d);
        return `translate(${x},${y})`
      })
      .style('font', '10px sans-serif')
      .style('text-anchor', 'middle')
      .attr('dy', '.25em')
      .text((d, i) => keys[i]);
  }
  render() {
    return (
      <svg></svg>
    )
  }
}

export default BasicDonut;
