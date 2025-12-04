declare module 'react-datepicker' {
  import { ComponentType } from 'react';
  
  export interface ReactDatePickerProps {
    selected?: Date | null;
    onChange: (date: Date | null) => void;
    onMonthChange?: (date: Date) => void;
    onYearChange?: (date: Date) => void;
    dateFormat?: string;
    showMonthDropdown?: boolean;
    showYearDropdown?: boolean;
    dropdownMode?: 'scroll' | 'select';
    placeholderText?: string;
    className?: string;
    maxDate?: Date;
    minDate?: Date;
    yearDropdownItemNumber?: number;
    scrollableYearDropdown?: boolean;
    inline?: boolean;
  }
  
  const DatePicker: ComponentType<ReactDatePickerProps>;
  export default DatePicker;
}

declare module 'react-datepicker/dist/react-datepicker.css';
