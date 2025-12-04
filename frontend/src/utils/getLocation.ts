export const handleGetLocation = (
  event: React.MouseEvent<HTMLButtonElement>, 
  setNearestCity: React.Dispatch<React.SetStateAction<string>>
) => {
  event.preventDefault()
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchNearestCity(setNearestCity, latitude, longitude);
      },
      (error) => {
        console.error('Error getting location:', error);
        alert('Could not get your location. Please check geolocation permissions.');
      }
    );
  } else {
    console.error('Geolocation is not supported by this browser.');
    alert('Your browser does not support geolocation.');
  }
};

const fetchNearestCity = async (setNearestCity: React.Dispatch<React.SetStateAction<string>>, latitude: number, longitude: number) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
      {
        headers: {
          'Accept-Language': 'es'
        }
      }
    );
    
    if (!response.ok) {
      throw new Error('Error in API response');
    }
    
    const data = await response.json();
    
    const city = data.address.city || 
                 data.address.town || 
                 data.address.village || 
                 data.address.municipality || 
                 data.address.county ||
                 data.address.state;
    
    if (city) {
      setNearestCity(city);
      console.log('City found:', city);
    } else {
      console.error('Could not determine city', data.address);
      alert('Could not determine the city from your location.');
    }
  } catch (error) {
    console.error('Error fetching nearest city:', error);
    alert('Error getting city. Please try again.');
  }
};