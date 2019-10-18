require([
  "dojo/request",
  "esri/Map",
  "esri/views/MapView"
], function (request, Map, MapView) {
  const map = new Map({
    basemap: "streets"
  })

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-93.2, 44.9],
    zoom: 13
  })

  const getData = async (req, res, next) => {
    try {
      let data = await request.get("https://services.arcgis.com/afSMGVsC7QlRK1kZ/arcgis/rest/services/Police_Incidents_2018_PIMS/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json", {
        headers: {
          "X-Requested-With": null,
          // "Access-Control-Allow-Origin": "*"
        }
      })
      if (data) {
        data = JSON.parse(data)
        console.log(data.features)
      } else {
        console.log('STILL GOT PROBLEMS')
      }
    } catch (error) {
      console.log('Oh noes!!!', error)
    }
  }

  getData()
})
