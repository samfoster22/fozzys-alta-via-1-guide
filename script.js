// --- 1. Initialize the Map ---
const map = L.map('mapid').setView([46.4900, 12.1000], 10); // Centered roughly on the Dolomites

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
}).addTo(map);

// --- 2. Define Wild Camping Route Stages (approx. 12-15 miles / 19-24 km per day) ---
// Note: These are simplified stage descriptions and coordinates for demonstration.
// For a real app, you'd want more precise data and potentially GPX tracks.
// 'popupImage' is used for images in the map popups for start/end points.
const wildCampingStages = [
    {
        name: "Day 1: Lago di Braies to Col de Lasta/Forcella Sora Forno area",
        distance: "Approx. 20 km (12.4 miles)",
        elevation: "Ascent: ~1000m / Descent: ~500m",
        description: "A long initial day, passing through Seekofel Hut (Rifugio Sennes is an option for water/resupply). The goal is to push past the popular huts to find a suitable wild camping spot before or around Col de Lasta/Forcella Sora Forno.",
        start: [46.6946, 12.0833], // Lago di Braies
        end: [46.5900, 12.1800], // Approx area between Sennes and Fodara Vedla
        coords: [ // Simplified path coordinates for map
            [46.6946, 12.0833], // Lago di Braies
            [46.6669, 12.0792], // Malga Foresta
            [46.6346, 12.1039], // Rifugio Biella
            [46.6200, 12.1200], // Forcella Portella
            [46.6000, 12.1500], // Rifugio Sennes general area
            [46.5900, 12.1800] // Col de Lasta area
        ],
        popupImage: "images/braies.jpg" // Image for start point popup
    },
    {
        name: "Day 2: Col de Lasta/Forcella Sora Forno area to Croda del Becco (Seekofel)",
        distance: "Approx. 19 km (11.8 miles)",
        elevation: "Ascent: ~800m / Descent: ~1000m",
        description: "Continuing south, this day involves significant descent and then a climb towards the Croda del Becco (Seekofel) area, possibly aiming for a high pass or sheltered spot near the base of the peak for camping.",
        start: [46.5900, 12.1800],
        end: [46.5300, 12.0900], // Near Croda del Becco / Rifugio Lavarella / Fanes area
        coords: [
            [46.5900, 12.1800], // Start of day 2
            [46.5500, 12.1600], // Vallone di Rudo
            [46.5300, 12.0900] // Near Rifugio Fanes / Lavarella
        ],
        popupImage: "images/fanes.jpg" // Image for end point popup
    },
    {
        name: "Day 3: Croda del Becco area to Rifugio Lagazuoi area",
        distance: "Approx. 22 km (13.7 miles)",
        elevation: "Ascent: ~1200m / Descent: ~800m",
        description: "A challenging but rewarding day crossing several passes, aiming for a spot in the vicinity of Rifugio Lagazuoi. This involves passing through the stunning Fanes group. Water sources at huts along the way.",
        start: [46.5300, 12.0900],
        end: [46.5200, 12.0000], // Near Rifugio Lagazuoi
        coords: [
            [46.5300, 12.0900], // Start of Day 3
            [46.5000, 12.0500], // Passo di Limo
            [46.5050, 12.0200], // Forcella del Lago
            [46.5200, 12.0000] // Lagazuoi area
        ],
        popupImage: "images/lagazuoi.jpg" // Image for end point popup
    },
    {
        name: "Day 4: Rifugio Lagazuoi area to Civetta group approach (near Coldai/Vazzoler)",
        distance: "Approx. 24 km (14.9 miles)",
        elevation: "Ascent: ~900m / Descent: ~1500m",
        description: "A long day with significant descent from Lagazuoi, passing through the Cinque Torri area and then towards the Pelmo/Civetta group. Look for spots before reaching the busiest huts like Coldai or Vazzoler.",
        start: [46.5200, 12.0000],
        end: [46.3900, 12.0800], // Near Rifugio Coldai / Vazzoler approach
        coords: [
            [46.5200, 12.0000], // Start of Day 4
            [46.5000, 12.0000], // Passo Falzarego
            [46.4900, 12.0400], // Cinque Torri area
            [46.4600, 12.0600], // Passo Giau
            [46.4100, 12.0900], // Forcella Staulanza
            [46.3900, 12.0800] // Towards Coldai/Vazzoler
        ],
        popupImage: "" // No image for this one
    },
    {
        name: "Day 5: Civetta group to Val di Zoldo / Passo Duran area",
        distance: "Approx. 20 km (12.4 miles)",
        elevation: "Ascent: ~700m / Descent: ~1200m",
        description: "Traversing the base of the impressive Civetta massif, then descending towards the Val di Zoldo and climbing towards Passo Duran. Potential camping spots before or after the pass.",
        start: [46.3900, 12.0800],
        end: [46.3300, 12.1600], // Near Passo Duran
        coords: [
            [46.3900, 12.0800], // Start of Day 5
            [46.3700, 12.1000], // Rifugio Tissi
            [46.3500, 12.1200], // Rifugio Vazzoler
            [46.3300, 12.1600] // Passo Duran area
        ],
        popupImage: "" // No image for this one
    },
    {
        name: "Day 6: Passo Duran area to Bivacco Pian de Fontana / Pramper group",
        distance: "Approx. 21 km (13.0 miles)",
        elevation: "Ascent: ~1000m / Descent: ~900m",
        description: "A rugged day through wilder terrain, passing near Rifugio Carestiato and heading into the Pramper group. Bivacco Pian de Fontana is an emergency shelter, but wild camping spots might be found nearby.",
        start: [46.3300, 12.1600],
        end: [46.2500, 12.2100], // Near Bivacco Pian de Fontana
        coords: [
            [46.3300, 12.1600], // Start of Day 6
            [46.3100, 12.1600], // Rifugio Carestiato
            [46.2800, 12.1900], // Forcella Moschesin
            [46.2500, 12.2100] // Pian de Fontana area
        ],
        popupImage: "" // No image for this one
    },
    {
        name: "Day 7: Bivacco Pian de Fontana to Belluno (End of AV1)",
        distance: "Approx. 23 km (14.3 miles)",
        elevation: "Ascent: ~300m / Descent: ~1500m",
        description: "The final push, mostly downhill towards La Pissa and then a bus or walk into Belluno. A celebratory finish to your wild camping adventure!",
        start: [46.2500, 12.2100],
        end: [46.1367, 12.2144], // Belluno center
        coords: [
            [46.2500, 12.2100], // Start of Day 7
            [46.2200, 12.2000], // Porta Forcella
            [46.1800, 12.2000], // Case Biesena
            [46.1600, 12.2100], // La Pissa
            [46.1367, 12.2144] // Belluno
        ],
        popupImage: "" // No image for this one
    }
];

