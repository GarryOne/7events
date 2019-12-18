import React from 'react';
import DateMomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';
import moment, { Moment } from "moment";

export interface TimePickerOptions {
  margin?: "normal" | "none" | "dense" | undefined;
  name: string;
  id?: string;
  label?: string;
  ariaLabel?: string;
}

interface IProps {
  // if true will return date/time as string
  // else moment object
  timeString?: boolean;
  // selected time will be attached to this date
  date?: string | undefined;
  // Date/Time format
  format?: string;
  options?: TimePickerOptions;
  onChange: (date: Moment | string, fieldName: string) => void;
}

const defaultPickerOptions: TimePickerOptions = {
  margin: 'normal',
  name: 'timePicker',
  id: 'time-picker',
  label: 'Select time',
  ariaLabel: 'change time',
};

export default function TimePicker(props: IProps) {
  const [selectedDate, setSelectedDate] = React.useState<Moment | null | string | undefined>(null);
  const [pickerOptions, setPickerOptions] = React.useState<TimePickerOptions>(defaultPickerOptions);

  React.useEffect( () => {
    if(props.date) {
      let newDate = props.date;
      if(selectedDate) {
        const time = moment(selectedDate).format('HH:mm');
        const recievedDate = moment(props.date).format('YYYY-MM-DD');
        newDate = moment(`${recievedDate} ${time}`).format('YYYY-MM-DD HH:mm');
      }
      setSelectedDate(newDate);
    }
  }, [props.date]);

  React.useEffect( () => {
    setPickerOptions({...pickerOptions, ...props.options});
  },[props.options]);

  const handleDateChange = (date: Moment | null): void => {
    if(!date) return;
    let pickedDate: Moment | string = date;
    setSelectedDate(pickedDate);
    if (props.timeString) {
      const format = props.format ? props.format : 'MM-DD-YYYY HH:mm';
      pickedDate = date.format(format);
    }
    props.onChange(pickedDate, pickerOptions.name);
  };

  return (
    <MuiPickersUtilsProvider utils={DateMomentUtils}>

      <KeyboardTimePicker
        margin={pickerOptions.margin}
        id={pickerOptions.id}
        label={pickerOptions.label}
        name={pickerOptions.name}
        value={selectedDate}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          'aria-label': pickerOptions.ariaLabel,
        }}
      />

    </MuiPickersUtilsProvider>
  )
}
