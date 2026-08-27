import { useState } from "react";
import axios from "axios";
import { REGIONS } from "../lib/regions";

export default function Home() {
  const [address, setAddress] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(null); // For confirmation step

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    setPending(null);

    try {
      const response = await axios.post("/api/find-region", { address });
      // Set as pending - requires user confirmation
      setPending(response.data);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Failed to find region. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    // User confirmed - show the result
    setResult(pending);
    setPending(null);
    setAddress(""); // Clear input
  };

  const handleReject = () => {
    // User rejected - let them try again
    setPending(null);
    setAddress(""); // Clear input for retry
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
            placeholder="Enter an address (e.g., 123 Main St)"
            className="input"
            disabled={loading || pending}
            required
          />
          <button
            type="submit"
            className="button"
            disabled={loading || !address.trim() || pending}
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

        {/* Confirmation Step */}
        {pending && (
          <div className="confirmation">
            <div className="confirmation-header">
              <h2>✓ Is this correct?</h2>
            </div>

            <div className="confirmation-content">
              <p className="confirmation-label">We found:</p>
              <p className="confirmation-address">{pending.address}</p>

              <p className="confirmation-label">Coordinates:</p>
              <p className="confirmation-coords">
                {pending.coordinates.lat.toFixed(4)}, {pending.coordinates.lng.toFixed(4)}
              </p>
            </div>

            <div className="confirmation-actions">
              <button
                type="button"
                className="button button-confirm"
                onClick={handleConfirm}
              >
                Yes, This is Correct
              </button>
              <button
                type="button"
                className="button button-secondary"
                onClick={handleReject}
              >
                No, Try Again
              </button>
            </div>
          </div>
        )}

        {/* Final Result */}
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
                  {result.coordinates.lat.toFixed(4)}, {result.coordinates.lng.toFixed(4)}
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

            <button
              type="button"
              className="button button-secondary"
              onClick={() => {
                setResult(null);
                setAddress("");
              }}
              style={{ marginTop: "20px", width: "100%" }}
            >
              Search Another Address
            </button>
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
