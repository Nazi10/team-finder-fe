"use client";

import { DatePicker as AntDDatePicker } from "antd";
import dateFnsGenerateConfig from "rc-picker/lib/generate/dateFns";

const DatePicker = AntDDatePicker.generatePicker<Date>(dateFnsGenerateConfig);

export default DatePicker;
