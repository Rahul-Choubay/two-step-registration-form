import React from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Grid } from '@material-ui/core';
import { error } from 'jquery';

const schema = Yup.object().shape({
  name: Yup.string().required('Name is required').min(3, 'Name should be at least 3 characters'),
  age: Yup.number().required('Age is required').positive('Age must be a positive number'),
  sex: Yup.string().required('Sex is required').oneOf(['Male', 'Female'], 'Invalid sex'),
  mobile: Yup.string().matches(/^(\+\d{1,2}\s?)?\d{10}$/, 'Invalid mobile number').required('Mobile is required'),
  govtIdType: Yup.string().oneOf(['Aadhar', 'PAN'], 'Invalid government ID type'),
  govtId: Yup.string().test({
    test: function(value) {
      if (this.parent.govtIdType === 'Aadhar') {
        return /^\d{12}$/.test(value);
      } else if (this.parent.govtIdType === 'PAN') {
        return /^[A-Za-z0-9]{10}$/.test(value);
      }
      return true;
    },
    message: 'Invalid government ID',
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
    <div style={{ width: "98vw",height:"70vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
  
    <form onSubmit={handleSubmit(handleFormSubmit)} style={{display:"flex", flexDirection:"column"}}>
   <div style={{display:"flex", flexDirection:"row"}} >
      <Grid container spacing={3} style={{display:"flex", flexDirection:"row"}}>
        <Grid item xs={0} style={{width:'14vw', flexDirection: 'row'}}>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <TextField label="Name" {...field} error={!!fieldState?.error} helperText={fieldState?.error?.message} />
            )}
          />
        </Grid>
        <Grid item xs={0} style={{ flexDirection: 'row' }}>
          <Controller
           style={{width:'14vw'}}
            name="age"
            control={control}
            render={({ field, fieldState }) => (
              <TextField label="Age" type="number" {...field} error={!!fieldState?.error} helperText={fieldState?.error?.message} />
            )}
          />
        </Grid>
        <Grid item xs={0} style={{ flexDirection: 'row' }}>
          <Controller
            name="sex"
            control={control}
            render={({ field, fieldState }) => (
              <FormControl  style={{width:'14vw'}}>
                <InputLabel id="sex-label">Sex</InputLabel>
                <Select labelId="sex-label" {...field} error={!!fieldState?.error}>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
              </FormControl>
            )}
          />
        </Grid>
        <Grid item xs={0} style={{ flexDirection: 'row' }}>
          <Controller
            name="mobile"
            control={control}
            render={({ field, fieldState }) => (
              <TextField label="Mobile" {...field} error={!!fieldState?.error} helperText={fieldState?.error?.message} />
            )}
          />
        </Grid>
        <Grid item xs={0} style={{ flexDirection: 'row' }}>
          <Controller
            name="govtIdType"
            control={control}
            render={({ field }) => (
              <FormControl  style={{width:'14vw'}}>
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
         {
      govtIdType === 'PAN' && (
        <Grid item xs={12} >
          <Controller
          name='govtId'
          control={control}
          render={({field, fieldState}) =>(
            <TextField label="PAN" {...field} error={!!fieldState?.error} helperText={fieldState?.error?.message} />
          )}
          />
        </Grid>
      )
     }
      </Grid>
       </div>
      <Button style={{width:'14vw',height:"6vh",marginTop:"6rem", flexDirection: 'row',backgroundColor: "#f0f0f0", justifyContent: "center", alignItems: "center" }} type="submit">Next</Button>
    
    </form>
    </div>
  );
};

export default Step1Form;
