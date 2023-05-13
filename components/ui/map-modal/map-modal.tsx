import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import MapBox, { Marker } from 'react-map-gl';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import {
  CoordinatesText,
  MapModalButtonsContainer,
  MapModalContainer,
  StyledMapModal,
} from '@/styles/components/map-modal.styled';
import PrimaryButton from '../primary-button/primary-button';
import SecondaryButton from '../secondary-button/secondary-button';
import { toast } from 'react-toastify';

const mapModalVariants: Variants = {
  initialContainer: {
    background: 'rgba(0,0,0,0)',
  },
  animationContainer: {
    background: 'rgba(0,0,0,0.8)',
  },
  initialMapModal: {
    top: '-100vh',
    // scale: 0,
    transition: { type: 'spring', stiffness: 200, damping: 30 },
  },
  animationMapModal: {
    top: '0',
    // scale: 1,

    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 13,
    },
  },
};

interface MapModalProps {
  show: boolean;
  onClose: Function;
  stableCoordinates?: boolean;
  initialCoordinates?: { lat: number; lng: number };
  onAddCoordinates?: Function;
}

const MapModal = ({
  show,
  onAddCoordinates,
  onClose,
  stableCoordinates,
  initialCoordinates,
}: MapModalProps) => {
  const [mounted, setMounted] = useState(false);
  const [coordinates, setCoordinates] = useState({
    lng: initialCoordinates?.lng || 52.65785405322845,
    lat: initialCoordinates?.lat || 36.71204604981793,
  });

  useEffect(() => {
    if (!initialCoordinates || !initialCoordinates.lat) return;
    setCoordinates({
      lng: initialCoordinates?.lng,
      lat: initialCoordinates?.lat,
    });
  }, [initialCoordinates?.lat, initialCoordinates?.lng]);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (!document.getElementById('mapModal')) {
      const mapModalDiv = document.createElement('div');
      mapModalDiv.setAttribute('id', 'mapModal');
      mapModalDiv.style.position = 'fixed';
      mapModalDiv.style.top = '0';
      mapModalDiv.style.right = '0';
      mapModalDiv.style.width = '100%';
      mapModalDiv.style.zIndex = '4';

      document.body.appendChild(mapModalDiv);
    }
  }, []);

  const onMarker = (e: mapboxgl.MapLayerMouseEvent) => {
    e.originalEvent.stopPropagation();

    if (stableCoordinates) return;

    const coordinates = {
      lng: e.lngLat.lng,
      lat: e.lngLat.lat,
    };
    setCoordinates(coordinates);
  };

  const onAddLocation: React.MouseEventHandler<HTMLDivElement> = () => {
    onAddCoordinates && onAddCoordinates(coordinates);
    toast(<p>موقعیت ذخیره شد!</p>, { type: 'success' });
    onClose();
  };

  const onCloseModal: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    onClose();
  };

  let content = (
    <AnimatePresence>
      {show && (
        <MapModalContainer
          as={motion.div}
          variants={mapModalVariants}
          initial="initialContainer"
          animate="animationContainer"
          exit="initialContainer"
          layout
          key="map-modal"
          onClick={onCloseModal}
        >
          <StyledMapModal
            variants={mapModalVariants}
            initial="initialMapModal"
            animate="animationMapModal"
            exit="initialMapModal"
            onClick={(e) => e.stopPropagation()}
          >
            <CoordinatesText>
              <motion.span>
                <strong>Latitude:</strong> {coordinates?.lat}
              </motion.span>
              <motion.span>
                <strong>Longitude:</strong> {coordinates?.lng}
              </motion.span>
            </CoordinatesText>
            <MapBox
              onClick={onMarker}
              mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
              initialViewState={{
                longitude: initialCoordinates?.lng || 52.65785405322845,
                latitude: initialCoordinates?.lat || 36.71204604981793,
                zoom: 14,
              }}
              style={{
                width: '100% !important',
                height: '400px',
                borderRadius: '0.8rem',
              }}
              mapStyle="mapbox://styles/mapbox/streets-v9"
              children={
                <Marker
                  longitude={coordinates?.lng}
                  latitude={coordinates?.lat}
                  color="red"
                />
              }
            />
            <MapModalButtonsContainer>
              <PrimaryButton text="ذخیره" onClick={onAddLocation} />
              <SecondaryButton text="لغو" onClick={onCloseModal} />
            </MapModalButtonsContainer>
          </StyledMapModal>
        </MapModalContainer>
      )}
    </AnimatePresence>
  );

  return mounted
    ? ReactDOM.createPortal(content, document?.getElementById('mapModal')!)
    : null;
};

export default MapModal;
