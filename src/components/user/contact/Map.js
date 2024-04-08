import React from "react";

export default function Map() {
  return (
    <div id="map">
      <div id="mappic">
        <iframe
          title="location"
          width="100%"
          height="100%"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
          src="https://maps.google.com/maps?width=100%25&amp;height=90%&amp;hl=en&amp;q=915,914,%20Golden%20Square,%20ABC%20circle,%20Bharuch%20-%20392001,%20Gujarat,%20India+(Head%20Office)&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        >
          <a href="https://www.gps.ie/">gps devices</a>
        </iframe>
      </div>
    </div>
  );
}
