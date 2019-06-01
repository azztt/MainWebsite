import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { Typography, withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { fetchProjects as fetchProjectsAction } from '../actions/allActions';
import ProjectViewCard from '../components/ProjectViewCard';
import ReactFullpage from '@fullpage/react-fullpage';

import "../overrides.css";

const styles = theme => ({
  centerText: {
    textAlign: 'center',
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: theme.spacing.unit * 10,
  },
});

const mapStateToProps = state => ({
  data: state.completeReducer.data.projects,
  isLoading: state.completeReducer.isLoading.projects,
  error: state.completeReducer.errorFetching.projects,
});

const mapDispatchToProps = dispatch => ({
  fetchProjects: () => dispatch(fetchProjectsAction()),
});

class Projects extends React.Component {
  constructor(props) {
    super(props);
    const { data } = this.props;
    if (data === undefined || data.length === 0) {
      const { fetchProjects } = this.props;
      fetchProjects();
    }
  }

  renderProjects() {
    const { data, isLoading, error } = this.props;

    if (isLoading !== false) {
      return 'Loading';
    }
    if (error) {
      return 'Error';
    }

    const renders = [];
    const keys = Object.keys(data[0]);
    let arg = 0; 
    let group = []; // Counter to make groups of projects to be shown on a single page
    let groupLength = 1;
    if (window.innerWidth >= 1280) {
      groupLength = 3;
    } else if (window.innerWidth >= 480) {
      groupLength = 2;
    }

    for (let i = 0; i < data.length; i += 1) {
      const projectData = {};
      keys.forEach((key) => { projectData[key] = data[i][key]; });
      if (projectData['DisplayOnWebsite (Y/N)'] === 'Y') {
        projectData['arg'] = ''+(arg++);
        const project = (
          <Grid item key={`showcase${i}`} xs={12} md={6} lg={4}>
            <ProjectViewCard projectData={projectData} isLoading={isLoading} />
          </Grid>
        );
        group.push(project);
        if (group.length === groupLength) {
          // Number of projects to be displayed in a single FullPage Component
          const section = (
            <div className="section">
              <Grid container>
                {group}
              </Grid>
            </div>
          );
          renders.push(section);
          group = [];
        }
      }
    }
    // console.log(renders);
    return renders;
  }

  render() {
    const { classes, isLoading } = this.props;
    const renderSection = this.renderProjects();
    return (
      <Grid container>
        <Grid container item md={1} />
        <Grid container item xs={12} md={10}>
          <Typography gutterBottom variant="h5" className={classes.centerText}>
            Showcase Projects
          </Typography>
          <ReactFullpage
            scrollBar={true}
            render={({ state, fullpageApi }) => {
              // console.log(state);
              if (isLoading === false) {
                return (                                                                                                                                                                                                                                                        
                  <ReactFullpage.Wrapper>
                    {renderSection}
                  </ReactFullpage.Wrapper>
                );
              } else {
                return (
                  <ReactFullpage.Wrapper>
                    <div className="section">
                      Loading
                    </div>
                  </ReactFullpage.Wrapper>
                );
              }
            }}
          />
        </Grid>
        <Grid container item md={1} />
      </Grid>
    );
  }
}

Projects.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
  error: PropTypes.bool,
  fetchProjects: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

Projects.defaultProps = {
  data: [],
  isLoading: true,
  error: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Projects));
