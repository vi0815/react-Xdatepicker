import * as React from 'react';
import { XDate, generateTimeObject } from './xdate';


export default function MaterialUIPickers() {
  const [resourceDate, setResourceDate] = React.useState({})


  return (
    <div>
      Support <br /> <br />
      <XDate
        startDate = {"2022-08-01"}
        endDate = {"2202-08-08"}
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
