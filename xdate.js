import * as React from 'react';
import Stack from '@mui/material/Stack';
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
import PropTypes, { string, bool, func, object } from 'prop-types';
import DatePicker from 'react-datepicker';
import { getTimezoneOffset } from 'date-fns-tz';

import 'react-datepicker/dist/react-datepicker.css';

const xapi2datetime = new RegExp(
  '^([0-9]{4}-[0-9]{2}-[0-9]{2})T([0-9]{2}:[0-9]{2}):[0-9]{2}([+-][0-9]{2}[0-9]{2})$',
  'm'
);

const xapi2date = new RegExp('^[0-9]{4}-[0-9]{2}-[0-9]{2}$', '');

const displayFormatDate = 'yyyy-MM-dd';
const displayFormatTime = 'yyyy-MM-dd HH:mm';

function getHoursOffsetFromTimezone(date, tz) {
  let hours = getTimezoneOffset(tz, date) / 60 / 60 / 1000;
  let result = hours >= 0 ? '+' : '-';
  result = result + String(hours).padStart(2, '0') + '00';
  return result;
}

function prepareTimeObject(dateObject, tzString) {
  console.log('prepare: ' + dateObject);
  const dateParts = dateObject.toLocaleDateString().split('/');
  let date = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0];

  let time =
    date +
    'T' +
    dateObject.toLocaleTimeString().split(':').slice(0, 2).join(':') +
    getHoursOffsetFromTimezone(date, tzString);
  let minutes = dateObject.getHours() * 60 + dateObject.getMinutes();
  return {
    date: date,
    time: time,
    minutes: minutes,
  };
}

function createJSDateObject(date) {
  console.log('dateconversion for' + date);
  if (date == null) {
    console.log('sending null');
    return null;
  }

  // test for date without time
  if (xapi2date.test(date)) {
    console.log('date converted' + new Date(date));
    return new Date(date + ' 00:00');
  }

  // test for date with time
  if (xapi2datetime.test(date)) {
    // ok, ignore the time zone

    return new Date(date.replace(xapi2datetime, '$1 $2'));
  }

  throw new Error("invalid time format: '" + date + "'");
}

XDate.propTypes = {
  showTime: PropTypes.bool,
  timeObject: PropTypes.object.required,
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

export function generateTimeObject(startDate, endDate, timeZone, timeEnabled) {
  let response = {};
  response.startDate = startDate == null ? null : new Date(startDate);
  response.endDate = endDate == null ? null : new Date(endDate);
  response.timeZone = timeZone == null ? 'Europe/London' : timeZone;
  response.timeEnabled = timeEnabled;
  return response;
}

export function XDate(props) {
  const [showTime, setShowTime] = React.useState(props.timeEnabled);
  const [endDate, setEndDate] = React.useState(() =>
    createJSDateObject(props.endDate)
  );
  const [startDate, setStartDate] = React.useState(() =>
    createJSDateObject(props.startDate)
  );
  const [timeZone, setTimeZone] = React.useState(props.timeZone);

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    sendState();
  }, [showTime, startDate, endDate, timeZone]);

  const sendState = () => {
    const startDateInfo = prepareTimeObject(startDate, timeZone);
    const endDateInfo = prepareTimeObject(endDate, timeZone);

    props.onChange({
      startDate: startDateInfo.date,
      startTime: startDateInfo.time,
      startMinutes: startDateInfo.minutes,
      endDate: endDateInfo.date,
      endTime: endDateInfo.time,
      endMinutes: endDateInfo.minutes,
      timeZone: timeZone,
      timeEnabled: showTime,
    });
  };

  const handleShowTime = (event) => {
    setShowTime(event.target.checked);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setTimeZone(event.target.value);
  };

  const generateDateTimePicker = () => {
    return (
      <>
        <Stack direction="row" spacing={1}>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            showTimeSelect={showTime}
            maxDate={endDate}
            dateFormat={showTime ? displayFormatTime : displayFormatDate}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            placeholderText={showTime ? 'Start date and time' : 'Start date'}
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            showTimeSelect={showTime}
            dateFormat={showTime ? displayFormatTime : displayFormatDate}
            endDate={endDate}
            minDate={startDate}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            placeholderText={showTime ? 'End date and time' : 'End date'}
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
