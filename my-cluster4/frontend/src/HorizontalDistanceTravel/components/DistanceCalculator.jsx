import React, { useState } from 'react';

import axios from 'axios';

import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  }
}));

const DistanceCalculator = () => {
  const classes = useStyles();
  const [values, setValues] = useState({
    angle: null,
    speed: null,
  });
  const [distance, setDistance] = useState();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleCalculateDistance = async () => {
    if (!values.angle || !values.speed) {
      return null;
    }

    const response = await axios.get(`/api/calculate?angle=${values.angle}&speed=${values.speed}`);
    setDistance(response.data);
  };

  return (
    <div className={classes.root}>
      <div>
        <TextField
          label='Angle'
          id='angle'
          className={clsx(classes.margin, classes.textField)}
          InputProps={{
            endAdornment: <InputAdornment position='start'>degrees</InputAdornment>,
          }}
          variant='outlined'
          onChange={handleChange('angle')}
          type='number'
        />
        <TextField
          label='Speed'
          id='speed'
          className={clsx(classes.margin, classes.textField)}
          InputProps={{
            endAdornment: <InputAdornment position='start'>m/s</InputAdornment>,
          }}
          variant='outlined'
          onChange={handleChange('speed')}
          type='number'
        />
      </div>
      <div>
        <Button
          variant='contained'
          color='primary'
          size='large'
          className={classes.margin}
          onClick={handleCalculateDistance}
        >
          Calculate
        </Button>
      </div>
      {distance && (<div>
        <Typography variant='h4' gutterBottom>
          {distance}
        </Typography>
      </div>)}
    </div>
  )
}

export default DistanceCalculator;
