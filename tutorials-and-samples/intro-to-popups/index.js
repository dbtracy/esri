require(["esri/tasks/Locator", "esri/Map", "esri/views/MapView"], function (Locator, Map, MapView) {
  let locatorTask = new Locator({
    url: "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer"
  })

  let map = new Map({
    basemap: "streets-navigation-vector"
  })

  let view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-71.6899, 43.7598],
    zoom: 12
  })

  view.popup.autoOpenEnabled = false
  view.on("click", function (e) {
    let lat = Math.round(e.mapPoint.latitude * 1000) / 1000
    let lon = Math.round(e.mapPoint.longitude * 1000) / 1000

    view.popup.open({
      title: `Reverse geocode: [${lon}, ${lat}]`,
      location: e.mapPoint
    })



    let params = {
      location: e.mapPoint
    }

    locatorTask
      .locationToAddress(params)
      .then(function (response) {
        view.popup.content = response.address
      })
      .catch(function (error) {
        view.popup.content = "No address was found for this location"
      })
  })
})
