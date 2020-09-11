import React from 'react';
import * as d3 from 'd3';

const MedianLine = ({
  data,
  x,
  y,
  width,
  height,
  bottomMargin,
  median,
  value
}) => {
  /**
   * Use d3 linear scale to map out the data's vertical positioning
   * translate to pixels less bottom margin
   */
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, value)])
    .range([height - y - bottomMargin, 0]);

  /**
   * Use d3 line generator to draw a straight line
   */
  const line = d3.line()([
    [0, 5],
    [width, 5]
  ]);

  const medianValue = median || d3.median(data, value);

  /**
   * Move the line vertically base on the medianValue
   * Use tickFormat to format the median value
   */
  const translate = `translate(${x}, ${yScale(medianValue)})`,
    medianLabel = `Median Household: $${yScale.tickFormat()(median)}`;

  return (
    <g className='mean' transform={translate}>
      <text
        x={width - 5}
        y='0'
        textAnchor='end'
        style={{ background: 'purple' }}
      >
        {medianLabel}
      </text>
      <path d={line} />
    </g>
  );
};

export default MedianLine;
