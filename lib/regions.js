// Region definitions with polygon coordinates
// Replace these with your actual region boundaries from Google My Maps
export const REGIONS = [
  {
    id: 1,
    name: "North Region",
    color: "#FF6B6B",
    polygon: [
      { lat: 51.5, lng: -0.2 },
      { lat: 51.5, lng: 0.2 },
      { lat: 51.8, lng: 0.2 },
      { lat: 51.8, lng: -0.2 },
    ],
  },
  {
    id: 2,
    name: "South Region",
    color: "#4ECDC4",
    polygon: [
      { lat: 51.2, lng: -0.2 },
      { lat: 51.2, lng: 0.2 },
      { lat: 51.5, lng: 0.2 },
      { lat: 51.5, lng: -0.2 },
    ],
  },
  {
    id: 3,
    name: "East Region",
    color: "#45B7D1",
    polygon: [
      { lat: 51.3, lng: 0.2 },
      { lat: 51.3, lng: 0.6 },
      { lat: 51.7, lng: 0.6 },
      { lat: 51.7, lng: 0.2 },
    ],
  },
  {
    id: 4,
    name: "West Region",
    color: "#F7DC6F",
    polygon: [
      { lat: 51.3, lng: -0.6 },
      { lat: 51.3, lng: -0.2 },
      { lat: 51.7, lng: -0.2 },
      { lat: 51.7, lng: -0.6 },
    ],
  },
  {
    id: 5,
    name: "Central Region",
    color: "#BB8FCE",
    polygon: [
      { lat: 51.35, lng: -0.15 },
      { lat: 51.35, lng: 0.15 },
      { lat: 51.65, lng: 0.15 },
      { lat: 51.65, lng: -0.15 },
    ],
  },
];

// Point-in-polygon algorithm
export function isPointInPolygon(point, polygon) {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].lng;
    const yi = polygon[i].lat;
    const xj = polygon[j].lng;
    const yj = polygon[j].lat;

    const intersect =
      yi > point.lat !== yj > point.lat &&
      point.lng < ((xj - xi) * (point.lat - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

// Find region for a given coordinate
export function findRegionForCoords(lat, lng) {
  const point = { lat, lng };
  for (const region of REGIONS) {
    if (isPointInPolygon(point, region.polygon)) {
      return region;
    }
  }
  return null;
}
