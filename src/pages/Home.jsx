/* eslint-disable no-await-in-loop */
import React from 'react';
import { withStyles, Grid } from '@material-ui/core';
import { useSpring, animated, Keyframes } from 'react-spring';
import PropTypes from 'prop-types';
import Typing from 'react-typing-animation';

import '../index.css';

const styles = () => ({
  root: {
    width: '90vw',
    height: '90vh',
    marginTop: '10vh',
    willChange: 'width, height, left, top',
    marginLeft: '5vw',
  },
  scriptBox: {
    position: 'relative',
  },
  typingContainer: {
    position: 'relative',
    height: '90vh',
  },
  typing: {
    marginTop: '25vh',
    fontSize: '36px',
    textAlign: 'center',
    margin: 'auto',
  },
  line1: {
    fontSize: '28px',
  },
});

const items = ['devices', 'css3', 'html5', 'js', 'python', 'bash', 'ts', 'docker', 'react'];

function responsiveDistance(distance) {
  let ratio = window.innerWidth / 1920;
  ratio = ratio < 0.3 ? 0.3 : ratio;
  return ratio * distance;
}

const SvgContainer = Keyframes.Spring(async (next) => {
  while (true) {
    await next({
      from: { radians: 0 },
      to: { radians: 2 * Math.PI },
    });
  }
});

const SvgAnimator = ({ radians, distanceX, distanceY }) => items.map((_, i) => (
  <animated.div className={`card${i}`}
    style={{
      transform: radians.interpolate(
        r => `translate3d(${Math.sin(r) - responsiveDistance(distanceX)}px,${Math.sin(r) - responsiveDistance(distanceY)}px,0)`,
      ),
    }}
  />
));

const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2];
const trans1 = (x, y) => `translate3d(${x / 40}px,${y / 40}px,0)`; // Desktop
const trans2 = (x, y) => `translate3d(${x / 18 + responsiveDistance(50)}px,${y / 18 - responsiveDistance(180)}px,0)`; // CSS3
const trans3 = (x, y) => `translate3d(${x / 18 - responsiveDistance(320)}px,${y / 18 - responsiveDistance(150)}px,0)`; // HTML5
const trans4 = (x, y) => `translate3d(${x / 8 + responsiveDistance(160)}px,${y / 8 + responsiveDistance(10)}px,0)`; // JS
const trans5 = (x, y) => `translate3d(${x / 18 + responsiveDistance(380)}px,${y / 18 - responsiveDistance(100)}px,0)`; // Python
const trans6 = (x, y) => `translate3d(${x / 8 - responsiveDistance(160)}px,${y / 8 - responsiveDistance(50)}px,0)`; // Bash
const trans7 = (x, y) => `translate3d(${x / 18 + responsiveDistance(340)}px,${y / 18 + responsiveDistance(140)}px,0)`; // TS
const trans8 = (x, y) => `translate3d(${x / 18 - responsiveDistance(50)}px,${y / 18 + responsiveDistance(170)}px,0)`; // Docker
const trans9 = (x, y) => `translate3d(${x / 18 - responsiveDistance(340)}px,${y / 18 + responsiveDistance(100)}px,0)`; // React

function Card() {
  const [props, set] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 10, tension: 550, friction: 140 },
  }));
  const { xy } = calc(Math.sin(x / 5), Math.sin(y / 5));
  return (
    <div className="container">
      <animated.div className="card1" style={{ transform: xy.interpolate(trans1) }} />
      <animated.div className="card2" style={{ transform: xy.interpolate(trans2) }} />
      <animated.div className="card3" style={{ transform: xy.interpolate(trans3) }} />
      <animated.div className="card4" style={{ transform: xy.interpolate(trans4) }} />
      <animated.div className="card5" style={{ transform: xy.interpolate(trans5) }} />
      <animated.div className="card6" style={{ transform: xy.interpolate(trans6) }} />
      <animated.div className="card7" style={{ transform: xy.interpolate(trans7) }} />
      <animated.div className="card8" style={{ transform: xy.interpolate(trans8) }} />
      <animated.div className="card9" style={{ transform: xy.interpolate(trans9) }} />
    </div>
  );
}

const Home = (props) => {
  const { classes } = props;
  return (
    <React.Fragment>
      <div className={classes.root}>
        <Grid container>
          <Grid container item md={7}>
            <Card />
          </Grid>
          <Grid container item md={5} className={classes.typingContainer}>
            <Typing className={classes.typing}>
              <Typing.Speed ms={60} />
              <span className={classes.line1}>This is</span>
              <Typing.Delay ms={200} />
              <br />
              <Typing.Speed ms={5} />
              <span>The Software Development Club, IIT Delhi</span>
              <Typing.Reset count={1} delay={800} />
              <Typing.Speed ms={20} />
              DevClub
            </Typing>
          </Grid>
        </Grid>
      </div>
      {/* <a href="http://bit.ly/2CGChyY"> Report bugs/Suggestions.</a> */}
    </React.Fragment>
  );
};

Home.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

Card.propTypes = {
  xy: PropTypes.objectOf(PropTypes.array).isRequired,
};

export default withStyles(styles)(Home);
