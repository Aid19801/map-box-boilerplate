
# how to get a good React Map up...

Put the following packages in your package.json

```
 "@mapbox/mapbox-gl-draw": "^1.1.1",
    "mapbox-gl": "^0.53.1",
    "react-mapbox-gl": "3.9.1",
    "react-mapbox-gl-draw": "^1.0.6",

```

`yarn install`

1. import the packages and declare your `Map` component:

```

import ReactMapboxGl from 'react-mapbox-gl';
import DrawControl from 'react-mapbox-gl-draw';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

...
...

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1dgioiwngonoidgn3094673746843" <-- get a new api token for mapbox here: https://account.mapbox.com/access-tokens/
});

```

2. create the map component in your container:

```
    <div>
        <Map
            style="mapbox://styles/mapbox/streets-v9" // eslint-disable-line
            containerStyle={{
            height: '100vh',
            width: '100vw'
            }}
        >
    </div>
```

3. Within the <Map /> add the <DrawControl /> feature:

```
        <Map
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
        </Map>
```

4. add the handlers to your class/function for the returned geojson info:

```
    ...
  onDrawCreate = ({ features }) => {
    console.log(features);
  };

  onDrawUpdate = ({ features }) => {
    console.log({ features });
  };

  render() {
    return (...
```

5. Now add SearchBox functionality:

add a geocoder.js file

```
import { createElement, Component } from 'react';
import { Map } from 'mapbox-gl';
import PropTypes from 'prop-types';
import { accessToken } from './token';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

class Geocoder extends Component {
  static contextTypes = { map: PropTypes.object.isRequired };

  context: {
    map: Map;
  };

  componentDidMount() {
    const { map } = this.context;

    map.addControl(
      new MapboxGeocoder({
        accessToken
      })
    );
  }

  render() {
    return null;
  }
}

export default Geocoder;
```

6. import it `import Geocoder from './geocoder';`

7. nest it in <Map />

```
      ...
      ...
      <Geocoder />
    </Map>
  </div>
```

8. Boom. We have polygons and search functionality. 

Other Useful bits:

in App.css:
```
  .mapboxgl-canvas {
    position: relative !important;
  }
```

this stops map from not covering entire page.


