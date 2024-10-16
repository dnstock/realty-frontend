
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiService } from 'services';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const data = await apiService.get(`/properties/${id}`);
        setProperty(data);
      } catch (error) {
        console.error('Error fetching property details:', error);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{property.name}</h1>
      <p>Address: {property.address}</p>
      <p>City: {property.city}</p>
      <p>State: {property.state}</p>
      <p>Zip: {property.zip_code}</p>
      <p>Type: {property.type}</p>
    </div>
  );
};

export default PropertyDetails;
