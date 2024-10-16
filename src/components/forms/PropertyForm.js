import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { TextField, MenuItem, Stack, Box } from '@mui/material';
import * as Yup from 'yup';
import {
  PaddedButton,
  TitleBreadcrumbLink,
  SecondaryButton,
  StyledGridContainer,
  CardBox,
  HeaderBox,
  FieldWrapper,
  FieldRowWrapper
} from 'theme';

// Form validation schema using Yup
const PropertySchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  address: Yup.string().required('Address is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string()
    .required('State is required')
    .max(2, 'State should be abbreviated (e.g., NY)'),
  zip: Yup.string()
    .required('Zip is required')
    .matches(/^\d{5}$/, 'Zip code must be exactly 5 digits'),
  unit_count: Yup.number()
    .min(1, 'Must have at least 1 unit')
    .required('Required'),
  type: Yup.string().required('Property type is required'),
});

const PropertyForm = ({ title, initialValues, onSubmit, serverErrors }) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema: PropertySchema,
    onSubmit,
  });

  const { errors, touched, handleChange, handleSubmit, isSubmitting, values } = formik;

  return (
    <form onSubmit={handleSubmit}>
      <StyledGridContainer>
        <CardBox>
          <HeaderBox>
            <h2><TitleBreadcrumbLink onClick={() => navigate('/properties')}>Properties</TitleBreadcrumbLink>{title}</h2>
          </HeaderBox>

          <FieldWrapper>
            <TextField
              fullWidth
              name="name"
              label="Property Name"
              value={values.name}
              onChange={handleChange}
              error={Boolean(errors.name && touched.name) || Boolean(serverErrors.name)}
              helperText={errors.name && touched.name ? errors.name : serverErrors.name}
            />
          </FieldWrapper>

          <FieldWrapper>
            <TextField
              fullWidth
              name="address"
              label="Address"
              value={values.address}
              onChange={handleChange}
              error={Boolean(errors.address && touched.address) || Boolean(serverErrors.address)}
              helperText={errors.address && touched.address ? errors.address : serverErrors.address}
            />
          </FieldWrapper>

          <FieldRowWrapper>
            <FieldWrapper flex={2}>
              <TextField
                fullWidth
                name="city"
                label="City"
                value={values.city}
                onChange={handleChange}
                error={Boolean(errors.city && touched.city) || Boolean(serverErrors.city)}
                helperText={errors.city && touched.city ? errors.city : serverErrors.city}
              />
            </FieldWrapper>

            <FieldWrapper>
              <TextField
                fullWidth
                name="state"
                label="State"
                value={values.state}
                onChange={handleChange}
                error={Boolean(errors.state && touched.state) || Boolean(serverErrors.state)}
                helperText={errors.state && touched.state ? errors.state : serverErrors.state}
              />
            </FieldWrapper>

            <FieldWrapper>
              <TextField
                fullWidth
                name="zip"
                label="Zip"
                value={values.zip}
                onChange={handleChange}
                error={Boolean(errors.zip && touched.zip) || Boolean(serverErrors.zip)}
                helperText={errors.zip && touched.zip ? errors.zip : serverErrors.zip}
              />
            </FieldWrapper>
          </FieldRowWrapper>

          <FieldWrapper>
            <TextField
              fullWidth
              name="unit_count"
              label="Number of Units"
              type="number"
              value={values.unit_count}
              onChange={handleChange}
              error={Boolean(errors.unit_count && touched.unit_count) || Boolean(serverErrors.unit_count)}
              helperText={errors.unit_count && touched.unit_count ? errors.unit_count : serverErrors.unit_count}
            />
          </FieldWrapper>

          <FieldWrapper>
            <TextField
              fullWidth
              name="type"
              label="Property Type"
              value={values.type}
              onChange={handleChange}
              select
              error={Boolean(errors.type && touched.type) || Boolean(serverErrors.type)}
              helperText={errors.type && touched.type ? errors.type : serverErrors.type}
            >
              <MenuItem value="Residential">Residential</MenuItem>
              <MenuItem value="Commercial">Commercial</MenuItem>
            </TextField>
          </FieldWrapper>

          {/* Display server error for the entire form */}
          {serverErrors.general && (
            <Box sx={{ color: 'red', marginTop: '10px' }}>{serverErrors.general}</Box>
          )}

          <Stack direction="row" spacing={2} mt={2}>
            <PaddedButton type="submit" variant="contained" color="primary" disabled={isSubmitting}>
              Submit
            </PaddedButton>
            <SecondaryButton
              variant="outlined"
              color="secondary"
              onClick={() => navigate('/properties')}
            >
              Cancel
            </SecondaryButton>
          </Stack>
        </CardBox>
      </StyledGridContainer>
    </form>
  );
};

export default PropertyForm;
