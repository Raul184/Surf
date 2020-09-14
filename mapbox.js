require('dotenv').config()
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding')
const geocodingClient = mbxGeocoding({ accessToken: process.env.MB });

