require([
  "dojo/request",
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/GraphicsLayer",
  "esri/layers/FeatureLayer",
  "esri/Graphic",
  "dojo/domReady!"
], function (request, Map, MapView, GraphicsLayer, FeatureLayer, Graphic) {
  let dojoConfig = {
    has: {
      "esri-featurelayer-webgl": 1
    }
  }

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

  // const getData = async (req, res, next) => {
  //   console.log(req)
  //   try {
  //     const data = await request.get("https://services.arcgis.com/afSMGVsC7QlRK1kZ/arcgis/rest/services/Police_Incidents_2018_PIMS/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json", {
  //       headers: {
  //         "X-Requested-With": null
  //       }
  //     })
  //     if (data) {
  //       console.log(data)
  //       let incidentData = JSON.parse(data)
  //       // console.log(incidentData.features)
  //       const incidents = incidentData.features.map(incident => {

  //         let incidentLocation = {
  //           type: "point",
  //           longitude: incident.geometry.x,
  //           latitude: incident.geometry.y,
  //         }

  //         let incidentMarker = {
  //           type: "simple-marker",
  //           color: [0, 150, 50],
  //           outline: {
  //             color: [255, 255, 255],
  //             width: 2
  //           },
  //           size: 8
  //         }

  //         let incAtts = incident.attributes

  //         let attributes = {
  //           Name: `${incAtts.offense}`,
  //           Time: `${incAtts.reportedTime}`,
  //           Address: `${incAtts.publicaddress}`,
  //           Neighborhood: `${incAtts.neighborhood}`,

  //         }

  //         let popupTemplate = {
  //           title: `{Name}`,
  //           content: `<b>{Address}</b>` + "<br/>" +
  //             `<b>{Neighborhood}, Minneapolis, MN</b>`
  //         }

  //         let incidentGraphic = new Graphic({
  //           geometry: incidentLocation,
  //           symbol: incidentMarker,
  //           attributes: attributes,
  //           popupTemplate: popupTemplate
  //         })

  //         return incidentGraphic
  //       })
  //       graphicsLayer.addMany(incidents)
  //     } else {
  //       console.log('STILL GOT PROBLEMS')
  //     }
  //   } catch (error) {
  //     console.log('Oh noes!!!', error)
  //   }
  // }
  // getData()

  let serviceUrl = "https://services.arcgis.com/afSMGVsC7QlRK1kZ/arcgis/rest/services/Police_Incidents_2018_PIMS/FeatureServer/0/"

  const renderer = {
    type: "heatmap",
    colorStops: [
      { color: "rgba(63, 40, 102, 0)", ratio: 0 },
      { color: "#472b77", ratio: 0.083 },
      { color: "#4e2d87", ratio: 0.166 },
      { color: "#563098", ratio: 0.249 },
      { color: "#5d32a8", ratio: 0.332 },
      { color: "#6735be", ratio: 0.415 },
      { color: "#7139d4", ratio: 0.498 },
      { color: "#7b3ce9", ratio: 0.581 },
      { color: "#853fff", ratio: 0.664 },
      { color: "#a46fbf", ratio: 0.747 },
      { color: "#c29f80", ratio: 0.83 },
      { color: "#e0cf40", ratio: 0.913 },
      { color: "#ffff00", ratio: 1 }
    ],
    maxPixelIntensity: 25,
    minPixelIntensity: 0
  };

  let layer = new FeatureLayer({
    url: serviceUrl,
    renderer: renderer
  })
  map.layers.add(layer)
})
