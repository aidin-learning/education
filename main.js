// token
mapboxgl.accessToken = "pk.eyJ1IjoiYWlkaW56IiwiYSI6ImNtbjJ5aml2cDFhcXEyb3E0MmZzYzV5cG8ifQ.68K1uESJ_wzcXcbHNqVRVA"

//1. create map
// ===================
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/standard-satellite', // style URL
    center: [100.42820114054234, 13.74011856687252], // starting position [lng, lat]
    zoom: 5, // starting zoom
    projection: 'mercator' // map projection
});

// =====================================
// 2) Add map controls
// =====================================
map.addControl(new mapboxgl.NavigationControl(), 'top-right');
map.addControl(new mapboxgl.ScaleControl(), 'bottom-left');

// =====================================
// 3) Load vector tileset and add layer
// =====================================
map.on('load', () => {
    console.log('Map loaded');

    map.addSource('roads-source', {
        type: 'vector',
        url: 'mapbox://aidinz.3f6orai8h9q8'
    });

    console.log('Source added');

    map.addLayer({
        id: 'roads-layer',
        type: 'line',
        source: 'roads-source',
        'source-layer': '1359ed1b05a388eae02d',
        minzoom: 0,
        maxzoom: 15,
        layout: {
            'visibility': 'none'
        },
        paint: {
            'line-color': '#ff4d4d',
            'line-width': 2,
            'line-opacity': 0.9
        }
    });

    console.log('Layer added');

    // =====================================
    //  homework Add capital layer
    // =====================================
    map.addSource('capital-world', {
        type: 'vector',
        url: 'mapbox://aidinz.kelxct2n'
    });

    console.log('Capital source added');

    map.addLayer({
        id: 'capital-layer',
        type: 'circle',
        source: 'capital-world',
        'source-layer': 'capital.zip-gq8sxvx6',
        minzoom: 0,
        maxzoom: 15,
        layout: {
            'visibility': 'none'
        },
        paint: {
            'circle-color': '#fffb00',
            'circle-radius': 6,
            'circle-opacity': 0.9
        }
    });

    console.log('Capital layer added');

    // =====================================
    //  homework Add country layer
    // =====================================

    map.addSource('country-world', {
        type: 'vector',
        url: 'mapbox://aidinz.d20avydk'
    });

    console.log('Country source added');

    map.addLayer({
        id: 'country-layer',
        type: 'fill',
        source: 'country-world',
        layout: {
            'visibility': 'none'
        },
        'source-layer': 'country.zip-xjcwxwna',
        minzoom: 0,
        maxzoom: 15,
        paint: {
            'fill-color': '#00ff40',
            'fill-opacity': 0.3,
                'fill-outline-color': '#000000'
        }
    });

    console.log('Country layer added');
});


// =====================================
// 4) Popup on click
// =====================================
map.on('click', 'roads-layer', (e) => {
    const feature = e.features[0];
    const props = feature.properties || {};

    const popupHTML = `
        <div style="font-size: 13px; line-height: 1.5;">
            <b>Road feature</b><br>
            <pre style="margin: 6px 0 0; white-space: pre-wrap;">${JSON.stringify(props, null, 2)}</pre>
        </div>
    `;

    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(popupHTML)
        .addTo(map);
});

// =====================================
// 5) Change cursor on hover
// =====================================
map.on('mouseenter', 'roads-layer', () => {
    map.getCanvas().style.cursor = 'pointer';
});

map.on('mouseleave', 'roads-layer', () => {
    map.getCanvas().style.cursor = '';
});

// =====================================
// homework Layer toggle checkboxes
// =====================================
document.getElementById('roads-toggle').addEventListener('change', (e) => {
    const visibility = e.target.checked ? 'visible' : 'none';
    map.setLayoutProperty('roads-layer', 'visibility', visibility);
});

document.getElementById('capital-toggle').addEventListener('change', (e) => {
    const visibility = e.target.checked ? 'visible' : 'none';
    map.setLayoutProperty('capital-layer', 'visibility', visibility);
});

document.getElementById('country-toggle').addEventListener('change', (e) => {
    const visibility = e.target.checked ? 'visible' : 'none';
    map.setLayoutProperty('country-layer', 'visibility', visibility);
});
