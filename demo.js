import * as React from 'react';
import { XDate, generateTimeObject } from './xdate';


export default function MaterialUIPickers() {
  const [resourceDate, setResourceDate] = React.useState(() => generateTimeObject(
    "2022-08-04", "2022-08-14", "Europe/London", false
  ))


  return (
    <div>
      Support <br /> <br />
      <XDate
        timeObject = {resourceDate}
        disableShowTimeSwitch={false}
        onChange={(target) => {
          setResourceDate(target)
          console.log(target)
        }}
      />



    </div>
  );
}
