// Shared by every routes/<slug>/map.html. Draws that folder's track.json on a Leaflet map,
// with the elevation profile under it. track.json holds bare coordinates and nothing else:
// GeoJSON lines of [longitude, latitude] points, some with a third value, elevation in metres.

fetch("track.json").then(response => response.json()).then(track => {
  const days = track.features.map(feature => feature.geometry.coordinates);   // one line per day
  drawProfile(days);   // first, because the strip takes its height from the map
  drawMap(days);
});

// Elevation against distance: x is kilometres along the drawn line, the days joined end to end.
function drawProfile(days) {
  const rad = Math.PI / 180;
  const km = (a, b) => 2 * 6371 * Math.asin(Math.sqrt(
    Math.sin((b[1] - a[1]) * rad / 2) ** 2 +
    Math.cos(a[1] * rad) * Math.cos(b[1] * rad) * Math.sin((b[0] - a[0]) * rad / 2) ** 2));
  let total = 0;
  const profiles = days.map(day => {
    const samples = [];                                    // [km, metres]
    day.forEach((point, i) => {
      if (i) total += km(day[i - 1], point);
      if (point.length === 3) samples.push([total, point[2]]);
    });
    return samples;
  });
  const heights = profiles.flat().map(sample => sample[1]);
  if (!heights.length) return;                             // a track without elevation: map only
  const low = Math.min(...heights), high = Math.max(...heights);

  // The drawing is 1000 wide and 100 tall; map.css stretches it to the strip.
  const x = d => (1000 * d / total).toFixed(1);
  const y = h => (100 - 100 * (h - low) / (high - low || 1)).toFixed(1);
  const path = profiles.map(samples => samples.map(([d, h], i) => `${i ? "L" : "M"}${x(d)} ${y(h)}`).join(" ")).join(" ");
  document.querySelector("#profile path").setAttribute("d", path);
  document.getElementById("high").textContent = `${high} m`;
  document.getElementById("low").textContent = `${low} m`;

  // Distance axis: a label at every round number of kilometres, about four in all.
  const step = [1, 2, 5, 10, 20, 50, 100, 200, 500].find(s => total / s <= 5) || 1000;
  for (let d = 0; d <= total; d += step) {
    const label = document.createElement("span");
    label.textContent = d + step > total ? `${d} km` : d;
    label.style.left = `${100 * d / total}%`;
    document.getElementById("ticks").append(label);
  }
  document.getElementById("profile").hidden = false;
}

function drawMap(days) {
  const lines = days.map(day => day.map(([lon, lat]) => [lat, lon]));   // Leaflet wants [lat, lon]
  const newTab = 'target="_blank" rel="noopener noreferrer"';

  // Scrolling the page must not zoom a map embedded in it; the full-screen map does zoom.
  const map = L.map("map", { scrollWheelZoom: window === window.top });
  map.attributionControl.setPrefix(`<a href="https://leafletjs.com" ${newTab}>Leaflet</a>`);
  const street = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: `&copy; <a href="https://www.openstreetmap.org/copyright" ${newTab}>OpenStreetMap</a> contributors`,
  }).addTo(map);
  const topo = L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
    maxZoom: 17,
    attribution: `Map data: &copy; <a href="https://www.openstreetmap.org/copyright" ${newTab}>OpenStreetMap</a> contributors, SRTM | ` +
                 `Map style: &copy; <a href="https://opentopomap.org" ${newTab}>OpenTopoMap</a> (CC-BY-SA)`,
  });
  L.control.layers({ "Street map": street, "Topographic": topo }, null, { collapsed: false }).addTo(map);

  // The route: a dark-red line on a white edge, with a dot at each end of each day.
  const red = "#8a1c1c";
  L.polyline(lines, { color: "#fff", weight: 6, opacity: 0.85, interactive: false }).addTo(map);
  const route = L.polyline(lines, { color: red, weight: 3, interactive: false }).addTo(map);
  for (const line of lines) {
    for (const end of [line[0], line[line.length - 1]]) {
      L.circleMarker(end, { radius: 4, color: red, weight: 2, fillColor: "#fff", fillOpacity: 1, interactive: false }).addTo(map);
    }
  }
  // Open on the whole route. The view is centred on the middle of its bounding box, never on an end.
  map.fitBounds(route.getBounds(), { padding: [16, 16] });
}
