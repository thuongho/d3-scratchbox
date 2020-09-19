import React, { useMemo } from 'react';
import * as d3 from 'd3';

const useQuantize = (values) => {
  return useMemo(() => {
    // scaleQuantize is a D3 scale
    // this one splits a domain into 9 quantiles and assigns them specific values from the range
    // use to pick color from an array
    const scale = d3.scaleQuantize().range(d3.range(9));

    if (values) {
      // update scale with new values
      scale.domain([
        // quantile lets us offset the scale to produce more interesting map
        d3.quantile(values, 0.15, (d) => d.value),
        d3.quantile(values, 0.85, (d) => d.value)
      ]);
    }
    return scale;
  }, [values]);
};

export default useQuantize;
