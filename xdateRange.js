import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import InputAdornment from '@mui/material/InputAdornment';
import moment from 'moment-timezone';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import ClearIcon from "@material-ui/icons/Clear";


import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';


export function XDateRange(props) {
  const [startDate, setStartDate] = React.useState(moment(props.startDate))
  const [endDate, setEndDate] = React.useState(moment(props.endDate))
  const [timeZone, setTimeZone] = React.useState()
  console.log(endDate)

  const handleChangeStartDate = (newValue) => {
    setStartDate(newValue);
  };

  const handleChangeEndDate = (newValue) => {
    setEndDate(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Stack direction="row" spacing={1}>
        <MobileDateTimePicker
          clearable
          label="Start Date"
          inputFormat="yyyy-MM-DD hh:mm Z"
          value={startDate}
          maxDate={endDate}
          onChange={handleChangeStartDate}
          renderInput={(params) =>
            <TextField {...params} />
            }
        />
        <MobileDateTimePicker
          label="End Date"
          inputFormat="yyyy-MM-DD"
          value={endDate}
          minDate={startDate}
          onChange={handleChangeEndDate}
          renderInput={(params) => <TextField {...params}></TextField>}
        />
      </Stack>
    </LocalizationProvider>
  );
}
