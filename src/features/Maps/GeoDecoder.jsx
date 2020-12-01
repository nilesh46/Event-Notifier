import React, { Component } from "react";
import mapboxgl from "mapbox-gl";
import * as MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "./GeoDecoder.css";
// Prasad's Access Token (email : prasadpatewar39@gmail.com)
mapboxgl.accessToken =
	"pk.eyJ1IjoiaW5ub3ZhdGl2ZWdhbWVyIiwiYSI6ImNraTR3NDNpNzQ3czcyc2t6NXdsZGM4NDMifQ.J-40nZzqZWAbrruWBNoaBw";

class GeoDecoder extends Component {
	state = {
		lng: 77.216721,
		lat: 28.6448,
		zoom: 13,
	};

	componentDidMount = () => {
		const map = new mapboxgl.Map({
			container: this.mapContainer,
			style: "mapbox://styles/mapbox/streets-v11",
			center: [77.216721, 28.6448],
			zoom: 13,
		});

		map.on("move", () => {
			this.setState({
				lng: map.getCenter().lng.toFixed(4),
				lat: map.getCenter().lat.toFixed(4),
				zoom: map.getZoom().toFixed(2),
			});
		});

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

		document.getElementById("geocoder").appendChild(geocoder.onAdd(map));

		geocoder.on("result", (result) => {
			const data = {
				center: result.result.center,
				placeName: result.result.place_name,
			};
			console.log(data);

			this.props.meta.dispatch(
				this.props.change("EventForm", "location", data)
			);
		});
	};

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
