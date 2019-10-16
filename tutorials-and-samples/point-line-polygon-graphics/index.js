require([
  "esri/Map",
  "esri/views/MapView",
  "esri/Graphic",
  "esri/layers/GraphicsLayer"
], function (Map, MapView, Graphic, GraphicsLayer) {

  let map = new Map({
    basemap: "topo-vector"
  });

  let view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-118.80500, 34.02700],
    zoom: 13
  });

  let graphicsLayer = new GraphicsLayer()
  map.add(graphicsLayer)

  let point = {
    type: "point",
    longitude: -118.80657463861,
    latitude: 34.0005930608889
  }

  let simpleMarkerSymbol = {
    type: "simple-marker",
    color: [226, 119, 40],
    outline: {
      color: [255, 255, 255],
      width: 1
    }
  }

  let pointGraphic = new Graphic({
    geometry: point,
    symbol: simpleMarkerSymbol
  })

  graphicsLayer.add(pointGraphic)
});
