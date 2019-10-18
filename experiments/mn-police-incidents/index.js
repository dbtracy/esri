require([
  "dojo/request",
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/GraphicsLayer",
  "esri/Graphic"
], function (request, Map, MapView, GraphicsLayer, Graphic) {
  const map = new Map({
    basemap: "streets"
  })

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-93.2650, 44.9778],
    zoom: 13
  })

  let graphicsLayer = new GraphicsLayer()
  map.add(graphicsLayer)

  const getData = async (req, res, next) => {
    console.log(res)
    try {
      const data = await request.get("https://services.arcgis.com/afSMGVsC7QlRK1kZ/arcgis/rest/services/Police_Incidents_2018_PIMS/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json", {
        headers: {
          "X-Requested-With": null,
        }
      })
      if (data) {
        let incidentData = JSON.parse(data)
        const incidents = incidentData.features.map(incident => {

          // console.log(incidents)
          let incidentLocation = {
            type: "point",
            longitude: incident.geometry.x,
            latitude: incident.geometry.y,
          }

          let incidentMarker = {
            type: "simple-marker",
            color: [0, 150, 50],
            outline: {
              color: [255, 255, 255],
              width: 2
            },
            size: 8
          }

          let incidentGraphic = new Graphic({
            geometry: incidentLocation,
            symbol: incidentMarker,
          })

          return incidentGraphic
        })
        console.log(incidentData)
        console.log(incidents)
        graphicsLayer.addMany(incidents)
      } else {
        console.log('STILL GOT PROBLEMS')
      }
    } catch (error) {
      console.log('Oh noes!!!', error)
    }
  }
  getData()
})


