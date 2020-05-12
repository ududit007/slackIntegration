import React, { useState, useEffect } from "react";
import { InputLabel, MenuItem, useMediaQuery } from "@material-ui/core";
import { Grid, FormControl, Select, Button, Paper } from "@material-ui/core";
import { withStyles, makeStyles, useTheme } from "@material-ui/core/styles";
import { Table, TableBody, TableCell, TableContainer } from "@material-ui/core";
import { TableHead, TableRow } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import * as SlackAction from "../../action/SlackAction";
import ConversationDisplay from "./ConversationDisplay";

const useStyles = makeStyles((theme) => ({
  rootBody: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    marginLeft: "30%",
    width: "30%",
    marginTop: "4%",
    marginBottom: "2%",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    width: "80%",
    borderRadius: "8px",
    border: "2px solid #204B33",
    paddingRight: "12px",
    paddingLeft: "12px",
    paddingTop: "4px",
    paddingBottom: "4px",
  },
  iconButton: {
    padding: 10,
  },
  icon: {
    height: "auto",
    width: "auto",
    [theme.breakpoints.down("sm")]: {
      height: "10em",
      width: "20em",
    },
  },
  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    // minWidth: 120,
  },
  table: {
    minWidth: 700,
  },
  convoDisplay: {
    marginBottom: 0,
  },
  buttons: {
    backgroundColor: theme.palette.common.black,
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: theme.palette.common.white,
    height: 48,
    padding: "0 30px",
    justifyContent: "center",
    marginTop: "20px",
    "&:hover": {
      backgroundColor: theme.palette.common.black,
      color: "blue",
    },
  },
  channelStyle: {
    display: "flex",
    justify: "center",
    [theme.breakpoints.down("sm")]: {
      display: "block",
      textAlign: "center"
  }
  },
  dates: {
    [theme.breakpoints.down("sm")]: {
      display: "block",
  }}
}));

// Styling of table cell
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

//  Styling of table row
const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

export default function BodyComponent(props) {
  const classes = useStyles();
  var date = new Date();
  const theme = useTheme();
  const [channelList, setChannelList] = useState([]);
  const [channel, setChannel] = useState("");
  const [open, setOpen] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [user, setUser] = useState([]);
  const [channelId, setChannelId] = useState("");
  const [startDate, setStartDate] = useState(
    new Date(date.getFullYear(), date.getMonth() - 1, 2)
      .toISOString()
      .slice(0, 10)
  );
  const [endDate, setEndDate] = useState(
    new Date(date.getFullYear(), date.getMonth(), 1).toISOString().slice(0, 10)
  );
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  // To get conversation of selected channel
  const getConversation = async (id) => {
    try {
      let response = await SlackAction.getConversations(id, startDate, endDate);
      if (response) {
        setConversation(response[0].conversation_list);
        setUser(response[0].channel_user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChannelId = (event) => {
    setChannelId(event.target.value);
  };

  const handleChannel = () => {
    setChannel(channelId);
    getConversation(channelId);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleCloseUser = () => {
    setOpenUser(false);
  };

  const handleOpenUser = () => {
    setOpenUser(true);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date.toISOString().slice(0, 10));
  };

  const handleEndDateChange = (date) => {
    setEndDate(date.toISOString().slice(0, 10));
  };

  // To get token of workspace
  const getToken = async (code) => {
    try {
      if (code) {
        let access_token = await SlackAction.getToken(code);
        if (access_token){
          changeToken(access_token);
        }
      }
    } catch (error) {
      console.log(error);
    }
    return false;
  };

  useEffect(() => {
    props.showSignIn(false);
    if (props.location && props.location.state) {
      let code = props.location.state.code;
      getToken(code);
    }
  }, []);

  // To get list of channels of selected team
  const changeToken = async (tokenTeam) => {
    try {
      if (tokenTeam) {
        let response = await SlackAction.getChannelList({
          token_team: tokenTeam,
        });
        if (response) {
          setChannelList(response);
        }
      }
    } catch (error) {
      console.log(error);
    }
    return false;
  };

  // display list of users of selected channel
  const userDisplay = (
    <>
      <Button className={classes.button} onClick={handleOpen}>
        Select the User
      </Button>
      <FormControl className={classes.formControl}>
        <InputLabel id="user-controlled-open-select-label">Users</InputLabel>
        <Select
          labelId="user-controlled-open-select-label"
          id="user-controlled-open-select"
          open={openUser}
          onClose={handleCloseUser}
          onOpen={handleOpenUser}
          value={user}
        >
          {user.map((ele, index) => (
            <MenuItem value={Object.keys(ele)[0]} key={(ele, index)}>
              {" "}
              {ele[Object.keys(ele)[0]]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );

  // To display list of channels of selected team
  const channelDisplay = (
    <>
      <div style={{ textAlign: "center" }}>
        <FormControl variant="filled" className={classes.formControl}>
          <InputLabel htmlFor="filled-channel-native-simple">
            Channels
          </InputLabel>
          <Select
            native
            value={channel}
            onChange={handleChannelId}
            inputProps={{
              name: "channel",
              id: "filled-channel-native-simple",
            }}
          >
            {channelList.map((ele, index) => (
              <option value={ele.channel_id} key={(ele, index)}>
                {" "}
                {ele.channel_name}
              </option>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className={classes.channelStyle}>
        {/* Date pickers to filter conversation */}
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            className={classes.dates}
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="start-date"
            label="Start Date"
            value={startDate}
            onChange={handleStartDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
            style={{  marginRight : matchesSM ? 0 : "15px" }}
          />
          <KeyboardDatePicker
            className={classes.dates}
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="end-date"
            label="End Date"
            value={endDate}
            onChange={handleEndDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>
      </div>
      <div style={{ textAlign: "center" }}>
        <Button onClick={handleChannel} className={classes.buttons}>
          Submit
        </Button>
      </div>
    </>
  );

  return (
    <>
      <div className={classes.rootBody}>
        <Grid container spacing={3} className={classes.convoDisplay}>
          <div>{channelList.length ? channelDisplay : null}</div>
          {/* <div>{user.length ? userDisplay : null}</div> */}
        </Grid>
      </div>
      <div>
        {conversation.length ? (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="conversation table">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell>Sender</StyledTableCell>
                  <StyledTableCell align="right">Message</StyledTableCell>
                  <StyledTableCell align="right">Date</StyledTableCell>
                  <StyledTableCell align="right">Reactions</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {conversation.map((row, index) => (
                  <ConversationDisplay key={(row, index)} row={row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : null}
      </div>
    </>
  );
}
