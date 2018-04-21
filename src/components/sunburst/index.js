import * as React from 'react';
import * as d3 from 'd3';
import * as nodeData from './data.json';
import 'd3-selection-multi';

class SunBurst extends React.Component {
  componentDidMount() {
    const width = 500;
    const height = 500;
    const radius = Math.min(width, height) / 2;
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const g = d3.select('svg')
      .attrs({ width, height })
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const partition = d3.partition()
      .size([2 * Math.PI, radius]);
    
    const root = d3.hierarchy(nodeData)
      .sum(d => d.size);
    
    partition(root);
    const arc = d3.arc()
      .startAngle(d => d.x0)
      .endAngle(d => d.x1)
      .innerRadius(d => d.y0)
      .outerRadius(d => d.y1);

    g.selectAll('g')
      .data(root.descendants())
      .enter().append('g').attr('class', 'node').append('path')
      .attr('display', d => d.depth ? null : 'none')
      .attr('d', arc)
      .style('stroke', '#fff')
      .style('fill', d => color((d.children ? d : d.parent).data.name))

    g.selectAll('.node')
      .append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})rotate(${this.computeTextRotation(d)})`)
      .attr('dx', '-20')
      .attr('dy', '.5em')
      .text(d => d.parent ? d.data.name : '');
  }
  computeTextRotation = (d) => {
    const angle = (d.x0 + d.x1) / Math.PI * 90;
    return (angle < 120 || angle > 270) ? angle : angle + 180;
  }
  render() {
    return (
      <svg></svg>
    )
  }
}

export default SunBurst;
