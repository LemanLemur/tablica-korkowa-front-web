import React from "react";

export default function TimeStamp(time, props) {
  var time = new Date(props.unix ? time*1000 : time);
  var year, month, day, hours, minutes, seconds, Milliseconds,

  return (
    <div>
        {}
    </div>
  );
}
