import * as React from 'react';
import * as d3 from 'd3';

import './index.css'

class BasicPieChart extends React.Component {
  componentDidMount() {
    const width = 960;
    const height = 500;
    const margin = {top: 20, right: 20, bottom: 40, left: 40};
    const radius = Math.min(width, height) / 2;
    const names = ["Lorem ipsum", "dolor sit", "amet", "consectetur", "adipisicing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt"];
    const values = [];
    names.forEach(() => {
      values.push(Math.floor(Math.random() * 10));
    });

    const svg = d3.select('svg').attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom);
    const g = svg.append('g').attr('transform', `translate(${width / 2},${height / 2})`);
    const color = d3.scaleOrdinal().domain(names).range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    const arc = d3.arc().innerRadius(radius * 0.4 ).outerRadius(radius * 0.8)
      .startAngle(d => d.startAngle)
      .endAngle(d => d.endAngle);
    const outerArc = d3.arc().innerRadius(radius * 0.9).outerRadius(radius * 0.9 );
    const pie = d3.pie().sort(null).value(d => d);

    g.append('g').selectAll('path').data(pie(values))
      .enter().append('path')
      .attr('d', arc)
      .style('fill', (d, i) => color(names[i]));

    const midAngle = (d) => d.startAngle + (d.endAngle - d.startAngle) / 2;
    g.append('g').selectAll('polyline').data(pie(values))
      .enter().append('polyline')
      .attr('points', d => {
        const pos = outerArc.centroid(d);
        pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
        return [arc.centroid(d), outerArc.centroid(d), pos];
      });

    g.append('g').selectAll('text').data(pie(values))
      .enter().append('text')
      .attr('x', d => {
        if (midAngle(d) < Math.PI) {
          return radius * 0.95 + 10;
        }
        return radius * 0.95 * -1 - 60;
      })
      .attr('y', d => outerArc.centroid(d)[1])
      .text((d, i) => names[i])

  }
  render() {
    return (
      <svg></svg>
    )
  }
}

export default BasicPieChart;
