import React from 'react';

import DateMomentUtils from '@date-io/moment';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { Moment } from "moment";
import moment from 'moment';

export interface DatePickerOptions {
  variant?: string;
  format?: string;
  displayFormat?: string;
  margin?: "normal" | "none" | "dense" | undefined;
  name: string;
  id?: string;
  label?: string;
  ariaLabel?: string;
}

interface IProps {
  dateString?: boolean;
  options?: DatePickerOptions;
  onChange: (date: Moment | string, fieldName: string) => void;
}

const defaultPickerOptions: DatePickerOptions = {
  variant: 'dialog',
  format: 'YYYY-MM-DD',
  displayFormat: 'LL',
  margin: 'normal',
  name: 'datePicker',
  id: 'date-picker',
  label: 'Select date',
  ariaLabel: 'change date',
};

export default function DatePicker(props: IProps) {
  const [selectedDate, setSelectedDate] = React.useState<Moment | null>(moment(new Date()));
  const [pickerOptions, setPickerOptions] = React.useState<DatePickerOptions>(defaultPickerOptions);

  React.useEffect( () => {
    setPickerOptions({...pickerOptions, ...props.options});
  } , [props.options]);

  const handleDateChange = (date: Moment | null): void => {
    if(!date) return;
    let pickedDate: Moment | string = date;
    setSelectedDate(pickedDate);
    if (props.dateString) {
      pickedDate = date.format(pickerOptions.format);
    }
    props.onChange(pickedDate, pickerOptions.name);
  };

  return (
    <MuiPickersUtilsProvider utils={DateMomentUtils}>

      <KeyboardDatePicker
        disableToolbar
        format={pickerOptions.displayFormat}
        margin={pickerOptions.margin}
        id={pickerOptions.id}
        label={pickerOptions.label}
        value={selectedDate}
        onChange={handleDateChange}
        name={pickerOptions.name}
        KeyboardButtonProps={{
          'aria-label': pickerOptions.ariaLabel,
        }}
      />

    </MuiPickersUtilsProvider>
  )
}
