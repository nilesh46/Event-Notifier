import React, { Component } from "react";
import mapboxgl from "mapbox-gl";

// Prasad's Access Token (email : prasadpatewar39@gmail.com)
mapboxgl.accessToken =
	"pk.eyJ1IjoiaW5ub3ZhdGl2ZWdhbWVyIiwiYSI6ImNraTR3NDNpNzQ3czcyc2t6NXdsZGM4NDMifQ.J-40nZzqZWAbrruWBNoaBw";

class Mapbox extends Component {
	state = {
		lng: this.props.lng,
		lat: this.props.lat,
		zoom: this.props.zoom,
	};

	componentDidMount = () => {
		const map = new mapboxgl.Map({
			container: this.mapContainer,
			style: "mapbox://styles/mapbox/streets-v11",
			center: [this.state.lng, this.state.lat],
			zoom: this.state.zoom,
		});

		map.on("move", () => {
			this.setState({
				lng: map.getCenter().lng.toFixed(4),
				lat: map.getCenter().lat.toFixed(4),
				zoom: map.getZoom().toFixed(2),
			});
		});

		new mapboxgl.Marker()
			.setLngLat([this.props.lng, this.props.lat])
			.addTo(map);
	};

	render() {
		return (
			<div
				ref={(el) => (this.mapContainer = el)}
				className="mapContainer"
				style={{ height: "100%", width: "100%" }}
			/>
		);
	}
}

export default Mapbox;
