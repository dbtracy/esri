require([
  "esri/Map",
  "esri/views/MapView",
  "esri/Graphic",
  "esri/layers/GraphicsLayer",
  "esri/geometry/Polyline"
], function (Map, MapView, Graphic, GraphicsLayer, Polyline) {

  let map = new Map({
    basemap: "topo-vector"
  });

  let view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-118.80500, 34.01300],
    zoom: 15
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
    color: [0, 150, 50],
    outline: {
      color: [255, 255, 255],
      width: 2
    },
    size: 10
  }

  let attributes = {
    Name: "My point",
    Location: "Point Dume State Beach",
  }

  let popupTemplate = {
    title: "{Name}",
    content: "I am located at <b>{Location}</b>."
  }

  let pointGraphic = new Graphic({
    geometry: point,
    symbol: simpleMarkerSymbol,
    attributes: attributes,
    popupTemplate: popupTemplate
  })

  graphicsLayer.add(pointGraphic)

  let simpleLineSymbol = {
    type: "simple-line",
    color: [255, 0, 0],
    width: 2,
    style: "dash"
  }

  let polyline = new Polyline({
    paths: [
      [-118.821527826096, 34.0139576938577],
      [-118.814893761649, 34.0080602407843],
      [-118.808878330345, 34.0016642996246]
    ]
  })

  let polylineGraphic = new Graphic({
    geometry: polyline,
    symbol: simpleLineSymbol
  })

  graphicsLayer.add(polylineGraphic)

  let polygon = {
    type: "polygon",
    rings: [
      [-118.818984489994, 34.0137559967283],
      [-118.806796597377, 34.0215816298725],
      [-118.791432890735, 34.0163883241613],
      [-118.79596686535, 34.008564864635],
      [-118.808558110679, 34.0035027131376]
    ]
  }

  let simpleFillSymbol = {
    type: "simple-fill",
    color: [50, 100, 255, .5],
    outline: {
      color: [50, 100, 255],
      width: 1
    },
    style: "backward-diagonal"
  }

  let polygonGraphic = new Graphic({
    geometry: polygon,
    symbol: simpleFillSymbol
  })

  graphicsLayer.add(polygonGraphic)

  let pictureGraphic = new Graphic({
    geometry: {
      type: "point",
      longitude: -118.80657463861,
      latitude: 34.0005930608889
    },
    symbol: {
      type: "picture-marker",
      url: "https://developers.arcgis.com/labs/images/bluepin.png",
      width: "14px",
      height: "26px"
    }
  })

  graphicsLayer.add(pictureGraphic)

  let textGraphic = new Graphic({
    geometry: {
      type: "point",
      longitude: -118.80657463861,
      latitude: 34.0005930608889
    },
    symbol: {
      type: "text",
      color: [25, 25, 25],
      haloColor: [255, 255, 255],
      haloSize: "1px",
      text: "This is my location!",
      xoffset: 0,
      yoffset: -25,
      font: {
        size: 12
      }
    }
  })

  graphicsLayer.add(textGraphic)
});
