export async function getLatLngFromAddress(address) {
    const apiKey = "AIzaSyAex0X-3flp-W8kDT4WQ0qvSjCBphoTwbs";
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.status === "OK") {
      const location = data.results[0].geometry.location;
      return { lat: location.lat, lng: location.lng };
    } else {
      throw new Error("No se pudo obtener la ubicación");
    }
  }