import React, { useState } from 'react';

import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  margin: {
    margin: theme.spacing(1),
  },
  table: {
    minWidth: 650,
  }
}));

const AllCalculatedData = () => {
  const classes = useStyles();

  const [allCalculated, setAllCalculated] = useState([]);

  const handleShowAllCalculated = async () => {
    const response = await axios.get('/api/all-calculated');
    setAllCalculated(response.data);
  };

  return (
    <div className={classes.root}>
      <div>
        <Button
          variant='contained'
          color='primary'
          size='large'
          className={classes.margin}
          onClick={handleShowAllCalculated}
        >
          Show all calculated
        </Button>
      </div>
      {allCalculated?.length ?
        (<div>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Angle&nbsp;(degrees)</TableCell>
                  <TableCell>Speed&nbsp;(m/s)</TableCell>
                  <TableCell align="right">Distance&nbsp;(m)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allCalculated.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.angle}
                    </TableCell>
                    <TableCell>{row.speed}</TableCell>
                    <TableCell align="right">{row.distance}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>)
        : null
      }
    </div>
  )
}

export default AllCalculatedData;
