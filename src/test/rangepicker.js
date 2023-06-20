import React from "react";
import { addDays } from "date-fns";
import { useState } from "react";
import { DateRangePicker as ReactDateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

const DateRangePicker = () => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  return (
    <>
      <ReactDateRangePicker
        onChange={(item) => setState([item.selection])}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={2}
        ranges={state}
        calendarWidth={300}
        calendarHeight={300}
        direction="horizontal"
      />
    </>
  );
};

export { DateRangePicker }; // Export the component as a named export

export default DateRangePicker; // Also export the component as a default export
