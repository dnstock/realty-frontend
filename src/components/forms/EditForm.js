import { useFormik } from 'formik';
import { TextField, Box, Button, DialogActions } from '@mui/material';
import * as Yup from 'yup';
import { titleCase as titleCaseUtil } from 'utils';

// Reusable EditForm Component
const EditForm = ({ initialValues, onSubmit }) => {
  const titleCase = (str) => titleCaseUtil(str, '_');

  // Dynamic Yup validation schema based on formik values
  const validationSchema = Yup.object().shape(
    Object.keys(initialValues).reduce((shape, key) => {
      shape[key] =
        typeof initialValues[key] === 'number'
          ? Yup.number().required(`${titleCase(key)} is required`).min(0, `${titleCase(key)} must be a positive number`)
          : Yup.string().required(`${titleCase(key)} is required`);
      return shape;
    }, {})
  );

  // Using the useFormik hook for handling form state
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: '100%',
          paddingTop: 1,
        }}
      >
        {Object.keys(formik.values).map((key) => {
          // Skip rendering the "id" field as an editable field
          if (key === 'id') return null;

          const value = formik.values[key];
          const isObject = typeof value === 'object' && value !== null;

          return (
            <TextField
              key={key}
              label={titleCase(key) + (isObject ? ' Details (read-only)' : '')}
              name={key}
              type={!isObject ? (typeof value === 'number' ? 'number' : 'text') : 'text'}
              value={isObject ? JSON.stringify(value, null, 2) : value}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={isObject} // Disable field if value is an object
              error={formik.touched[key] && !!formik.errors[key]}
              helperText={formik.touched[key] && formik.errors[key]}
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
    </form>
  );
};

export default EditForm;
