import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PropertyForm } from 'components';
import { apiService } from 'services';

const EditProperty = () => {
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await apiService.get(`/properties/${id}`);
        setInitialValues(response.data);
      } catch (error) {
        console.error('Error fetching property:', error);
      }
    };

    fetchProperty();
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      await apiService.put(`/properties/${id}`, values);
      navigate('/properties');
    } catch (error) {
      console.error('Error updating property:', error);
    }
  };

  if (!initialValues) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit Property</h1>
      <PropertyForm initialValues={initialValues} onSubmit={handleSubmit} />
    </div>
  );
};

export default EditProperty;
