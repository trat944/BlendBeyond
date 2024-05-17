interface UserLocation {
  latitude: number | null;
  longitude: number | null;
}

export const handleGetLocation = (
  setLocation: React.Dispatch<React.SetStateAction<UserLocation>>, 
  setNearestCity: React.Dispatch<React.SetStateAction<string>>
) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation((prevLocation) => ({ ...prevLocation, latitude: latitude ?? null, longitude: longitude ?? null }));
        fetchNearestCity(setNearestCity, latitude, longitude);
      },
      (error) => {
        console.error('Error getting location:', error);
      }
    );
  } else {
    console.error('Geolocation is not supported by this browser.');
  }
};

const fetchNearestCity = async (setNearestCity: React.Dispatch<React.SetStateAction<string>>, latitude: number, longitude: number) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
    );
    const data = await response.json();
    if (data.address.city) setNearestCity(data.address.city)
    else setNearestCity(data.address.town)
  } catch (error) {
    console.error('Error fetching nearest city:', error);
  }
};