// components/MapComponent.jsx
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import React, { useState } from 'react';

const containerStyle = {
  width: '100%',
  height: '700px',
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
  borderRadius: '24px'
};

const center = {
  lat: -12.0464,
  lng: -77.0428
};

const MapComponent = ({ lat, lng, markers = [] }) => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const center = markers.length > 0
    ? { lat: markers[0].lat, lng: markers[0].lng }
    : { lat: lat, lng: lng };
  return (
    <LoadScript googleMapsApiKey="AIzaSyAex0X-3flp-W8kDT4WQ0qvSjCBphoTwbs">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
      >
        {/* Marcadores de boticas */}
        {markers.map((marker, idx) => (
          <Marker key={idx} position={{ lat: marker.lat, lng: marker.lng }} onClick={() => setSelectedMarker(marker)} />
        ))}
        {selectedMarker && (
          <InfoWindow position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}>
            <div className="bg-white p-1 rounded-lg shadow-md">
              <h3 className="font-semibold">{selectedMarker.nombre}</h3>
            </div>
          </InfoWindow>
        )}
        {/* Marcador único (por búsqueda) */}
        {lat && lng && markers.length === 0 && (
          <Marker position={{ lat, lng }} />
        )}

      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;