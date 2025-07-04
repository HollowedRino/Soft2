import React, { useEffect, useState } from 'react';
import MapComponent from '../components/MapComponent'
import { getLatLngFromAddress } from '../services/geocodeService';
import { getAllBoticas } from '../services/boticaService';


export const MapPage = () => {
  const [boticaMarkers, setBoticaMarkers] = useState([]);
  const [searchAddress, setSearchAddress] = useState('');
  const [searchCoords, setSearchCoords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);
  
  useEffect(() => {
    const fetchMarkers = async () => {
      const boticas = await getAllBoticas();
      const markers = [];
      for (const botica of boticas) {
        try {
          const coords = await getLatLngFromAddress(botica.direccion);
          markers.push({ ...coords, nombre: botica.nombre });
        } catch (e) {
          // Si falla una, la omite
        }
      }
      setBoticaMarkers(markers);
    };
    fetchMarkers();
  }, []);

  // Buscar dirección personalizada
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSearchError(null);
    try {
      const coords = await getLatLngFromAddress(searchAddress);
      setSearchCoords(coords);
    } catch {
      setSearchError('No se pudo encontrar la dirección.');
      setSearchCoords(null);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col py-5 px-5 sm:px-10">
        <h1 className="text-2xl font-bold mb-3 text-left">Mapa de Boticas</h1>
      <div className="w-full bg-green-100 min-h-150 rounded-3xl flex flex-col">
        <div className="w-full p-6 sm:px-10 flex-1 flex flex-col">
          {/* Formulario de búsqueda */}
          <form onSubmit={handleSearch} className="mb-4 flex gap-2">
            <input
              type="text"
              value={searchAddress}
              onChange={e => setSearchAddress(e.target.value)}
              placeholder="Ingrese una dirección"
              className="px-2 py-1 text-sm rounded-l-full outline-none flex-1"
            />
            <button
              type="submit"
              className="bg-black text-white px-4 py-1 text-sm rounded-full"
              disabled={loading}
            >
              Buscar
            </button>
            {searchCoords && (
              <button
                className="mb-2 bg-gray-300 px-3 py-1 rounded-full"
                onClick={() => setSearchCoords(null)}
              >
                Ver todas las boticas
              </button>
            )}
          </form>
          {searchError && <p className="text-red-500">{searchError}</p>}
          {/* Mapa */}
          <MapComponent
            markers={searchCoords ? [searchCoords] : boticaMarkers}
            lat={-12.0464}
            lng={-77.0428}
          />
        </div>
      </div>
    </div>
  )
}
