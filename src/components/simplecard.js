import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";

import CardContent from "@material-ui/core/CardContent";

import Typography from "@material-ui/core/Typography";

const styles = {
  card: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgb(37, 44, 72)",
  },
  title: {
    fontSize: 14,
    color: "grey",
  },
  value: {
    fontSize: 25,
    color: "white",
  },
};

function SimpleCard(props) {
  const { classes } = props;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {props.title}
          </Typography>
        </Grid>
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <Typography className={classes.value} variant="h5" component="h2">
            {props.value}
          </Typography>
        </Grid>
      </CardContent>
    </Card>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);
