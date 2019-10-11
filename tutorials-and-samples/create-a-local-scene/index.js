require(
  ["esri/Map", "esri/views/SceneView", "esri/layers/FeatureLayer", "esri/widgets/Home"],
  function (Map, SceneView, FeatureLayer, Home) {
    let wellsUrl = "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/HarperSumnerOGWells/FeatureServer/0";

    let quakesUrl = "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/ks_earthquakes_since_2000/FeatureServer/0";

    let kansasExtent = {
      xmax: -10834217,
      xmin: -10932882,
      ymax: 4493918,
      ymin: 4432667,
      spatialReference: {
        wkid: 3857
      }
    }



    /*****WELLS POPUP*****/

    let wellsTemplate = {
      title: "WELL",
      content:
        "<b>API No.:</b> {API_NUMBER}<br>" +
        "<b>Lease: </b> {LEASE}<br>" +
        "<b>Operator: </b> {CURR_OPERATOR} km <br>" +
        "<b>Drilled: </b> {SPUD}<br>" +
        "<b>Completed: </b> {COMPLETION}<br>" +
        "<b>Status: </b> {STATUS2}<br>" +
        "<b>Depth: </b> {DEPTH} meters<br>",
      fieldInfos: [
        {
          fieldName: "SPUD",
          format: {
            dateFormat: "short-date"
          }
        },
        {
          fieldName: "COMPLETION",
          format: {
            dateFormat: "short-date"
          }
        },
        {
          fieldName: "DEPTH",
          format: {
            places: 0,
            digitSeparator: true
          }
        }
      ]
    }

    /*****WELLS SURFACE RENDER*****/

    let wellsSurfaceRenderer = {
      type: "simple",
      symbol: {
        type: "point-3d",
        symbolLayers: [
          {
            type: "icon",
            outline: {
              color: "#444"
            },
            resource: {
              primitive: "x"
            },
            size: 4
          }
        ]
      }
    }

    /*****WELLS SUBSURFACE RENDER*****/

    let startDate = new Date("Thu Jul 25 2013 00:00:00 GMT-0700 (PDT)")
    let endDate = new Date("Mon Nov 09 2015 00:01:40 GMT-0800 (PST)")

    let wellsDepthRenderer = {
      type: "simple",
      symbol: {
        type: "point-3d",
        symbolLayers: [
          {
            type: "object",
            resource: {
              primitive: "cylinder"
            },
            anchor: "top",
            width: 50
          }
        ]
      },
      visualVariables: [
        {
          type: "size",
          field: "DEPTH",
          axis: "height",
          valueUnit: "feet"
        },
        {
          type: "size",
          axis: "width",
          useSymbolValue: true
        },
        {
          type: "color",
          field: "SPUD",
          stops: [
            {
              value: startDate.valueOf(),
              color: "white"
            },
            {
              value: endDate.valueOf(),
              color: "red"
            }
          ]
        }
      ]
    }

    /*****WELLS LAYERS*****/

    let wellsLayer = new FeatureLayer({
      url: wellsUrl,
      definitionExpression:
        "Status = 'CBM' OR Status = 'EOR' OR Status = 'GAS' OR Status = 'INJ' OR Status = 'O&G' OR Status = 'OIL' OR Status = 'SWD'",
      outFields: ["*"],
      popupTemplate: wellsTemplate,
      renderer: wellsDepthRenderer,
      elevationInfo: {
        mode: "relative-to-ground",
        offset: -100
      }
    })

    let wellsSurfaceLayer = new FeatureLayer({
      url: wellsUrl,
      definitionExpression:
        "Status = 'CBM' OR Status = 'EOR' OR Status = 'GAS' OR Status = 'INJ' OR Status = 'O&G' OR Status = 'OIL' OR Status = 'SWD'",
      outFields: ["*"],
      popupTemplate: wellsTemplate,
      renderer: wellsSurfaceRenderer,
      elevationInfo: {
        mode: "on-the-ground"
      }
    })

    let map = new Map({
      basemap: "topo",
      layers: [
        wellsLayer,
        wellsSurfaceLayer
      ],
      ground: {
        navigationConstraint: {
          type: "none"
        }
      }
    })

    let view = new SceneView({
      container: "viewDiv",
      map: map,
      viewingMode: "local",
      clippingArea: kansasExtent,
      extent: kansasExtent,
      environment: {
        atmosphere: null,
        starsEnabled: false
      }
    })
  })
