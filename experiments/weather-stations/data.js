const axios = require('axios')

const getStations = async () => {
  try {
    const stations = await axios.get("https://www.ncdc.noaa.gov/cdo-web/api/v2/stations?locationid=FIPS:36&locationcategories?startdate=2018-01-01", {
      headers: {
        token: "OCxLuMWjYNsotCAQMUVUBHUeNMleJKiW"
      }
    })
    if (stations) {
      // console.log(stations.data.results)
      return stations.data.results
    } else {
      return "nothing!"
    }
  } catch (error) {
    console.log('ERROR:', error)
  }
}

// const data = getStations
// data().then((result) => console.log(result))
// module.exports = data
