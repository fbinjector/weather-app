window.addEventListener('load', () => {
  let longitude, latitude;
  let tempDes = document.querySelector('.temperature-description');
  let tempDeg = document.querySelector('.temperature-degree');
  let tempspan = document.querySelector('.degree-section span');
  let tempsec = document.querySelector('.degree-section');
  let loc = document.querySelector('.location-timezone');
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      //console.log(position);
      longitude = position.coords.longitude;
      latitude = position.coords.latitude;
      let proxy = 'http://cors-anywhere.herokuapp.com/';
      let api = `${proxy}https://api.darksky.net/forecast/4528bb967d37b213b232232dfcfefe2e/${latitude},${longitude}`;
      fetch(api)
        .then(response => {
          return response.json()
        })
        .then(data => {
          console.log(data);
          let { temperature, icon, summary } = data.currently;
          tempDeg.textContent = temperature;
          tempDes.textContent = summary;
          loc.textContent = data.timezone;
          setIcon(icon, document.querySelector('.icon'));
          let celsius = Math.ceil((temperature - 32) * (5 / 9));
          tempspan.textContent = 'C';
          tempDeg.textContent = celsius;
          tempsec.addEventListener('click', () => {
            if (tempspan.textContent === 'C') {
              tempspan.textContent = 'F';
              tempDeg.textContent = temperature;
            } else {
              tempspan.textContent = 'C';
              tempDeg.textContent = celsius;
            }
          });
        });
    });
  } else {
    tempDes.textContent = "you must enable your geo location :)";
  }
  function setIcon(icon, id) {
    let skycons = new Skycons({ color: 'white' });
    let currentIcon = icon.replace(/-/g, '_').toUpperCase();
    skycons.play();
    return skycons.set(id, Skycons[currentIcon])
  }
});

