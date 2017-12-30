import * as React from 'react';
import * as d3 from 'd3';

/**
 * click you key and jump
 */
class KeyJump extends React.Component {
  state = {
    alphabet: 'abcdefghijklmnopqrstuvwxyz'.split(''),
  }
  componentDidMount() {
    document.addEventListener('keydown', this.keyDown);

    const alphabet = this.state.alphabet;
    const svg = d3.select('svg');
    const width = +svg.attr('width');
    const height = +svg.attr('height');
    const g = svg.append('g').attr('transform', `translate(32,${height / 2})`);
    const text = g.selectAll('text').data(alphabet, d => d);

    text.enter().append('text')
      .attr('fill', 'green').attr('dy', '.35em')
      .style('font', 'bold 48px monospace')
      .attr('y', 0)
      .attr('x', (d, i) => i * 32)
      .text(d => d)
      .attr('class', d => `key-${d}`)
  }
  keyDown = (e) => {
    const alphabet = this.state.alphabet;
    const key = alphabet[e.keyCode - 65];
    const t = d3.transition().duration(2000);
    d3.select(`.key-${key}`)
      .transition(t)
      .attr('y', -250)
      .style('fill-opacity', 1e-6)
      .transition(t)
      .attr('y', 0)
      .style('fill-opacity', 1);
  }
  render() {
    return (
      <svg width='960' height='500'>
      </svg>
    )
  }
}

export default KeyJump;
