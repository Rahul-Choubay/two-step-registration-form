import React from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Grid } from '@material-ui/core';

const schema = Yup.object().shape({
  name: Yup.string().required('Name is required').min(3, 'Name should be at least 3 characters'),
  age: Yup.number().required('Age is required').positive('Age must be a positive number'),
  sex: Yup.string().required('Sex is required').oneOf(['Male', 'Female'], 'Invalid sex'),
  mobile: Yup.string().matches(/^(\+\d{1,2}\s?)?\d{10}$/, 'Invalid mobile number').required('Mobile is required'),
  govtIdType: Yup.string().oneOf(['Aadhar', 'PAN'], 'Invalid government ID type'),
  govtId: Yup.string().when('govtIdType', {
    is: 'Aadhar',
    then: Yup.string().required('Aadhar ID is required').matches(/^\d{12}$/, 'Invalid Aadhar ID'),
    otherwise: Yup.string(),
  }),
});

const Step1Form = ({ onNext }) => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const govtIdType = useWatch({ control, name: 'govtIdType' });

  const handleFormSubmit = (data, event) => {
    event.preventDefault();
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <TextField label="Name" {...field} error={!!fieldState?.error} helperText={fieldState?.error?.message} />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="age"
            control={control}
            render={({ field, fieldState }) => (
              <TextField label="Age" type="number" {...field} error={!!fieldState?.error} helperText={fieldState?.error?.message} />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="sex"
            control={control}
            render={({ field, fieldState }) => (
              <FormControl fullWidth>
                <InputLabel id="sex-label">Sex</InputLabel>
                <Select labelId="sex-label" {...field} error={!!fieldState?.error}>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
              </FormControl>
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="mobile"
            control={control}
            render={({ field, fieldState }) => (
              <TextField label="Mobile" {...field} error={!!fieldState?.error} helperText={fieldState?.error?.message} />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="govtIdType"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel id="govtIdType-label">Govt ID Type</InputLabel>
                <Select labelId="govtIdType-label" {...field}>
                  <MenuItem value="Aadhar">Aadhar</MenuItem>
                  <MenuItem value="PAN">PAN</MenuItem>
                </Select>
              </FormControl>
            )}
          />
        </Grid>
        {govtIdType === 'Aadhar' && (
          <Grid item xs={12}>
            <Controller
              name="govtId"
              control={control}
              render={({ field, fieldState }) => (
                <TextField label="Aadhar ID" {...field} error={!!fieldState?.error} helperText={fieldState?.error?.message} />
              )}
            />
          </Grid>
        )}
      </Grid>
      <Button type="submit">Next</Button>
    </form>
  );
};

export default Step1Form;
