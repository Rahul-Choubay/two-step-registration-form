import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Button, TextField, Grid } from '@material-ui/core';

const schema = Yup.object().shape({
  address: Yup.string().optional(),
  state: Yup.string().optional(),
  city: Yup.string().optional(),
  country: Yup.string().optional(),
  pincode: Yup.number().optional().positive('Pincode must be a positive number'),
});

const Step2Form = ({ onSubmit }) => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = (data, event) => {
    event.preventDefault();
    onSubmit(data);
  };

  return (
    <div style={{ width: "98vw",height:"70vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={0}>
          <Controller
            name="address"
            control={control}
            render={({ field }) => <TextField label="Address" {...field} />}
          />
        </Grid>
        <Grid item xs={0}>
          <Controller
            name="state"
            control={control}
            render={({ field }) => <TextField label="State" {...field} />}
          />
        </Grid>
        <Grid item xs={0}>
          <Controller
            name="city"
            control={control}
            render={({ field }) => <TextField label="City" {...field} />}
          />
        </Grid>
        <Grid item xs={0}>
          <Controller
            name="country"
            control={control}
            render={({ field }) => <TextField label="Country" {...field} />}
          />
        </Grid>
        <Grid item xs={0}>
          <Controller
            name="pincode"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                label="Pincode"
                type="number"
                {...field}
                error={!!fieldState?.error}
                helperText={fieldState?.error?.message}
              />
            )}
          />
        </Grid>
      </Grid>
      <Button  style={{width:'14vw',height:"6vh",marginTop:"6rem", flexDirection: 'row',backgroundColor: "#f0f0f0", justifyContent: "center", alignItems: "center" }} type="submit">Submit</Button>
    </form>
    </div>
  );
};

export default Step2Form;

