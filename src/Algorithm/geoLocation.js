export let currentPos;

export function fetchCurrentPos() {
  return new Promise((resolve, reject) => {
    window.navigator.geolocation.getCurrentPosition(
      function (pos) {
        resolve({ lng: pos.coords.longitude, lat: pos.coords.latitude });
        /* distance(
          
          Number(this.lng),
          Number(this.lat)
        ); */
      },
      function (e) {
        console.log('Taking Random Point');
        resolve({ lng: 6.4088, lat: 53.25 });
      }
    );
  })
    .then((data) => {
      currentPos = data;
    })
    .catch((e) => {
      console.error("Click on Filter Again!");
    });
}

export function distance(lon1, lat1) {
  // let currPos = { lng: 75.7825536, lat: 11.2918528 };
  console.log("[CurrentPos] :: ", currentPos);
  if (currentPos) {
    const { lng: lon2, lat: lat2 } = currentPos;
    var R = 6371; // Radius of the earth in km
    var dLat = (lat2 - lat1).toRad(); // Javascript functions in radians
    var dLon = (lon2 - lon1).toRad();
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1.toRad()) *
        Math.cos(lat2.toRad()) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    console.log("Distance", d);
    return d;
  }
}

/** Converts numeric degrees to radians */
if (typeof Number.prototype.toRad === "undefined") {
  Number.prototype.toRad = function () {
    return (this * Math.PI) / 180;
  };
}
