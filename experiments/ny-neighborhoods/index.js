require([
  "esri/Map",
  "esri/views/MapView",
  "esri/Graphic",
  "esri/layers/GraphicsLayer",
  "esri/geometry/Polyline"
], function (Map, MapView, Graphic, GraphicsLayer, PopupTemplate, Polyline) {

  const map = new Map({
    basemap: "streets"
  })

  const view = new MapView({
    container: "viewDiv",
    map: map,
    zoom: 14,
    center: [-73.940162906, 40.657830702]
  })

  const graphicsLayer = new GraphicsLayer()
  map.add(graphicsLayer)

  const crownHeightsPolygon = {
    type: "polygon",
    rings: [
      [-73.964348, 40.681094],
      [-73.952440, 40.678527],
      [-73.921858, 40.676830],
      [-73.922769, 40.667090],
      [-73.930724, 40.663615],
      [-73.932591, 40.663452],
      [-73.945531, 40.664168],
      [-73.960893, 40.663289],

    ]
  }

  const crownHeightsFill = {
    type: "simple-fill",
    color: [50, 100, 255, .5],
    outline: {
      color: [50, 100, 255],
      width: 1
    },
    style: "forward-diagonal"
  }

  let crownHeights = new Graphic({
    geometry: crownHeightsPolygon,
    symbol: crownHeightsFill,
    attributes: {
      Name: "Crown Heights"
    },
    popupTemplate: {
      title: "{Name}"
    }
  })

  const bedStuyPolygon = {
    type: "polygon",
    rings: [
      [-73.958223, 40.679849], // atlantic and classon
      [-73.961904, 40.697755],
      [-73.961882, 40.698161],
      [-73.957011, 40.698967],
      [-73.941936, 40.700724],
      [-73.918011, 40.687170],
      [-73.916386, 40.678905],
      [-73.916284, 40.678575],
      [-73.916471, 40.676635],
      [-73.952440, 40.678616]
    ]
  }

  const bedStuyFill = {
    type: "simple-fill",
    color: [50, 100, 255, .5],
    outline: {
      color: [50, 100, 255],
      width: 1
    },
    style: "backward-diagonal"
  }

  const bedStuy = new Graphic({
    geometry: bedStuyPolygon,
    symbol: bedStuyFill,
    attributes: {
      Name: "Bedford-Stuyvesant"
    },
    popupTemplate: {
      title: "{Name}"
    }
  })

  graphicsLayer.add(crownHeights)
  graphicsLayer.add(bedStuy)
})

