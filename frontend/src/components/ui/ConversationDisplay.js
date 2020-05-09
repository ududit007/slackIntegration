import React, { useState } from "react";
import { IconButton, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Table, TableBody, TableCell } from "@material-ui/core";
import { TableHead, TableRow, Box, Collapse } from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

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

export default function ConversationDisplay(props) {
  const [thread, setThread] = useState(false);
  const { row } = props;
  return (
    <>
      <StyledTableRow key={row}>
        <StyledTableCell>
          {row.threaded_message ? (
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setThread(!thread)}
            >
              {thread ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          ) : null}
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          {row.sender_name}
        </StyledTableCell>
        <StyledTableCell align="right">{row.message}</StyledTableCell>
        <StyledTableCell align="right">{row.message_date}</StyledTableCell>
        <StyledTableCell align="right">{row.reactions}</StyledTableCell>
      </StyledTableRow>
      {row.threaded_message ? (
        <StyledTableRow>
          <StyledTableCell
            style={{ paddingBottom: 0, paddingTop: 0 }}
            colSpan={6}
          >
            <Collapse in={thread} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <Typography variant="h6" gutterBottom component="div">
                      Threaded messages
                    </Typography>
                    <StyledTableRow>
                      <StyledTableCell>Sender</StyledTableCell>
                      <StyledTableCell>Message</StyledTableCell>
                      <StyledTableCell>Date</StyledTableCell>
                      <StyledTableCell>Reactions</StyledTableCell>
                    </StyledTableRow>
                  </TableHead>
                  <TableBody>
                    {row.threaded_message.map((row, index) => (
                      <StyledTableRow key={row}>
                        <StyledTableCell component="th" scope="row">
                          {row.sender_name}
                        </StyledTableCell>
                        <StyledTableCell>{row.message}</StyledTableCell>
                        <StyledTableCell>{row.message_date}</StyledTableCell>
                        <StyledTableCell>{row.reactions}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </StyledTableCell>
        </StyledTableRow>
      ) : null}
    </>
  );
}
