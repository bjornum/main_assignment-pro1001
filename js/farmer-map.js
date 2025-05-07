/* ===== An free option vs Google API ===== */

// Braastad Gaard coordinates
const braastadGaard = [60.7211, 10.7115];

// Created a map and set the view
const map = L.map("map").setView(braastadGaard, 13);

// Adding OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

// Adding an marker
L.marker(braastadGaard).addTo(map).bindPopup("Braastad Gaard").openPopup();
