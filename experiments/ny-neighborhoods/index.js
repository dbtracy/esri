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

  const fillSymbol = {
    type: "simple-fill",
    color: [50, 100, 255, .5],
    outline: {
      color: [50, 100, 255],
      width: 1
    },
    style: "backward-diagonal"
  }

  let crownHeights = new Graphic({
    geometry: crownHeightsPolygon,
    symbol: fillSymbol,
    attributes: {
      Name: "Crown Heights"
    },
    popupTemplate: {
      title: "Crown Heights"
    }
  })

  graphicsLayer.add(crownHeights)
})