// --- 3. Dynamically Load Stages into the HTML (Overview Cards and Map Markers) ---
const stagesContentDiv = document.getElementById('stages-content');
stagesContentDiv.innerHTML = ''; // Clear the "Loading..." message

wildCampingStages.forEach(stage => {
    const stageCard = document.createElement('div');
    stageCard.classList.add('stage-card');
    stageCard.innerHTML = `
        <h3>${stage.name}</h3>
        <p><strong>Distance:</strong> ${stage.distance}</p>
        <p><strong>Elevation:</strong> ${stage.elevation}</p>
        <p>${stage.description}</p>
    `;
    stagesContentDiv.appendChild(stageCard);

    // Prepare popup content for the start marker
    let startPopupContent = `<b>${stage.name}</b><br>Start of Day`;
    if (stage.popupImage) {
        startPopupContent += `<br><img src="${stage.popupImage}" alt="${stage.name} Start" style="max-width: 150px; height: auto; margin-top: 5px;">`;
    }
    L.marker(stage.start).addTo(map)
        .bindPopup(startPopupContent);

    // Prepare popup content for the end marker (using the same image for simplicity, or add a specific 'endPopupImage' if different image is needed)
    let endPopupContent = `<b>${stage.name}</b><br>End of Day`;
    if (stage.popupImage) {
        endPopupContent += `<br><img src="${stage.popupImage}" alt="${stage.name} End" style="max-width: 150px; height: auto; margin-top: 5px;">`;
    }
    L.marker(stage.end).addTo(map)
        .bindPopup(endPopupContent);

    // Add a polyline for the simplified stage path
    L.polyline(stage.coords, {color: 'blue', weight: 3, opacity: 0.7}).addTo(map);
});


