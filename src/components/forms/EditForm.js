import { Formik, Form, Field } from 'formik';
import { TextField, Box, Button, DialogActions } from '@mui/material';
import * as Yup from 'yup';
import { titleCase } from 'utils';

// Reusable EditForm Component
const EditForm = ({ initialValues, onSubmit }) => {
  // Dynamic Yup validation schema based on initial values
  const validationSchema = Yup.object().shape(
    Object.keys(initialValues).reduce((shape, key) => {
      shape[key] =
        typeof initialValues[key] === 'number'
          ? Yup.number().required(`${titleCase(key)} is required`).min(0, `${titleCase(key)} must be a positive number`)
          : Yup.string().required(`${titleCase(key)} is required`);
      return shape;
    }, {})
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: '100%',
              paddingTop: 1,
            }}
          >
            {Object.keys(initialValues).map((key) => {
              // Skip rendering the "id" field as an editable field
              if (key === 'id') return null;

              const value = initialValues[key];
              const isObject = typeof value === 'object' && value !== null;

              return (
                <Field
                  key={key}
                  as={TextField}
                  label={titleCase(key) + (isObject ? ' Details (read-only)' : '')}
                  name={key}
                  type={!isObject ? (typeof value === 'number' ? 'number' : 'text') : 'text'}
                  value={isObject ? JSON.stringify(value, null, 2) : value}
                  disabled={isObject} // Disable field if value is an object
                  error={touched[key] && !!errors[key]}
                  helperText={touched[key] && errors[key]}
                  fullWidth
                  multiline={isObject} // Make multiline if it's an object
                  minRows={isObject ? 3 : 1} // Set minimum rows if it's an object
                />
              );
            })}
          </Box>
          <DialogActions>
            <Button type="submit">Save</Button>
          </DialogActions>
        </Form>
      )}
    </Formik>
  );
};

export default EditForm;
