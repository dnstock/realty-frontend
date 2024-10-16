import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PropertyForm } from 'components';
import { apiService } from 'services';

const CreateProperty = () => {
  const navigate = useNavigate();
  const [serverErrors, setServerErrors] = useState({});

  const initialValues = {
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    unit_count: '',
    type: '',
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await apiService.post('/properties', values);
      navigate('/properties');
    } catch (error) {
      console.error('Error creating property:', error);

      if (error.response && error.response.data && error.response.data.detail) {
        const formattedErrors = {};
        error.response.data.detail.forEach((err) => {
          const field = err.loc && err.loc[1];
          if (field) {
            formattedErrors[field] = err.msg;
          }
        });
        setServerErrors(formattedErrors);
      } else {
        setServerErrors({ general: 'An unexpected error occurred. Please try again later.' });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PropertyForm
      title='Create Property'
      initialValues={initialValues}
      onSubmit={handleSubmit}
      serverErrors={serverErrors} // Pass server errors to the form
    />
  );
};

export default CreateProperty;
