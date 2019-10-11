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

    let wellsDepthLayer = new FeatureLayer({
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

    /*****QUAKES DEPTH RENDERER*****/

    let quakesRenderer = {
      type: "simple",
      symbol: {
        type: "point-3d",
        symbolLayers: [
          {
            type: "object",
            resource: {
              primitive: "sphere"
            }
          }
        ]
      },
      visualVariables: [
        {
          type: "color",
          field: "date_evt",
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
        },
        {
          type: "size",
          field: "mag",
          axis: "all",
          stops: [
            {
              value: 2,
              size: 100
            },
            {
              value: 5,
              size: 2000
            }
          ]
        }
      ]
    }

    /*****QUAKES SURFACE RENDERer*****/

    let surfaceSym = {
      type: "point-3d",
      symbolLayers: [
        {
          type: "icon",
          material: {
            color: [179, 75, 75]
          },
          resource: {
            primitive: "circle"
          }
        }
      ]
    }

    let quakesSurfaceRenderer = {
      type: "simple",
      symbol: surfaceSym,
      visualVariables: [
        {
          type: "size",
          field: "mag",
          axis: "all",
          stops: [
            {
              value: 2,
              size: 3
            },
            {
              value: 5,
              size: 50
            }
          ]
        }
      ]
    }

    /*****QUAKE POPUP*****/

    let quakeTemplate = {
      title: "{place}",
      content:
        "<b>Date and time:</b> {date_evt}<br>" +
        "<b>Magnitude (0-10): </b> {mag}<br>" +
        "<b>Depth: </b> {depth} km<br>",
      fieldInfos: [
        {
          fieldName: "date_evt",
          format: {
            dateFormat: "short-date-short-time"
          }
        }
      ],
      actions: [
        {
          id: "find-wells",
          title: "Nearby wells",
          className: "esri-icon-notice-round"
        }
      ]
    }

    /*****QUAKES LAYERS******/
    let quakesDepthLayer = new FeatureLayer({
      url: quakesUrl,
      definitionExpression: "mag >= 2",
      outFields: ["*"],
      renderer: quakesRenderer,
      popupTemplate: quakeTemplate,
      returnZ: true,
      elevationInfo: {
        mode: "relative-to-ground"
      }
    })

    let quakesSurfaceLayer = new FeatureLayer({
      url: quakesUrl,
      definitionExpression: "mag >= 2",
      outFields: ["*"],
      renderer: quakesSurfaceRenderer,
      popupTemplate: quakeTemplate,
      opacity: 0.6,
      elevationInfo: {
        mode: "on-the-ground"
      }
    })

    /*****MAP AND VIEW*****/

    let map = new Map({
      basemap: "topo",
      layers: [
        quakesDepthLayer,
        quakesSurfaceLayer,
        wellsDepthLayer,
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

    var wellsBufferParams = {
      spatialRelationship: "esriSpatialRelIntersects",
      distance: 10,
      units: "kilometers",
      where:
        "Status = 'CBM' OR Status = 'EDR' OR Status = 'GAS' OR Status = 'INJ' OR Status = 'O&G' OR Status = 'OIL' OR Status = 'SWD'"
    };

    view.popup.on("trigger-action", function (event) {
      if (event.action.id === "find-wells") {
        console.log('GEO:', view.popup.selectedFeature.geometry)
        wellsBufferParams.geometry = view.popup.selectedFeature.geometry;
        wellsDepthLayer
          .queryFeatureCount(wellsBufferParams)
          .then(function (response) {
            var results =
              "<b>" +
              response +
              "</b> active wells are within 10 km of this earthquake.";
            view.popup.content = results;
          })
          .catch(function (error) {
            console.log("action failed: ", error);
          });
      } else {
        return;
      }
    });
  })
