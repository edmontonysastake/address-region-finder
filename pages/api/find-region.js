import { findRegionForCoords } from "../../lib/regions";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { address } = req.body;

  if (!address) {
    return res.status(400).json({ error: "Address is required" });
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "API key not configured" });
  }

  try {
    // Geocode the address using Google Geocoding API
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`;

    const geocodeResponse = await fetch(geocodeUrl);
    const geocodeData = await geocodeResponse.json();

    if (geocodeData.status !== "OK" || geocodeData.results.length === 0) {
      return res.status(404).json({
        error: "Address not found",
        details: geocodeData.status,
      });
    }

    const location = geocodeData.results[0].geometry.location;
    const formattedAddress = geocodeData.results[0].formatted_address;

    // Find which region contains this coordinate
    const region = findRegionForCoords(location.lat, location.lng);

    if (!region) {
      return res.status(404).json({
        error: "Address found but not in any defined region",
        address: formattedAddress,
        coordinates: location,
      });
    }

    return res.status(200).json({
      success: true,
      address: formattedAddress,
      coordinates: location,
      region: {
        id: region.id,
        name: region.name,
        color: region.color,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: "Failed to process address",
      details: error.message,
    });
  }
}
