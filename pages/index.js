import { useState } from "react";
import axios from "axios";
import { REGIONS } from "../lib/regions";

export default function Home() {
  const [address, setAddress] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await axios.post("/api/find-region", { address });
      setResult(response.data);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Failed to find region. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>📍 Address Region Finder</h1>
        <p className="subtitle">
          Enter an address to find which region it belongs to
        </p>

        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter an address (e.g., 123 Main St, London)"
            className="input"
            disabled={loading}
            required
          />
          <button
            type="submit"
            className="button"
            disabled={loading || !address.trim()}
          >
            {loading ? "Searching..." : "Find Region"}
          </button>
        </form>

        {error && (
          <div className="error">
            <span>❌</span>
            <p>{error}</p>
          </div>
        )}

        {result && (
          <div className="result">
            <div className="result-header">
              <h2>✅ Found!</h2>
            </div>

            <div className="result-content">
              <div className="result-item">
                <label>Address:</label>
                <p className="result-value">{result.address}</p>
              </div>

              <div className="result-item">
                <label>Coordinates:</label>
                <p className="result-value">
                  {result.coordinates.lat.toFixed(4)},{" "}
                  {result.coordinates.lng.toFixed(4)}
                </p>
              </div>

              <div className="result-item">
                <label>Region:</label>
                <div
                  className="region-badge"
                  style={{ backgroundColor: result.region.color }}
                >
                  {result.region.name}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="regions-info">
          <h3>📌 Available Regions:</h3>
          <div className="regions-grid">
            {REGIONS.map((region) => (
              <div key={region.id} className="region-item">
                <div
                  className="region-color"
                  style={{ backgroundColor: region.color }}
                ></div>
                <span>{region.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
