import React, { CSSProperties, FC, useEffect, useState } from 'react';
import MapBox, { Marker } from 'react-map-gl';

import { ICoordinates } from '@/utils/types/map/map.types';
import { StyledMap, StyledMapSidebar } from '@/styles/components/map.styled';

interface MapProps {
  stableMarker?: boolean;
  initialCoordinates?: ICoordinates;
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
    const newCoordinates: ICoordinates = {
      lng: e.lngLat.lng,
      lat: e.lngLat.lat,
    };

    setCoordinates(newCoordinates);
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
        children={
          <Marker
            longitude={coordinates?.lng}
            latitude={coordinates?.lat}
            color="red"
          />
        }
      />
    </StyledMap>
  );
};

export default Map;
