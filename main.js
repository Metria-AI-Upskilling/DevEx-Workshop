import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Markers array (Feature 1)
let markers = [];
let nextId = 1;
let leafletMap = null;
let pendingLatLng = null; // set on map click, cleared after marker is named and added

// Current filter (Feature 2)
let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
    init();
});

function init() {
    // Initialise Leaflet map centred on Luleå
    leafletMap = L.map('map').setView([65.5848, 22.1567], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(leafletMap);

    // Map click sets pending location and focuses the name input
    leafletMap.on('click', (e) => {
        pendingLatLng = e.latlng;
        const input = document.getElementById('markerNameInput');
        input.focus();
        input.placeholder = 'Name this location...';
    });

    // Wire up input and clear button
    const markerNameInput = document.getElementById('markerNameInput');
    const clearSelectionBtn = document.getElementById('clearSelectionBtn');

    markerNameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addMarker();
    });

    clearSelectionBtn.addEventListener('click', clearSelection);

    // Wire up filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => setFilter(btn.dataset.filter));
    });

    renderMarkerList();
}

// Feature 1: Add, focus, delete markers
function addMarker() {
    const input = document.getElementById('markerNameInput');
    const name = input.value.trim();

    if (!pendingLatLng || name === '') return;

    // Use a CSS divIcon to avoid Vite asset-path issues with Leaflet's default images
    const icon = L.divIcon({
        className: 'custom-marker',
        html: '<div class="marker-pin"></div>',
        iconSize: [20, 28],
        iconAnchor: [10, 28]
    });

    const leafletMarker = L.marker([pendingLatLng.lat, pendingLatLng.lng], { icon })
        .addTo(leafletMap)
        .bindPopup(escapeHtml(name));

    markers.push({
        id: nextId++,
        name,
        lat: pendingLatLng.lat,
        lng: pendingLatLng.lng,
        category: 'none',
        leafletMarker
    });

    input.value = '';
    input.placeholder = 'Click map, then name it...';
    pendingLatLng = null;

    renderMarkerList();
}

function deleteMarker(id) {
    const marker = markers.find(m => m.id === id);
    if (marker) marker.leafletMarker.remove();
    markers = markers.filter(m => m.id !== id);
    renderMarkerList();
}

function focusMarker(id) {
    const marker = markers.find(m => m.id === id);
    if (marker) {
        leafletMap.setView([marker.lat, marker.lng], 15);
        marker.leafletMarker.openPopup();
    }
}

function toggleCategory(id) {
    const marker = markers.find(m => m.id === id);
    if (!marker) return;

    const cycle = { none: 'favorites', favorites: 'visited', visited: 'none' };
    marker.category = cycle[marker.category];
    renderMarkerList();
}

// Feature 1: Render marker list
function renderMarkerList() {
    const markerList = document.getElementById('markerList');
    const filteredMarkers = getFilteredMarkers();

    markerList.innerHTML = '';

    filteredMarkers.forEach(marker => {
        const li = document.createElement('li');
        li.className = 'marker-item';

        const categoryLabel = marker.category === 'none' ? '—' : marker.category;

        li.innerHTML = `
            <span class="marker-name">${escapeHtml(marker.name)}</span>
            <span class="marker-category ${marker.category}">${categoryLabel}</span>
            <button class="marker-delete">Delete</button>
        `;

        li.querySelector('.marker-name').addEventListener('click', () => focusMarker(marker.id));
        li.querySelector('.marker-category').addEventListener('click', () => toggleCategory(marker.id));
        li.querySelector('.marker-delete').addEventListener('click', () => deleteMarker(marker.id));

        markerList.appendChild(li);
    });
}

// Feature 2: Filter markers based on current filter
function getFilteredMarkers() {
    if (currentFilter === 'favorites') {
        return markers.filter(m => m.category === 'favorites');
    } else if (currentFilter === 'visited') {
        return markers.filter(m => m.category === 'visited');
    }
    return markers; // 'all'
}

// Feature 2: Set filter and update UI
function setFilter(filter) {
    currentFilter = filter;

    // Update button styling
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === filter) {
            btn.classList.add('active');
        }
    });

    renderMarkerList();
}

function clearSelection() {
    pendingLatLng = null;
    const input = document.getElementById('markerNameInput');
    input.value = '';
    input.placeholder = 'Click map, then name it...';
}

// Utility function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
