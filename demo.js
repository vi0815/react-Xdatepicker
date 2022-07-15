import * as React from 'react';
import { XDate, generateTimeObject } from './xdate';


export default function MaterialUIPickers() {
  const [resourceDate, setResourceDate] = React.useState({})


  return (
    <div>
      Support <br /> <br />
      <XDate
        startDate = {"2022-08-01T08:00:00+0100"}
        endDate = {null}
        timeZone = "Europe/Paris"
        timeEnabled = {false}
        disableShowTimeSwitch={false}
        onChange={(target) => {
          setResourceDate(target)
          console.log(target)
        }}
      />

      <pre>{JSON.stringify(resourceDate, null, 2)}</pre>



    </div>
  );
}