// --- 4. Dynamically Load Day by Day Itinerary (Detailed Cards) ---
const itineraryDetailsDiv = document.getElementById('itinerary-details');
itineraryDetailsDiv.innerHTML = ''; // Clear the "Loading..." message

wildCampingStages.forEach((stage, index) => {
    const dayCard = document.createElement('div');
    dayCard.classList.add('itinerary-card'); // Using a new class for styling
    dayCard.innerHTML = `
        <h3>Day ${index + 1}: ${stage.name}</h3>
        <p><strong>Distance:</strong> ${stage.distance}</p>
        <p><strong>Elevation:</strong> ${stage.elevation}</p>
        <p>${stage.description}</p>
        <p><em>Starting Coordinates:</em> ${stage.start[0].toFixed(4)}, ${stage.start[1].toFixed(4)}</p>
        <p><em>Ending Coordinates:</em> ${stage.end[0].toFixed(4)}, ${stage.end[1].toFixed(4)}</p>
    `;
    itineraryDetailsDiv.appendChild(dayCard);
});

// --- NEW: Data for Key Route Points & Distances List ---
const keyRouteDistances = [
    { from: "Lago di Braies (Start)", to: "Rifugio Biella", distance: "Approx. 5 km", time: "2-3 hours" },
    { from: "Rifugio Biella", to: "Rifugio Sennes area", distance: "Approx. 10 km", time: "4-5 hours" },
    { from: "Rifugio Sennes area", to: "Rifugio Fanes / Lavarella area", distance: "Approx. 8 km", time: "3-4 hours" },
    { from: "Rifugio Fanes / Lavarella area", to: "Rifugio Lagazuoi area", distance: "Approx. 12 km", time: "5-6 hours" },
    { from: "Rifugio Lagazuoi area", to: "Passo Giau / Cinque Torri area", distance: "Approx. 13 km", time: "4-5 hours" },
    { from: "Passo Giau / Cinque Torri area", to: "Rifugio Coldai / Civetta Base", distance: "Approx. 11 km", time: "4-5 hours" },
    { from: "Rifugio Coldai / Civetta Base", to: "Passo Duran area", distance: "Approx. 10 km", time: "3-4 hours" },
    { from: "Passo Duran area", to: "Bivacco Pian de Fontana", distance: "Approx. 12 km", time: "4-5 hours" },
    { from: "Bivacco Pian de Fontana", to: "Belluno (End)", distance: "Approx. 23 km", time: "6-7 hours" }
];

// --- NEW: Dynamically Load Key Route Points & Distances List ---
const distanceListDiv = document.getElementById('distance-list');
distanceListDiv.innerHTML = ''; // Clear the "Loading..." message

keyRouteDistances.forEach(point => {
    const listItem = document.createElement('div');
    listItem.classList.add('distance-card'); // Using a new class for styling
    listItem.innerHTML = `
        <h3>From ${point.from} to ${point.to}</h3>
        <p><strong>Distance:</strong> ${point.distance}</p>
        <p><strong>Estimated Time:</strong> ${point.time}</p>
    `;
    distanceListDiv.appendChild(listItem);
});