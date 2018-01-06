import * as React from 'react';
import * as d3 from 'd3';

class Ease extends React.Component {
  componentDidMount() {
    const easing = [
      'easeLinear', 'easePolyIn', 'easePolyOut', 'easePoly', 'easePolyInOut',
      'easeQuadIn', 'easeQuadOut', 'easeQuad', 'easeQuadInOut', 'easeCubicIn',
      'easeCubicOut', 'easeCubic', 'easeCubicInOut', 'easeSinIn', 'easeSinOut',
      'easeSin', 'easeSinInOut', 'easeExpIn', 'easeExpOut', 'easeExp',
      'easeExpInOut', 'easeCircleIn', 'easeCircleOut', 'easeCircle', 'easeCircleInOut',
      'easeElasticIn', 'easeElastic', 'easeElasticOut', 'easeElasticInOut', 'easeBackIn',
      'easeBackOut', 'easeBack', 'easeBackInOut', 'easeBounceIn', 'easeBounce',
      'easeBounceOut', 'easeBounceInOut'
    ];
    const svg = d3.select('svg').attr('width', 960).attr('height', 1000);

    const circleTransition = (easement, yPos) => {
      const timeCircle = svg.append('circle')
        .attr('fill', 'steelblue')
        .attr('r', 10);
      const repeat = () => {
        timeCircle
          .attr('cx', 210)
          .attr('cy', (yPos * 25) + 25)
          .transition()
          .ease(easement)
          .duration(4000)
          .attr('cx', 720)
          .transition()
          .ease(easement)
          .duration(4000)
          .attr('cx', 210)
          .on('end', repeat);
      }
      repeat();

      const easeType = svg.append('text')
        .attr('dy', '.35em')
        .attr('x', 475)
        .attr('text-anchor', 'middle')
        .attr('y', (yPos * 25) + 25)
        .text(easing[yPos]);
    }

    easing.forEach((_e, i) => circleTransition(d3[_e], i))
  }
  render() {
    return (
      <svg></svg>
    )
  }
}

export default Ease;
