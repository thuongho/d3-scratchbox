import React from 'react';
import * as d3 from 'd3';
// Topojson-client translate geo datasets into GeoJSON
import * as topojson from 'topojson-client';
import _ from 'lodash';
import useProjection from '../hooks/use-projection';
import useQuantize from '../hooks/use-quantize';

import County from './County';

const CountyMap = ({
  usTopoJSON,
  USStateNames,
  values,
  x,
  y,
  width,
  height,
  zoom
}) => {
  // geoPath takes a projection and generates the d attribute of <path> elements in SVG
  const geoPath = useProjection({
    width,
    height,
    zoom,
    usTopoJSON,
    USStateNames
  });
  // use quantize to pick color from a choropleth colors array
  const quantize = useQuantize({ values });

  // TopoJSON is a geographical data format based on JSON
  if (!usTopoJSON) return null;

  const us = usTopoJSON,
    // borders
    USStatesMesh = topojson.mesh(us, us.objects.states, (a, b) => a !== b),
    // flat areas
    counties = topojson.feature(us, us.objects.counties).features;

  // optimize by building a map beforehand
  const countyValueMap = _.fromPairs(values.map((d) => [d.countyID, d.value]));

  return (
    <g>
      {counties.map((feature) => (
        <County
          geoPath={geoPath}
          feature={feature}
          zoom={zoom}
          key={feature.id}
          quantize={quantize}
          value={countyValueMap[feature.id]}
        />
      ))}
      <path
        d={geoPath(USStatesMesh)}
        style={{
          fill: 'none',
          stroke: '#fff',
          strokeLinejoin: 'round'
        }}
      />
    </g>
  );
};

export default CountyMap;
