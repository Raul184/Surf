import React, { Component } from "react";
const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const geocodingClient = mbxGeocoding({ accessToken: process.env.MB });

export default class Mapbox extends Component {
  constructor() {
    super();
    this.mapRef = React.createRef();
  }
  componentDidMount() {
    // 1. Draw Map
    this.map = new mapboxgl.Map({
      container: this.mapRef,
      style: "mapbox://styles/mapbox/streets-v11",
      accessToken:
        "pk.eyJ1IjoibXVyY2llZ2FsbyIsImEiOiJja2JqaWFtemEwbmF1MnJ0ZHJsNXFiOTByIn0.HCRDiCTZiILWMA7ZmzfYDQ",
      scrollZoom: false,
      Marker: this.pulsingDot
    });
    //2. Set markers
    const bounds = new mapboxgl.LngLatBounds();
    this.map.fitBounds(bounds, {
      padding: {
        top: 200,
        bottom: 200,
        left: 200,
        right: 100,
      },
    });
  }
  async geoCoder(location) {
    try {
      let response = await geocodingClient
        .forwardGeocode({
          query: location,
          limit: 1,
        })
        .send();
      console.log(response.body.features[0].geometry.coordinates);
    } catch (err) {
      console.log(err.message);
    }
  }
  // Marker
  pulsingDot = {
    width: 200,
    height: 200,
    data: new Uint8Array(200 * 200 * 4),
    // get rendering context for the map canvas when layer is added to the map
    onAdd: function () {
      const canvas = document.createElement("canvas");
      canvas.width = this.width;
      canvas.height = this.height;
      this.context = canvas.getContext("2d");
    },
    // called once before every frame where the icon will be used
    render: function () {
      const duration = 1000;
      const t = (performance.now() % duration) / duration;
      const radius = (200 / 2) * 0.3;
      const outerRadius = (200 / 2) * 0.7 * t + radius;
      const context = this.context;
      // draw outer circle
      context.clearRect(0, 0, this.width, this.height);
      context.beginPath();
      context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
      context.fillStyle = "rgba(255, 200, 200," + (1 - t) + ")";
      context.fill();
      // draw inner circle
      context.beginPath();
      context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
      context.fillStyle = "rgba(255, 100, 100, 1)";
      context.strokeStyle = "white";
      context.lineWidth = 2 + 4 * (1 - t);
      context.fill();
      context.stroke();
      // update this image's data with data from the canvas
      this.data = context.getImageData(0, 0, this.width, this.height).data;
      // continuously repaint the map, resulting in the smooth animation of the dot
      this.map.triggerRepaint();
      // return `true` to let the map know that the image was updated
      return true;
    },
  };
  render() {
    return (
      <>
        <div style={{ width: "100%", height: "80vh" }} ref={this.mapRef}></div>
      </>
    );
  }
}
