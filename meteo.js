async function getConfig() {
  const response = await fetch("conf.json");
  const data = await response.json();
  return data;
}

async function getMeteo(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`;
  const response = await fetch(url);
  const data = await response.json();
  console.log("Données météo récupérées :", data);
  return data.current_weather;
}

function afficherMeteo(meteo) {
  const meteoDiv = document.getElementById("meteo");
  let symbole = meteo.temperature > 15 ? "☀️" : "❄️";
  meteoDiv.innerHTML = `${symbole} ${meteo.temperature}°C<br>Vent : ${meteo.windspeed} km/h`;
}

async function majMeteo() {
  const config = await getConfig();
  const meteo = await getMeteo(config.latitude, config.longitude);
  document.querySelector(
    ".title"
  ).textContent = `Météo de la ville de ${config.ville}`;
  afficherMeteo(meteo);
}

majMeteo();
setInterval(majMeteo, 60 * 60 * 1000);
