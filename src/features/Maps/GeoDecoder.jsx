import React, { Component } from "react";
import mapboxgl from "mapbox-gl";
import * as MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "./GeoDecoder.css";
// Prasad's Access Token (email : prasadpatewar39@gmail.com)
mapboxgl.accessToken =
	"pk.eyJ1IjoiaW5ub3ZhdGl2ZWdhbWVyIiwiYSI6ImNraTR3NDNpNzQ3czcyc2t6NXdsZGM4NDMifQ.J-40nZzqZWAbrruWBNoaBw";

const geocoder = new MapboxGeocoder({
	accessToken: mapboxgl.accessToken,
	marker: {
		color: "orange",
	},
	mapboxgl: mapboxgl,
	proximity: {
		longitude: 77.216721,
		latitude: 28.6448,
	},
});

class GeoDecoder extends Component {
	state = {
		lng: 77.209,
		lat: 28.6139,
		zoom: 11,
	};

	componentDidMount = () => {
		const map = new mapboxgl.Map({
			container: this.mapContainer,
			style: "mapbox://styles/mapbox/streets-v11",
			center: [77.209, 28.6139],
			zoom: 11,
		});

		map.on("move", () => {
			this.setState({
				lng: map.getCenter().lng.toFixed(4),
				lat: map.getCenter().lat.toFixed(4),
				zoom: map.getZoom().toFixed(2),
			});
		});

		document.getElementById("geocoder").appendChild(geocoder.onAdd(map));

		if (this.props.location) {
			geocoder.setInput(this.props.location.placeName);
		}

		geocoder.on("result", (result) => {
			const data = {
				center: result.result.center,
				placeName: result.result.place_name,
			};

			this.props.meta.dispatch(
				this.props.change("EventForm", "location", data)
			);
		});
	};

	componentWillUnmount() {
		geocoder.off("result", () => {});
	}

	render() {
		return (
			<div className="root">
				<div id="geocoder" className="geocoder"></div>
				<div
					ref={(el) => (this.mapContainer = el)}
					className="mapContainer"
				/>
			</div>
		);
	}
}

export default GeoDecoder;
