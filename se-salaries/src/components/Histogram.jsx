import React from 'react';
import * as d3 from 'd3';

const Histogram = ({
  bins,
  width,
  height,
  x,
  y,
  data,
  axisMargin,
  bottomMargin,
  value
}) => {
  // histogram generator
  const histogram = d3.histogram();
  // vertical and horizontal scales
  const widthScale = d3.scaleLinear();
  const yScale = d3.scaleLinear();

  return null;
};

export default Histogram;
