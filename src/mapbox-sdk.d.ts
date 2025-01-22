declare module '@mapbox/ mapbox-gl-directions';

// declare module '@mapbox/mapbox-sdk/services/directions' {
//   import { AxiosInstance } from 'axios';
//
//   interface DirectionsServiceOptions {
//     accessToken: string;
//     axiosInstance?: AxiosInstance;
//   }
//
//   export interface DirectionsResponse {
//     routes: Array<{
//       distance: number;
//       duration: number;
//       geometry: {
//         coordinates: [number, number][];
//         type: string;
//       };
//     }>;
//   }
//
//   export default function Directions(options: DirectionsServiceOptions): {
//     getDirections: (config: {
//         profile: string;
//         waypoints: ({ address: string } | { address: string })[];
//         geometries: string
//     }) => Promise<{ body: DirectionsResponse }>;
//   };
// }
//
//
// declare module '@mapbox/mapbox-sdk/services/geocoding' {
//   import { AxiosInstance } from 'axios';
//
//   interface GeocodingServiceOptions {
//     accessToken: string;
//     axiosInstance?: AxiosInstance;
//   }
//
//   export interface GeocodingResponse {
//     type: string;
//     features: Array<{
//       geometry: {
//         coordinates: [number, number]; // [longitude, latitude]
//         type: string;
//       };
//       properties: any;
//     }>;
//   }
//
//   export default function Geocoding(options: GeocodingServiceOptions): {
//     forwardGeocode: (address: string, options?: { limit: number }) => {
//       send: () => Promise<{ body: GeocodingResponse }>;
//     };
//   };
// }
