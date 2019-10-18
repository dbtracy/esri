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

let hi = {
  "objectIdFieldName": "OBJECTID",
  "uniqueIdField": {
    "name": "OBJECTID", "isSystemMaintained": true
  },
  "globalIdFieldName": "",
  "geometryType": "esriGeometryPoint",
  "spatialReference": {
    "wkid": 4326, "latestWkid": 4326
  },
  "fields": [
    {
      "name": "publicaddress",
      "type": "esriFieldTypeString",
      "alias": "PublicAddress",
      "sqlType": "sqlTypeOther",
      "length": 130,
      "domain": null,
      "defaultValue": null
    },
    {
      "name":
        "caseNumber",
      "type":
        "esriFieldTypeString",
      "alias": "caseNumber",
      "sqlType": "sqlTypeOther",
      "length": 28,
      "domain": null,
      "defaultValue": null
    },
    {
      "name": "precinct",
      "type": "esriFieldTypeString",
      "alias": "Precinct",
      "sqlType": "sqlTypeOther",
      "length": 6,
      "domain": null,
      "defaultValue": null
    },
    {
      "name": "reportedDate",
      "type": "esriFieldTypeDate",
      "alias": "ReportedDate",
      "sqlType": "sqlTypeOther",
      "length": 8,
      "domain": null,
      "defaultValue": null
    },
    {
      "name": "reportedTime",
      "type": "esriFieldTypeSmallInteger",
      "alias": "reportedTime",
      "sqlType": "sqlTypeOther",
      "domain": null,
      "defaultValue": null
    },
    {
      "name": "beginDate",
      "type": "esriFieldTypeDate",
      "alias": "BeginDate",
      "sqlType": "sqlTypeOther",
      "length": 8,
      "domain": null,
      "defaultValue": null
    },
    {
      "name": "reportedDateTime",
      "type": "esriFieldTypeDate",
      "alias": "reportedDateTime",
      "sqlType": "sqlTypeOther",
      "length": 8,
      "domain": null,
      "defaultValue": null
    },
    {
      "name": "beginTime",
      "type": "esriFieldTypeSmallInteger",
      "alias": "beginTime",
      "sqlType": "sqlTypeOther",
      "domain": null,
      "defaultValue": null
    },
    {
      "name": "offense",
      "type": "esriFieldTypeString",
      "alias": "Offense",
      "sqlType": "sqlTypeOther",
      "length": 20,
      "domain": null,
      "defaultValue": null
    },
    {
      "name": "description",
      "type": "esriFieldTypeString",
      "alias": "Description",
      "sqlType": "sqlTypeOther",
      "length": 65,
      "domain": null,
      "defaultValue": null
    },
    {
      "name": "UCRCode",
      "type": "esriFieldTypeString",
      "alias": "UCRCode",
      "sqlType": "sqlTypeOther",
      "length": 3,
      "domain": null,
      "defaultValue": null
    },
    {
      "name": "enteredDate",
      "type": "esriFieldTypeDate",
      "alias": "EnteredDate",
      "sqlType": "sqlTypeOther",
      "length": 8,
      "domain": null,
      "defaultValue": null
    },
    {
      "name": "centergbsid",
      "type": "esriFieldTypeDouble",
      "alias": "centergbsid",
      "sqlType": "sqlTypeOther",
      "domain": null,
      "defaultValue": null
    },
    {
      "name": "centerLong",
      "type": "esriFieldTypeDouble",
      "alias": "centerLong",
      "sqlType": "sqlTypeOther",
      "domain": null,
      "defaultValue": null
    },
    {
      "name": "centerLat",
      "type": "esriFieldTypeDouble",
      "alias": "centerLat",
      "sqlType": "sqlTypeOther",
      "domain": null,
      "defaultValue": null
    },
    {
      "name": "centerX",
      "type": "esriFieldTypeInteger",
      "alias": "centerX",
      "sqlType": "sqlTypeOther",
      "domain": null,
      "defaultValue": null
    },
    {
      "name": "centerY",
      "type": "esriFieldTypeInteger",
      "alias": "centerY",
      "sqlType": "sqlTypeOther",
      "domain": null,
      "defaultValue": null
    },
    {
      "name": "neighborhood",
      "type": "esriFieldTypeString",
      "alias": "Neighborhood",
      "sqlType": "sqlTypeOther",
      "length": 32,
      "domain": null,
      "defaultValue": null
    },
    {
      "name": "lastchanged",
      "type": "esriFieldTypeDate",
      "alias": "LastChanged",
      "sqlType": "sqlTypeOther",
      "length": 8,
      "domain": null,
      "defaultValue": null
    },
    {
      "name": "LastUpdateDateETL",
      "type": "esriFieldTypeDate",
      "alias": "LastUpdateDateETL",
      "sqlType": "sqlTypeOther",
      "length": 8,
      "domain": null,
      "defaultValue": null
    },
    {
      "name": "OBJECTID",
      "type": "esriFieldTypeOID",
      "alias": "OBJECTID",
      "sqlType": "sqlTypeOther",
      "domain": null,
      "defaultValue": null
    }
  ],
  "features": "b"
}
