import * as React from 'react';
import * as d3 from 'd3';
import 'd3-selection-multi';

class Grid extends React.Component {
  componentDidMount() {
    const gridData = () => {
      const data = [];
      let xpos = 1;
      let ypos = 1;
      const width = 50;
      const height = 50;
      for (let row = 0; row < 10; row++) {
        data.push([]);
        for (let column = 0; column < 10; column++) {
          data[row].push({
            x: xpos,
            y: ypos,
            width: width,
            height: height
          });
          xpos += width;
        }
        xpos = 1;
        ypos += height;
      }

      return data;
    }

    const data = gridData();
    const svg = d3.select('svg').attr('width', 960).attr('height', 960);
    const row = svg.selectAll('.row').data(data)
      .enter().append('g')
      .attr('class', 'row');

    const column = row.selectAll('.square').data(d => d)
      .enter().append('rect')
      .attrs({ class: 'square', x: d => d.x, y: d => d.y, width: d => d.width, height: d => d.height })
      .styles({fill: () => {
        const _random = Math.floor(Math.random() * 100);
        return ['#fff', '#2C93E8', '#F56C4E', '#838690'][ _random % 4]
      }, stroke: '#222' });

    column.on('click', function (d) {
      d.click = d.click || 0;
      d.click++;
      if (d.click % 4 === 0) d3.select(this).style('fill', '#fff');
      else if (d.click % 4 === 1) d3.select(this).style('fill', '#2C93E8');
      else if (d.click % 4 === 2) d3.select(this).style('fill', '#F56C4E');
      else if (d.click % 4 === 3) d3.select(this).style('fill', '#838690');
    });
  }
  render() {
    return (
      <svg></svg>
    )
  }
}

export default Grid;
