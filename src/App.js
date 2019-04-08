import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactMapboxGl, { PropTypesAlias } from 'react-mapbox-gl';
import DrawControl from 'react-mapbox-gl-draw';
import Geocoder from './geocoder';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import './App.css';

// import { accessToken } from './token';

const MapBoxMap = ReactMapboxGl({ accessToken: process.env.REACT_APP_MAPBOX_KEY });


class App extends Component {

  onDrawCreate = ({ features }) => {
    console.log(features);
  };

  onDrawUpdate = ({ features }) => {
    console.log({ features });
  };

  render() {
    return (
      <div className="App">

        <MapBoxMap
          style="mapbox://styles/mapbox/streets-v9" // eslint-disable-line
          containerStyle={{
            height: '100vh',
            width: '100vw'
          }}
        >

          <DrawControl
              position="top-left"
              onDrawCreate={this.onDrawCreate}
              onDrawUpdate={this.onDrawUpdate}
            />

          <Geocoder />

        </MapBoxMap>

      </div>
    );
  }
}

export default App;
