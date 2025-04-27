// src/components/RideTracker.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

export default function RideTracker() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const userId = params.get('user_id') || '';
  const mrvId = params.get('mrv_id') || '';
  const area = params.get('area') || '';
  const activities = params.get('activities') || '';

  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [positions, setPositions] = useState([]);
  const [watchId, setWatchId] = useState(null);
  const [tracking, setTracking] = useState(false);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState('');
  const [showStartModal, setShowStartModal] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);

  // Load Google Maps script with hardcoded API key
  useEffect(() => {
    if (window.google && window.google.maps) {
      initMap();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC3YJ_ty9gpjNGEQCEWjU_-UtynUL1JsTE';
    script.async = true;
    script.onload = initMap;
    script.onerror = () => setError('Failed to load Google Maps');
    document.head.appendChild(script);
  }, []);

  function initMap() {
    if (!mapRef.current) return;
    const googleMap = new window.google.maps.Map(mapRef.current, {
      center: { lat: 31.5204, lng: 74.3587 },
      zoom: 13,
    });
    setMap(googleMap);
  }

  // Update map with path and markers
  useEffect(() => {
    if (!map || positions.length === 0) return;
    const path = positions.map(p => ({ lat: p.latitude, lng: p.longitude }));
    map.overlayMapTypes.clear();
    new window.google.maps.Polyline({ path, map, strokeColor: '#2e3aff', strokeWeight: 3 });
    new window.google.maps.Marker({ position: path[0], map, title: 'Start' });
    new window.google.maps.Marker({ position: path[path.length - 1], map, title: 'Current' });
    map.setCenter(path[path.length - 1]);
  }, [positions, map]);

  const startRide = () => {
    setShowStartModal(true);
    if (!navigator.geolocation) {
      setError('Geolocation not supported');
      return;
    }
    setError('');
    setTracking(true);
    setPositions([]);
    const id = navigator.geolocation.watchPosition(
      pos => setPositions(prev => [...prev, pos.coords]),
      err => setError(err.message),
      { enableHighAccuracy: true, maximumAge: 1000 }
    );
    setWatchId(id);
  };

  const endRide = async () => {
    if (watchId != null) navigator.geolocation.clearWatch(watchId);
    setTracking(false);
    if (positions.length < 2) {
      setError('Not enough data to compute trip');
      return;
    }
    // Haversine
    const R = 6371;
    let dist = 0;
    for (let i = 1; i < positions.length; i++) {
      const a = positions[i-1], b = positions[i];
      const dLat = (b.latitude - a.latitude) * Math.PI/180;
      const dLng = (b.longitude - a.longitude) * Math.PI/180;
      const A = Math.sin(dLat/2)**2 + Math.cos(a.latitude*Math.PI/180)*Math.cos(b.latitude*Math.PI/180)*Math.sin(dLng/2)**2;
      dist += 2*R*Math.atan2(Math.sqrt(A), Math.sqrt(1-A));
    }
    const startTime = new Date(positions[0].timestamp || Date.now());
    const endTime = new Date(positions.at(-1).timestamp || Date.now());
    const durationMin = (endTime - startTime)/60000;
    const avgSpeed = dist/(durationMin/60);
    const summaryObj = {
      user_id: userId,
      mrv_id: mrvId,
      area,
      activities,
      start_time: startTime.toISOString(),
      end_time: endTime.toISOString(),
      distance: dist.toFixed(2),
      duration: durationMin.toFixed(0),
      average_speed: avgSpeed.toFixed(2),
      route: positions
    };
    setSummary(summaryObj);
    setShowSummaryModal(true);
    // Post to PHP endpoint
    try {
      await axios.post('/bikeapi/createTrip.php', summaryObj, { headers: { 'Content-Type': 'application/json' } });
    } catch (e) {
      console.error('Save error', e);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-lg mx-auto bg-white shadow rounded-lg overflow-hidden">
        
        <div className="p-4">
          <p className="mb-2 text-center text-green-600">Click <strong>Start</strong> to begin journey</p>
          <div ref={mapRef} className="w-full h-64 mb-4 border" />
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <div className="flex justify-center space-x-4 mb-4">
            <button onClick={startRide} disabled={tracking} className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50">Start</button>
            <button onClick={endRide} disabled={!tracking} className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50">End</button>
          </div>
          {summary && (
            <div className="bg-gray-100 p-3 rounded">
              <p><strong>Distance:</strong> {summary.distance} km</p>
              <p><strong>Duration:</strong> {summary.duration} min</p>
              <p><strong>Avg Speed:</strong> {summary.average_speed} km/h</p>
            </div>
          )}
        </div>
      </div>

      {showStartModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <p className="mb-4 font-semibold text-green-600">Trip Started!</p>
            <button onClick={() => setShowStartModal(false)} className="px-4 py-2 bg-green-600 text-white rounded">OK</button>
          </div>
        </div>
      )}
      {showSummaryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-xs">
            <h4 className="font-bold mb-3">Trip Summary</h4>
            <p><strong>Start:</strong> {summary.start_time}</p>
            <p><strong>End:</strong> {summary.end_time}</p>
            <p><strong>Distance:</strong> {summary.distance} km</p>
            <p><strong>Duration:</strong> {summary.duration} min</p>
            <p><strong>Avg Speed:</strong> {summary.average_speed} km/h</p>
            <button onClick={() => setShowSummaryModal(false)} className="mt-4 px-4 py-2 bg-green-600 text-white rounded">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
