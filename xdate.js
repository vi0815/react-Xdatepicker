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
import PropTypes, {string, bool, func} from "prop-types";
import DatePicker from "react-datepicker";



import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

const mmtMidnight = moment().clone().startOf('day');

XDate.propTypes = {
  showTime: PropTypes.bool,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  timeZone: PropTypes.string.isRequired,
  disableShowTimeSwitch: PropTypes.bool,
  onChange: PropTypes.func

}
XDate.defaultProps = {
  showTime: false,
  disableShowTimeSwitch: false,
  onChange: (target) => {return}
}



export function XDate(props) {
  const [showTime, setShowTime] = React.useState(props.showTime);
  const [startDate, setStartDate] = React.useState(moment(props.startDate));
  const [endDate, setEndDate] = React.useState(moment(props.endDate));
  const [timeZone, setTimeZone] = React.useState(props.timeZone);

  const [open, setOpen] = React.useState(false);


  const sendState = () => {
    let target = {}
    target["startDateString"] = startDate.format("YYYY-MM-DD")
    target["startDateMinutesMidnight"] = showTime?startDate.diff(mmtMidnight, 'minutes'):null
    target["startDateMoment"] = startDate

    target["endDateString"] = startDate.format("YYYY-MM-DD")
    target["endDateMinutesMidNight"] = showTime?startDate.diff(mmtMidnight, 'minutes'):null
    target["endDateMoment"] = startDate

    target["timeZone"] = timeZone

    props.onChange(target)
  }


  const handleShowTime = (event) => {
    setShowTime(event.target.checked);
    sendState()
  };

  const handleChangeStartDate = (newValue) => {
    setStartDate(newValue);
    console.log(newValue.format("YYYY-MM-DD"))
    sendState()
  };

  const handleChangeEndDate = (newValue) => {
    setEndDate(newValue);
    sendState()
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setTimeZone(event.target.value);
    sendState()
  };

  /*
  const generateDateTimePicker = () => {
    return (
        <>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
          />
        </>
    )
  }
  */

  const generateTimePicker = () => {
    return (
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Stack direction="row" spacing={1}>
          <MobileDateTimePicker
            clearable
            label="Start Date & Time"
            inputFormat="yyyy-MM-DD hh:mm"
            value={startDate}
            maxDateTime={endDate}
            onChange={handleChangeStartDate}
            renderInput={(params) => <TextField {...params} />}
          />
          <MobileDateTimePicker
            label="End Date & Time"
            inputFormat="yyyy-MM-DD hh:mm"
            minDateTime={startDate}
            value={endDate}
            onChange={handleChangeEndDate}
            renderInput={(params) => <TextField {...params}></TextField>}
          />
        </Stack>
      </LocalizationProvider>
    );
  };

  const generateDatePicker = () => {
    return (
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Stack direction="row" spacing={1}>
          <MobileDatePicker
            clearable
            label="Start Date"
            inputFormat="yyyy-MM-DD"
            value={startDate}
            maxDateTime={endDate}
            onChange={handleChangeStartDate}
            renderInput={(params) => <TextField {...params} />}
          />
          <MobileDatePicker
            label="End Date"
            inputFormat="yyyy-MM-DD"
            minDateTime={startDate}
            value={endDate}
            onChange={handleChangeEndDate}
            renderInput={(params) => <TextField {...params}></TextField>}
          />
        </Stack>
      </LocalizationProvider>
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
            <Switch disabled={props.disableShowTimeSwitch} checked={showTime} onChange={handleShowTime} size="small" />
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
  return(
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
  )
}

  return (
    <div>
      <Stack rowSpacing={0}>
        {showTime ? generateTimePicker() : generateDatePicker()}
          {getTimeBar()}
      </Stack>

      {timeZoneDialog()}
    </div>
  );
}
