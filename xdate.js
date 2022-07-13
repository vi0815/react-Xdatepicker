import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment from 'moment-timezone';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import PropTypes, { string, bool, func } from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const mmtMidnight = moment().clone().startOf('day');

XDate.propTypes = {
  showTime: PropTypes.bool,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  timeZone: PropTypes.string.isRequired,
  disableShowTimeSwitch: PropTypes.bool,
  onChange: PropTypes.func,
};
XDate.defaultProps = {
  showTime: false,
  disableShowTimeSwitch: false,
  onChange: (target) => {
    return;
  },
};

export function XDate(props) {
  const [showTime, setShowTime] = React.useState(props.showTime);
  const [startDate, setStartDate] = React.useState(props.startDate==null?null:new Date(props.startDate));
  const [endDate, setEndDate] = React.useState(props.endDate==null?null:new Date(props.endDate));
  const [timeZone, setTimeZone] = React.useState(props.timeZone);

  const [open, setOpen] = React.useState(false);

  const sendState = () => {};

  const handleShowTime = (event) => {
    setShowTime(event.target.checked);
    sendState();
  };

  const handleChangeStartDate = (newValue) => {
    setStartDate(newValue);
    console.log(newValue.format('YYYY-MM-DD'));
    sendState();
  };

  const handleChangeEndDate = (newValue) => {
    setEndDate(newValue);
    sendState();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setTimeZone(event.target.value);
    sendState();
  };

  const generateDateTimePicker = () => {
    return (
      <>
        <Stack direction="row" spacing={1}>
          <DatePicker
            showTimeSelect={showTime}
            onChange={(date) => setStartDate(date)}
            selected={startDate}
            maxDate={endDate}
            dateFormat={showTime?'yyyy-MM-dd hh:mm':'yyyy-MM-dd'}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            placeholderText={showTime?"Start date and time":"Start date"}
          />
          <DatePicker
            showTimeSelect={showTime}
            dateFormat={showTime?'yyyy-MM-dd hh:mm':'yyyy-MM-dd'}
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            minDate={startDate}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            placeholderText={showTime?"End date and time":"End date"}

          />
        </Stack>
      </>
    );
  };

  const getTimeBar = () => {
    return (
      <Box
        sx={{ m: 0, t: -1 }}
        m={1}
        component="span"
        display="flex"
        flexWrap="wrap"
        align="start"
        justifyContent={'start'}
      >
        <FormControlLabel
          control={
            <Switch
              disabled={props.disableShowTimeSwitch}
              checked={showTime}
              onChange={handleShowTime}
              size="small"
            />
          }
          label="Time"
        />
        {showTime ? (
          <Button
            size="small"
            onClick={handleClickOpen}
            style={{ textTransform: 'none' }}
          >
            Timezone: {timeZone}
          </Button>
        ) : null}
      </Box>
    );
  };

  const timeZoneDialog = () => {
    return (
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Select Timezone</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel htmlFor="select-timezone">Age</InputLabel>
              <Select
                native
                value={timeZone}
                onChange={handleChange}
                input={<OutlinedInput label="Age" id="select-timezone" />}
              >
                <option aria-label="None" value="" />
                <option value={'Europe/London'}>London</option>
                <option value={'Europe/Berlin'}>Berlin</option>
                <option value={'Europe/Brussels'}>Brussels</option>
                <option value={'Europe/Paris'}>Paris</option>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <div>
      <Stack rowSpacing={0}>
        {generateDateTimePicker()}
        {getTimeBar()}
      </Stack>

      {timeZoneDialog()}
    </div>
  );
}
