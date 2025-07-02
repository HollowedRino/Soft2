// components/MapComponent.jsx
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
  borderRadius: '24px'
};

const center = {
  lat: -12.0464,
  lng: -77.0428
};

const MapComponent = () => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyAex0X-3flp-W8kDT4WQ0qvSjCBphoTwbs">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;