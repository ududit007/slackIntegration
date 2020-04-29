import React, { useState } from "react";
import { InputBase, IconButton, InputLabel, MenuItem } from "@material-ui/core";
import { Grid, FormControl, Select, Button, Paper } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Table, TableBody, TableCell, TableContainer } from "@material-ui/core";
import { TableHead, TableRow } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import SearchIcon from "@material-ui/icons/Search";
import slacIcon from "../../assets/slack.png";
import DateFnsUtils from "@date-io/date-fns";
import * as SlackAction from "../../action/SlackAction";


const useStyles = makeStyles((theme) => ({
  rootBody: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    marginLeft: "30%",
    width: "30%",
    marginTop: "12%",
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
    minWidth: 120,
  },
  table: {
    minWidth: 700,
  },
  convoDisplay: {
    marginBottom: 0,
  },
  buttons: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  },
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

export default function BodyComponent() {
  const classes = useStyles();
  const [tokenTeam, setTokenTeam] = useState("");
  const [channelList, setChannelList] = useState([]);
  const [channel, setChannel] = useState("");
  const [open, setOpen] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [channelId, setChannelId] = useState("");
  const [startDate, setStartDate] = useState(new Date(Date.now()));
  const [endDate, setEndDate] = useState(new Date(Date.now()));

  
  // To get conversation of selected channel 
  const getConversation = async (id) => {
    try {
      let response = await SlackAction.getConversations(id, startDate, endDate);
      if (response) {
        setConversation(response);
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

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = (event) => {
    setTokenTeam(event.target.value);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date.toISOString().slice(0, 10));
  };

  const handleEndDateChange = (date) => {
    setEndDate(date.toISOString().slice(0, 10));
  };

  
  // To get list of channels of selected team 
  const changeToken = async (event) => {
    event.preventDefault();
    try {
      if (tokenTeam) {
        let response = await SlackAction.getChannelList({token_team: tokenTeam});
        if (response) {
          setChannelList(response);
        }
      }
    } catch (error) {
      console.log(error);
    }
    return false;
  };


  /* To display conversation of selected channel 
  in tabular format */
  const conversationDisplay = (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Sender</StyledTableCell>
            <StyledTableCell align="right">Message</StyledTableCell>
            <StyledTableCell align="right">Date</StyledTableCell>
            <StyledTableCell align="right">sender_email</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {conversation.map((row, index) => (
            <StyledTableRow key={(row, index)}>
              <StyledTableCell component="th" scope="row">
                {row.sender_name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.message}</StyledTableCell>
              <StyledTableCell align="right">
                {row.message_date}
              </StyledTableCell>
              <StyledTableCell align="right">
                {row.sender_email}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  // To display list of channels of selected team
  const channelDisplay = (
    <div>
      <Button className={classes.button} onClick={handleOpen}>
        Select the Channel
      </Button>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Channels</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={channel}
          onChange={handleChannelId}
        >
          {channelList.map((ele, index) => (
            <MenuItem value={ele.channel_id} key={(ele, index)}>
              {" "}
              {ele.channel_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* Date pickers to filter conversation */}
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
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
          />
          <KeyboardDatePicker
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
        </Grid>
      </MuiPickersUtilsProvider>
      <div>
        <Button onClick={handleChannel} className={classes.buttons}>
          Submit
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <div className={classes.rootBody}>
        <Grid container spacing={3} className={classes.convoDisplay}>
          <Grid item xs={12} component={"a"}>
            <img src={slacIcon} alt="icon" className={classes.icon} />
          </Grid>
          <Grid item xs={12}>
            <InputBase
              className={classes.input}
              placeholder="Search Slack channels"
              inputProps={{ "aria-label": "Search Slack channels" }}
              onChange={handleChange}
            />
            <IconButton
              type="submit"
              className={classes.iconButton}
              aria-label="search"
              onClick={changeToken}
            >
              <SearchIcon />
            </IconButton>
          </Grid>
          <div>{channelList.length ? channelDisplay : null}</div>
        </Grid>
      </div>
      <div>{conversation.length ? conversationDisplay : null}</div>
    </>
  );
}
