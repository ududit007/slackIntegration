import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import signIn from './../../assets/signIn.png';
import workspace from './../../assets/workspace.png';
import login from './../../assets/login.png';
import permission from './../../assets/permission.png';
import channels from './../../assets/channels.png';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const steps = [
  {
    label: 'Click on Sign in with Slack button',
    imgPath: signIn,
  },
  {
    label: 'Enter your slack Workspace name',
    imgPath: workspace,
  },
  {
    label: 'Enter slack account credentials',
    imgPath: login,
  },
  {
    label: 'Grant permission to access your account',
    imgPath: permission,
  },
  {
    label: 'Select channel and date to filter conversation',
    imgPath: channels,
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    Width: "100%",
    // flexGrow: 1,
    // border: "70px solid #F5F5F5",
    display: "inline-block",
    margin: "auto",
    textAlign: "center"
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginTop: "1rem",
    marginBottom: "1rem",
    height: "auto",
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.down("md")]: {
        fontSize: "1rem"
    }
  },
  img: {
    height: "auto",
    display: 'flex',
    maxWidth: "100%",
    overflow: 'hidden',
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    margin: "auto"
  },
  label: {
    display:"inline-block",
    fontWeight: 800,
    margin: "auto",
    fontSize: "2rem",
    [theme.breakpoints.down("md")]: {
        fontSize: "1rem"
    }
  }
}));

export default function UserManual() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div className={classes.root}>
    <Paper>
      <Paper square elevation={0} className={classes.header}>
        <Typography className={classes.label}>{steps[activeStep].label}</Typography>
      </Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {steps.map((step, index) => (
          <div key={step.label} style={{ textAlign: "center"}}>
            {Math.abs(activeStep - index) <= 2 ? (
              <img className={classes.img} src={step.imgPath} alt={step.label} />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      </Paper>
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
        }
      />
    </div>
  );
}

