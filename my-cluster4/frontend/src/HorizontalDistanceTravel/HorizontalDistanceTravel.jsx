import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import DistanceCalculator from './components/DistanceCalculator';
import AllCalculatedData from './components/AllCalculatedData';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
  }
}));

const HorizontalDistanceTravel = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <DistanceCalculator />
      <AllCalculatedData />
    </div>
  )
}

export default HorizontalDistanceTravel;
