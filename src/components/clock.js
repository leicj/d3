import * as React from 'react';
import * as d3 from 'd3';

class Clock extends React.Component {
  componentDidMount() {
    const width = 500;
    const height = 500;
    
    const scaleSecs = d3.scaleLinear().domain([0, 59 + 999 / 1000]).range([0, 2 * Math.PI]);
    const scaleMins = d3.scaleLinear().domain([0, 59 + 59 / 60]).range([0, 2 * Math.PI]);
    const scaleHours = d3.scaleLinear().domain([0, 11 + 59 / 60]).range([0, 2 * Math.PI]);

    const svg = d3.select('svg').attr('width', width).attr('height', height);

    const clock = svg.append('g').attr('transform', `translate(${width / 2},${height / 2})`);

    clock.append('circle')
      .attr('r', 80)
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('stroke-width', 2);

    clock.append('circle')
      .attr('r', 4)
      .attr('fill', 'black')

    const date = () => {
      const time = new Date();
      return [time.getSeconds(), time.getMinutes(), time.getHours() + time.getMinutes() / 60];
    }

    const update = (sec, min, hour) => {
      clock.selectAll('.clockhand').remove();
      const secondArc = d3.arc().innerRadius(0).outerRadius(70)
        .startAngle(d => scaleSecs(d))
        .endAngle(d => scaleSecs(d))
      const minuteArc = d3.arc().innerRadius(0).outerRadius(70)
        .startAngle(d => scaleMins(d))
        .endAngle(d => scaleMins(d))
      const hourArc = d3.arc().innerRadius(0).outerRadius(50)
        .startAngle(d => scaleHours(d))
        .endAngle(d => scaleHours(d))

      clock.selectAll('.clockhand').data([sec, min, hour])
        .enter().append('path')
        .attr('d', (d, i) => {
          if (i === 0) {
            return secondArc(d);
          } else if (i === 1) {
            return minuteArc(d);
          } else if (i === 2) {
            return hourArc(d);
          }
        })
        .attr('class', 'clockhand')
        .attr('stroke', 'black')
        .attr('stroke-width', (d, i) => {
          if (i === 0) {
            return 2;
          } else if (i === 1) {
            return 3;
          } else if (i === 2) {
            return 3;
          }
        })
        .attr('fill', 'none');
    }

    const [sec, min, hour] = date();
    update(sec, min, hour);

    setInterval(() => {
      const [sec, min, hour] = date();
      update(sec, min, hour);
    }, 1000)

  }
  render() {
    return (
      <svg></svg>
    )
  }
}

export default Clock;
