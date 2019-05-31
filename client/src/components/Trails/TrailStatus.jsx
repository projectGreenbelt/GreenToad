import React, { Component } from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
//import Modal from '@material-ui/core/Modal';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 2,
    overflowX: 'auto',
  },
  table: {
    
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

class TrailStatus extends Component {
  state = { trails: [] };
  
  componentDidMount() {
    axios.get("https://www.mtbproject.com/data/get-trails-by-id", {
      params: {
        ids: "7010167,7033001,7033003,7006199",
        key: "200453243-aec941868ddf7f5619ce99c8591b8a99", 
        format: "json"
      }
    })
    .then(response =>
      this.setState({ trails: response.data.trails }),   
    )
    .catch();
  }

  render() {
    const { trails } = this.state
    const { classes } = this.props
    
    return (
      <Paper className={classes.root} elevation={20}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell>Trail</CustomTableCell>
              <CustomTableCell align="right">Length(mi)</CustomTableCell>
              <CustomTableCell align="right">Status</CustomTableCell>
              <CustomTableCell align="right">Snapshot</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {trails.map((trail) => (
            <TableRow className={classes.row} key={trail.id}>
              <CustomTableCell>{trail.name}</CustomTableCell>
              <CustomTableCell align="right">{trail.length}</CustomTableCell>
              <CustomTableCell align="right">{trail.conditionStatus}</CustomTableCell>
              <CustomTableCell align="right"><img src={trail.imgSqSmall} alt=""/></CustomTableCell>
            </TableRow>
          ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

TrailStatus.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TrailStatus);