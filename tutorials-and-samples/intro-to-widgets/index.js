require(["esri/Map", "esri/views/MapView", "esri/widgets/BasemapToggle"], function (Map, MapView, BasemapToggle) {
  let map = new Map({
    basemap: "topo"
  })

  let view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-86.049, 38.485],
    zoom: 3
  })

  let toggle = new BasemapToggle({
    view: view,
    nextBasemap: "hybrid"
  })

  view.ui.add(toggle, "top-right")
})
