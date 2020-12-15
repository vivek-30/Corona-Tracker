
let latitude = 0;
let longitude = 0;
let color = "rgb(0,0,0)";

const Plot = () => {
    fetch('../data/countries.json')
    .then(res=>{
        return res.json();
    })
    .then(data => {
        data.data.forEach(country => {
            latitude = country.latitude;
            longitude = country.longitude;

            if(country.dead>500)
                color = "rgb(255,0,0)";
            else
            if(country.dead<50)
                color = "rgb(7, 223, 79)";
            else color = `rgb(${country.dead},0,0)`;

            var popup = new mapboxgl.Popup({ offset: 25 }).setText(
                `location : ${country.location}, confirmed : ${country.confirmed}`
            );

            new mapboxgl.Marker({
                color: color,
                draggable: false
                }).setLngLat([longitude,latitude])
                .setPopup(popup)
                .addTo(map);
        });
    })
    .catch(err => {
        console.log(err);
    });
}

// updates data in every 1 hour
setInterval(Plot(),3600000);