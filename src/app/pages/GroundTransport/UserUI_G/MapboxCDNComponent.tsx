// import React, { useEffect, useRef } from 'react';
//
// const MapboxCDNComponent: React.FC = () => {
//   const mapContainerRef = useRef<HTMLDivElement>(null);
//
//   useEffect(() => {
//     const loadCDNAssets = async () => {
//       // Load Mapbox GL JS CSS
//       const mapboxGLCSS = document.createElement('link');
//       mapboxGLCSS.rel = 'stylesheet';
//       mapboxGLCSS.href = 'https://api.mapbox.com/mapbox-gl-js/v3.9.3/mapbox-gl.css';
//       document.head.appendChild(mapboxGLCSS);
//
//       // Load Mapbox Directions CSS
//       const directionsCSS = document.createElement('link');
//       directionsCSS.rel = 'stylesheet';
//       directionsCSS.href =
//         'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.3.1/mapbox-gl-directions.css';
//       document.head.appendChild(directionsCSS);
//
//       // Load Mapbox GL JS script
//       await new Promise<void>((resolve, reject) => {
//         const mapboxGLScript = document.createElement('script');
//         mapboxGLScript.src = 'https://api.mapbox.com/mapbox-gl-js/v3.9.3/mapbox-gl.js';
//         mapboxGLScript.onload = () => resolve();
//         mapboxGLScript.onerror = () => reject(new Error('Failed to load Mapbox GL JS'));
//         document.body.appendChild(mapboxGLScript);
//       });
//
//       // Load Mapbox Directions script
//       await new Promise<void>((resolve, reject) => {
//         const directionsScript = document.createElement('script');
//         directionsScript.src =
//           'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.3.1/mapbox-gl-directions.js';
//         directionsScript.onload = () => resolve();
//         directionsScript.onerror = () => reject(new Error('Failed to load Mapbox Directions'));
//         document.body.appendChild(directionsScript);
//       });
//
//       // Initialize Mapbox after loading all assets
//       if (window.mapboxgl && window.MapboxDirections) {
//         window.mapboxgl.accessToken =
//           'pk.eyJ1IjoiYXNodXRvc2h0MTIzIiwiYSI6ImNseXgwNnp6NzB6Y2Yya3Nsbjk1N2trcjkifQ.NJhJDHkv1_SCOgu40rYzXg';
//
//         const map = new window.mapboxgl.Map({
//           container: mapContainerRef.current!,
//           style: 'mapbox://styles/mapbox/streets-v12',
//           center: [-79.4512, 43.6568],
//           zoom: 13,
//         });
//
//         map.addControl(
//           new window.MapboxDirections({
//             accessToken: window.mapboxgl.accessToken,
//           }),
//           'top-left'
//         );
//       }
//     };
//
//     loadCDNAssets();
//
//     return () => {
//       // Cleanup: Remove added assets and map instance
//       const addedLinks = document.querySelectorAll(
//         'link[href*="mapbox"], script[src*="mapbox"]'
//       );
//       addedLinks.forEach((el) => el.parentNode?.removeChild(el));
//     };
//   }, []);
//
//   return <div ref={mapContainerRef} style={{ width: '100%', height: '100vh' }} />;
// };
//
// export default MapboxCDNComponent;
import React, { useEffect, useRef } from 'react';

const MapboxCDNComponent: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadCDNAssets = async () => {
      // Load Mapbox GL JS CSS
      const mapboxGLCSS = document.createElement('link');
      mapboxGLCSS.rel = 'stylesheet';
      mapboxGLCSS.href = 'https://api.mapbox.com/mapbox-gl-js/v3.9.3/mapbox-gl.css';
      document.head.appendChild(mapboxGLCSS);

      // Load Mapbox Directions CSS
      const directionsCSS = document.createElement('link');
      directionsCSS.rel = 'stylesheet';
      directionsCSS.href =
        'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.3.1/mapbox-gl-directions.css';
      document.head.appendChild(directionsCSS);

      // Load Mapbox GL JS script
      await new Promise<void>((resolve, reject) => {
        const mapboxGLScript = document.createElement('script');
        mapboxGLScript.src = 'https://api.mapbox.com/mapbox-gl-js/v3.9.3/mapbox-gl.js';
        mapboxGLScript.onload = () => resolve();
        mapboxGLScript.onerror = () => reject(new Error('Failed to load Mapbox GL JS'));
        document.body.appendChild(mapboxGLScript);
      });

      // Load Mapbox Directions script
      await new Promise<void>((resolve, reject) => {
        const directionsScript = document.createElement('script');
        directionsScript.src =
          'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.3.1/mapbox-gl-directions.js';
        directionsScript.onload = () => resolve();
        directionsScript.onerror = () => reject(new Error('Failed to load Mapbox Directions'));
        document.body.appendChild(directionsScript);
      });

      // Initialize Mapbox after loading all assets
      if (window.mapboxgl && window.MapboxDirections) {
        window.mapboxgl.accessToken =
          'pk.eyJ1IjoiYXNodXRvc2h0MTIzIiwiYSI6ImNseXgwNnp6NzB6Y2Yya3Nsbjk1N2trcjkifQ.NJhJDHkv1_SCOgu40rYzXg';

        const map = new window.mapboxgl.Map({
          container: mapContainerRef.current!,
          style: 'mapbox://styles/mapbox/streets-v12',
          center: [-79.4512, 43.6568],
          zoom: 13,
        });

        const directions = new window.MapboxDirections({
          accessToken: window.mapboxgl.accessToken,
        });

        map.addControl(directions, 'top-left');

        // Listen for the route event to get source and destination
        directions.on('route', (e: any) => {
          if (e.route && e.route[0]) {
            const source = e.route[0].legs[0].summary;
            const destination = e.route[0].legs[e.route[0].legs.length - 1].summary;
            console.log('Source:', source);
            console.log('Destination:', destination);
          }
        });
      }
    };

    loadCDNAssets();

    return () => {
      // Cleanup: Remove added assets and map instance
      const addedLinks = document.querySelectorAll(
        'link[href*="mapbox"], script[src*="mapbox"]'
      );
      addedLinks.forEach((el) => el.parentNode?.removeChild(el));
    };
  }, []);

  return <div ref={mapContainerRef} style={{ width: '100%', height: '100vh' }} />;
};

export default MapboxCDNComponent;
