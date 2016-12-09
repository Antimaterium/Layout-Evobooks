import React, { Component, PropTypes } from 'react';
import SketchFab from "../utils/TesteSketch";

class Object3D extends Component {

    componentDidMount(){
        var version = '1.0.0';
		this.client = new SketchFab(version, this.refs.image3D);
		this.client.init(this.props.url_3d, {
			success: function onSuccess(api) {
				api.start();
				api.addEventListener('viewerready', function () {
					console.log('Viewer is ready');
				});
			},
			error: function onError() {
				console.log('Viewer error');
			}
		});
    }
    componentDidUpdate(){
        var version = '1.0.0';
        this.client = new SketchFab(version, this.refs.image3D);
        this.client.init(this.props.url_3d,{
			success: function onSuccess(api) {
				api.start();
				api.addEventListener('viewerready', function () {
					console.log('Viewer is ready');
				});
			},
			error: function onError() {
				console.log('Viewer error');
			}
		});
    }
	render() {
		return (
			<div>
				<iframe height="500px" width="100%" ref="image3D" />
			</div>
		)
	}
}


export default Object3D;
