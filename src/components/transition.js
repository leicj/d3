import * as React from 'react';
import * as d3 from 'd3';
import 'd3-selection-multi';

class Transition extends React.Component {
  componentDidMount() {
    const width = 960;
    const height = 500;
    const x = d3.scalePoint()
      .domain([0, 1, 2])
      .range([height / 4, width - height / 4]);

    const svg = d3.select('svg');
    let circle = svg.selectAll('circle')
      .data([0, 1])
      .enter().append('circle')
      .attrs({
        r: height / 4,
        cx: x,
        cy: height / 2
      });

    setTimeout(() => {
      circle = circle.data([1, 2], d => d);
      circle.transition().duration(750)
        .attr('r', height / 3)
        .style('fill', 'orange');
      
      circle.enter().append('circle')
        .attrs({
          r: height / 4,
          cx: x,
          cy: height / 2
        })
        .style('fill', 'green');

      circle.exit().transition()
        .attrs({
          r: 1e-6,
          fill: 'red'
        })
        .remove();
    }, 1000)
  }
  render() {
    return (
      <svg width="960" height="500"></svg>
    )
  }
}

export default Transition;
