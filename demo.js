import * as React from 'react';
import { XDate, generateTimeObject } from './xdate';


export default function MaterialUIPickers() {
  const [resourceDate, setResourceDate] = React.useState({})


  return (
    <div>
      Support <br /> <br />
      <XDate
        startDate = {"2022-08-01T08:00:00+0100"}
        endDate = {"2202-08-08T16:00:00+0100"}
        timeZone = "Europe/Paris"
        timeEnabled = {false}
        disableShowTimeSwitch={false}
        onChange={(target) => {
          setResourceDate(target)
          console.log(target)
          console.log(target.startDate.toISOString('en-GB', 'Europe/London'))
          console.log(target.startDate.toLocaleDateString('en-GB'))
        }}
      />

      <pre>{JSON.stringify(resourceDate, null, 2)}</pre>



    </div>
  );
}
