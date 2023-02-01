import { theme } from '@/utils/theme.styled';
import { Coordinates } from '@/utils/types/map/map.types';
import { motion } from 'framer-motion';
import React, { CSSProperties, FC, useEffect, useMemo, useState } from 'react';
import MapBox, { Marker } from 'react-map-gl';
import styled from 'styled-components';

interface MapProps {
  stableMarker?: boolean;
  initialCoordinates?: Coordinates;
  style?: CSSProperties;
  zoom?: number;
  onAddCoordinates?: Function;
}

const Map: FC<MapProps> = ({
  style,
  stableMarker,
  initialCoordinates,
  zoom,
  onAddCoordinates,
}) => {
  const [coordinates, setCoordinates] = useState(
    initialCoordinates || {
      lng: 52.65785405322845,
      lat: 36.71204604981793,
    }
  );

  const markerHandler = (e: mapboxgl.MapLayerMouseEvent) => {
    const newCoordinates: Coordinates = {
      lng: e.lngLat.lng,
      lat: e.lngLat.lat,
    };

    setCoordinates(newCoordinates);

    // onAddCoordinates && onAddCoordinates(newCoordinates);
  };

  if (!coordinates?.lng) {
    return <></>;
  }

  useEffect(() => {
    onAddCoordinates && onAddCoordinates(coordinates);
  }, [coordinates]);

  return (
    <StyledMap>
      <StyledMapSidebar>
        <strong>Latitude:</strong> {coordinates?.lat} |{' '}
        <strong>Longitude:</strong> {coordinates?.lng}
      </StyledMapSidebar>
      <MapBox
        onClick={stableMarker ? undefined : markerHandler}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        initialViewState={{
          longitude: coordinates?.lng,
          latitude: coordinates?.lat,
          zoom: zoom || 15,
        }}
        style={
          style
            ? { ...style, borderRadius: '0.8rem' }
            : {
                width: '100%',
                height: '400px',
                borderRadius: '0.8rem',
              }
        }
        mapStyle="mapbox://styles/mapbox/streets-v9"
        // zoom={zoom || 15}
        children={
          <Marker
            // style={!initialCoordinates?.lng ? { opacity: 0.4 } : { opacity: 1 }}
            longitude={coordinates?.lng}
            latitude={coordinates?.lat}
            color="red"
          />
        }
      />
    </StyledMap>
  );
};

const StyledMap = styled.div`
  position: relative;
`;

const StyledMapSidebar = styled(motion.span)`
  padding: 0.5rem 1rem;
  background-color: #0000005e;
  border-radius: 0.4rem;
  color: #fff;
  font-size: 0.5rem;
  z-index: 1;
  letter-spacing: 1px;
  position: absolute;
  top: 0.5rem;
  left: 0.2rem;
  max-width: 90%;
  direction: ltr;

  @media (min-width: ${theme.breakpoints.md}) {
    font-size: 0.8rem;
  }
`;

export default Map;
