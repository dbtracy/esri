require(["dojo/request", "esri/Map", "esri/views/MapView", "esri/layers/FeatureLayer"], function (request, Map, MapView, FeatureLayer) {

  // console.log(exports)
  // const data = require('./data')
  // console.log(data)

  const getStations = async (req, res, next) => {
    try {

      // const xhr = new XMLHttpRequest()
      // console.log(xhr.withCredentials)
      // console.log('DOCUMENT:', document.domain)
      // document.domain = 'https://www.ncdc.noaa.gov/cdo-web/api/v2'
      const stations = await request("https://www.ncdc.noaa.gov/cdo-web/api/v2/stations?locationid=FIPS:36&locationcategories?startdate=2018-01-01&enddate=2018-02-01", {
        headers: {
          token: "OCxLuMWjYNsotCAQMUVUBHUeNMleJKiW",
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Headers": "*"
        }
      })
      // res.setHeader("Access-Control-Allow-Headers", "x-requested-with")

      if (stations) {
        console.log(stations.data.results)
        return stations.data.results
      } else {
        return "nothing!"
      }
    } catch (error) {
      console.log('ERROR! OH NOES!:', error.response)
    }
  }

  console.log(getStations())


  // let stationRenderer = {
  //   type: "simple",
  //   symbol: {
  //     type: "point-3d",
  //     symbolLayers: [
  //       {
  //         type: "icon",
  //         outline: {
  //           color: "#444"
  //         },
  //         resource: {
  //           primitive: "x"
  //         },
  //         size: 4
  //       }
  //     ]
  //   }
  // }

  // let stationLayer = new FeatureLayer({
  //   url: stations,
  //   renderer: stationRenderer,
  //   elevationInfo: {
  //     mode: "on-the-ground"
  //   }
  // })

  // console.log(getStations())

  let map = new Map({
    basemap: "topo",
    layers: []
  })

  // let view = new MapView({
  //   container: "viewDiv",
  //   map: map,
  //   // viewingMode: "local",
  //   zoom: 8,
  //   center: [285, 43]
  // })

  // view.whenLayerView(stationLayer).then(function (layerView) {
  //   layerView.watch("updating", function (val) {
  //     if (!val) {  // wait for the layer view to finish updating
  //       layerView.queryExtent().then(function (results) {
  //         view.goTo(results.extent);  // go to the extent of all the graphics in the layer view
  //       });
  //     }
  //   });
  // });
})
