import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';


const styles = {
  card: {
    minWidth: 245,
    maxWidth: 300,
  },
  media: {
    objectFit: 'cover',
  },
};

function Widget(props) {
  const { classes, } = props;
  return (
    <Card className={classes.card} elevation={20}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="widget"
          className={classes.media}
          image="https://dairydoo.com/wp-content/uploads/2018/03/Placeholder.png"
          title="widget"
        />
      </CardActionArea>
    </Card>
  );
}

Widget.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Widget);