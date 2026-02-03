import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from '../../i18n';

// Image Carousel Component
function ImageCarousel({ images, darkMode }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useTranslation();

  const imageList = useMemo(() => {
    const list = [];
    if (images?.frontView) list.push({ url: images.frontView, label: t('myCar.frontView') });
    if (images?.sideView) list.push({ url: images.sideView, label: t('myCar.sideView') });
    if (images?.rearView) list.push({ url: images.rearView, label: t('myCar.rearView') });
    if (images?.topView) list.push({ url: images.topView, label: t('myCar.topView') });
    return list;
  }, [images, t]);

  if (imageList.length === 0) return null;

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? imageList.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === imageList.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative">
      {/* Main Image */}
      <div className={`relative overflow-hidden rounded-2xl ${darkMode ? 'bg-zinc-900' : 'bg-zinc-100'}`}>
        <img
          src={imageList[currentIndex].url}
          alt={imageList[currentIndex].label}
          className="w-full h-72 md:h-96 object-contain"
        />

        {/* Navigation Arrows */}
        {imageList.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className={`absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors ${
                darkMode
                  ? 'bg-zinc-800/80 hover:bg-zinc-700 text-white'
                  : 'bg-white/80 hover:bg-white text-zinc-800'
              }`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors ${
                darkMode
                  ? 'bg-zinc-800/80 hover:bg-zinc-700 text-white'
                  : 'bg-white/80 hover:bg-white text-zinc-800'
              }`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </>
        )}

        {/* Image Label */}
        <div className={`absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-sm ${
          darkMode ? 'bg-zinc-800/90 text-zinc-200' : 'bg-white/90 text-zinc-700'
        }`}>
          {imageList[currentIndex].label}
        </div>
      </div>

      {/* Thumbnail Navigation */}
      {imageList.length > 1 && (
        <div className="flex justify-center gap-2 mt-3">
          {imageList.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                idx === currentIndex
                  ? (darkMode ? 'border-sky-500' : 'border-sky-600')
                  : (darkMode ? 'border-zinc-700 opacity-60 hover:opacity-100' : 'border-zinc-300 opacity-60 hover:opacity-100')
              }`}
            >
              <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Location Map Component using OpenStreetMap
function LocationMap({ location, darkMode, onAddressLoaded }) {
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  const coords = useMemo(() => {
    if (!location?.location) return null;
    const [lat, lon] = location.location.split(',').map(Number);
    return { lat, lon };
  }, [location]);

  // Reverse geocoding using Nominatim (free OpenStreetMap service)
  useEffect(() => {
    if (!coords) return;

    const fetchAddress = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.lat}&lon=${coords.lon}&zoom=18&addressdetails=1`,
          { headers: { 'Accept-Language': 'en' } }
        );
        const data = await response.json();
        if (data.display_name) {
          setAddress(data.display_name);
          if (onAddressLoaded) onAddressLoaded(data.display_name);
        }
      } catch (error) {
        console.warn('Failed to reverse geocode:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAddress();
  }, [coords, onAddressLoaded]);

  if (!coords) return null;

  // Direction indicator (compass direction)
  const getDirectionLabel = (degrees) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(((degrees % 360) + 360) % 360 / 45) % 8;
    return directions[index];
  };

  // Street-level zoom: smaller bbox = more zoomed in
  // 0.002 degrees ≈ ~200m which gives a nice street-level view
  const zoomLevel = 0.002;
  // Use OSM's native marker parameter so the marker stays with the map when panning/zooming
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${coords.lon - zoomLevel},${coords.lat - zoomLevel},${coords.lon + zoomLevel},${coords.lat + zoomLevel}&layer=mapnik&marker=${coords.lat},${coords.lon}`;
  const fullMapUrl = `https://www.openstreetmap.org/?mlat=${coords.lat}&mlon=${coords.lon}#map=18/${coords.lat}/${coords.lon}`;

  return (
    <div className="relative">
      {/* Map - exact same height as the photo carousel */}
      <div className={`relative overflow-hidden rounded-2xl ${darkMode ? 'bg-zinc-900' : 'bg-zinc-100'}`}>
        <iframe
          src={mapUrl}
          width="100%"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Vehicle Location"
          className="block w-full h-72 md:h-96"
        />

        <a
          href={fullMapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`absolute bottom-3 right-3 px-3 py-1 rounded-full text-sm transition-colors ${
            darkMode
              ? 'bg-zinc-800/90 hover:bg-zinc-700 text-zinc-200'
              : 'bg-white/90 hover:bg-white text-zinc-700'
          }`}
        >
          {t('myCar.openInMaps')} ↗
        </a>
      </div>

      {/* Address - aligned with thumbnail row height */}
      <div className="flex justify-center gap-2 mt-3">
        <div className={`flex items-center gap-2 px-4 py-2 rounded-lg min-h-12 ${darkMode ? 'bg-zinc-800/50' : 'bg-zinc-50'}`}>
          <svg className={`w-4 h-4 flex-shrink-0 ${darkMode ? 'text-sky-400' : 'text-sky-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
          <div className="text-sm">
            {loading ? (
              <span className={darkMode ? 'text-zinc-400' : 'text-zinc-500'}>{t('common.loading')}</span>
            ) : (
              <span className={darkMode ? 'text-zinc-300' : 'text-zinc-600'}>
                {address || `${coords.lat.toFixed(6)}, ${coords.lon.toFixed(6)}`}
              </span>
            )}
          </div>
          {/* Direction compass indicator */}
          {location.direction !== undefined && !loading && (
            <div className={`flex items-center gap-1.5 ml-2 px-2 py-1 rounded-full ${darkMode ? 'bg-zinc-700/50' : 'bg-zinc-200/50'}`}>
              {/* Compass with rotating arrow */}
              <div className="relative w-6 h-6">
                {/* North indicator (fixed) */}
                <span className={`absolute -top-0.5 left-1/2 -translate-x-1/2 text-[8px] font-bold ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>N</span>
                {/* Compass circle */}
                <div className={`absolute inset-0.5 rounded-full border ${darkMode ? 'border-zinc-600' : 'border-zinc-300'}`} />
                {/* Direction arrow (rotates based on heading) */}
                <svg
                  className={`absolute inset-0 w-6 h-6 ${darkMode ? 'text-sky-400' : 'text-sky-600'}`}
                  viewBox="0 0 24 24"
                  style={{ transform: `rotate(${location.direction}deg)` }}
                >
                  <path
                    fill="currentColor"
                    d="M12 2L8 10h3v12h2V10h3L12 2z"
                  />
                </svg>
              </div>
              <span className={`text-xs font-medium ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                {getDirectionLabel(location.direction)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Battery Level Visual Component - Matches StatusCard style
function BatteryLevel({ percent, range, darkMode, units }) {
  const { t } = useTranslation();

  const getBarColor = (pct) => {
    if (pct >= 60) return 'bg-emerald-500';
    if (pct >= 30) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const getIconColor = (pct) => {
    if (pct >= 60) return darkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600';
    if (pct >= 30) return darkMode ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-600';
    return darkMode ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-600';
  };

  return (
    <div className="flex items-center gap-3">
      {/* Icon */}
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${getIconColor(percent)}`}>
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M4.5 10.5H18V15H4.5v-4.5zM3.75 18h15A2.25 2.25 0 0021 15.75v-6a2.25 2.25 0 00-2.25-2.25h-15A2.25 2.25 0 001.5 9.75v6A2.25 2.25 0 003.75 18z" />
        </svg>
      </div>
      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>{t('myCar.batteryLevel')}</p>
          <span className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{percent}%</span>
        </div>
        {/* Battery Bar */}
        <div className={`h-2 rounded-full overflow-hidden mt-1 ${darkMode ? 'bg-zinc-700' : 'bg-zinc-200'}`}>
          <div className={`h-full rounded-full transition-all duration-500 ${getBarColor(percent)}`} style={{ width: `${percent}%` }} />
        </div>
        {/* Range */}
        {range && (
          <div className="flex items-center justify-between mt-1">
            <span className={`text-xs ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>{t('myCar.estimatedRange')}</span>
            <span className={`text-xs font-medium ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>{units.dist(range).formatted}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// Tire Pressure Component - Matches StatusCard style
function TirePressure({ tirePressure, darkMode, units }) {
  const { t } = useTranslation();

  const formatPressure = (valueInBar) => {
    if (valueInBar === undefined || valueInBar === null) return '-';
    const psi = valueInBar * 14.5038;
    return units?.pressure === 'psi' ? psi.toFixed(1) : valueInBar.toFixed(1);
  };

  const getPressureColor = (valueInBar) => {
    if (valueInBar === undefined || valueInBar === null) return darkMode ? 'text-zinc-500' : 'text-zinc-400';
    if (valueInBar >= 2.0 && valueInBar <= 3.0) return darkMode ? 'text-emerald-400' : 'text-emerald-600';
    if (valueInBar >= 1.8 && valueInBar <= 3.2) return darkMode ? 'text-amber-400' : 'text-amber-600';
    return darkMode ? 'text-red-400' : 'text-red-600';
  };

  const fl = tirePressure?.frontLeft;
  const fr = tirePressure?.frontRight;
  const rl = tirePressure?.rearLeft;
  const rr = tirePressure?.rearRight;

  const pressureUnit = units?.pressure === 'psi' ? 'PSI' : 'bar';

  return (
    <div className="flex gap-3">
      {/* Icon - self-center to vertically center */}
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 self-center ${
        darkMode ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-600'
      }`}>
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </div>
      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>{t('myCar.tirePressure')}</p>
          <span className={`text-xs ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>{pressureUnit}</span>
        </div>
        <div className="grid grid-cols-2 gap-x-3 mt-0.5">
          <div className="flex items-center gap-1">
            <span className={`text-xs ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>{t('myCar.tireFL')}</span>
            <span className={`text-sm font-semibold ${getPressureColor(fl)}`}>{formatPressure(fl)}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className={`text-xs ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>{t('myCar.tireFR')}</span>
            <span className={`text-sm font-semibold ${getPressureColor(fr)}`}>{formatPressure(fr)}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className={`text-xs ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>{t('myCar.tireRL')}</span>
            <span className={`text-sm font-semibold ${getPressureColor(rl)}`}>{formatPressure(rl)}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className={`text-xs ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>{t('myCar.tireRR')}</span>
            <span className={`text-sm font-semibold ${getPressureColor(rr)}`}>{formatPressure(rr)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Status Card Component
function StatusCard({ icon, label, value, subValue, color, darkMode }) {
  // Map color names to actual Tailwind classes (dynamic classes don't work with JIT)
  const colorClasses = {
    blue: darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600',
    emerald: darkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600',
    amber: darkMode ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-600',
    red: darkMode ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-600',
    sky: darkMode ? 'bg-sky-500/20 text-sky-400' : 'bg-sky-100 text-sky-600',
    teal: darkMode ? 'bg-teal-500/20 text-teal-400' : 'bg-teal-100 text-teal-600'
  };

  return (
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${colorClasses[color] || colorClasses.blue}`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>{label}</p>
        <p className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{value}</p>
        {subValue && (
          <p className={`text-xs ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>{subValue}</p>
        )}
      </div>
    </div>
  );
}

export function MyCarTab({
  darkMode,
  units,
  vehicleData, // Live vehicle data from API
  onConnect, // Callback to open Porsche Connect modal
}) {
  const { t } = useTranslation();

  if (!vehicleData) {
    return (
      <div className={`p-8 rounded-2xl border text-center ${darkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-200'}`}>
        <svg className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-zinc-600' : 'text-zinc-300'}`} viewBox="0 0 381.678 381.678" fill="currentColor">
          <path d="M374.989,190.691l-10.216-6.854l-7.761-21.44c-1.352-3.734-4.785-6.315-8.749-6.575l-107.727-7.065l-31.874-22.369c-16.114-11.308-36.34-15.188-55.494-10.644l-23.529,5.583c-25.215,5.982-49.437,15.61-71.846,28.436c-0.313-0.03-0.629-0.048-0.95-0.048H29.985l-9.074-9.074c-3.905-3.905-10.237-3.905-14.143,0c-3.905,3.905-3.905,10.237,0,14.143l12.003,12.003c1.875,1.875,4.419,2.929,7.071,2.929h1.918c-5.84,4.469-11.506,9.177-16.971,14.122c-2.095,1.896-3.291,4.589-3.291,7.415v8.262L1.04,212.55c-0.684,1.38-1.04,2.9-1.04,4.44c0,12.406,10.093,22.499,22.499,22.499h36.258c4.41,16.286,19.31,28.304,36.971,28.304s32.562-12.018,36.971-28.304h123.539c4.41,16.286,19.31,28.304,36.971,28.304s32.562-12.018,36.971-28.304h24.834c10.034,0,18.94-6.746,21.659-16.406l4.435-15.768C382.881,201.017,380.422,194.336,374.989,190.691z M357.421,217.666c-0.302,1.073-1.291,1.823-2.406,1.823h-24.834c-4.41-16.286-19.31-28.304-36.971-28.304s-32.562,12.018-36.971,28.304H132.699c-4.41-16.286-19.31-28.304-36.971-28.304s-32.562,12.018-36.971,28.304H22.499c-0.846,0-1.596-0.423-2.048-1.068l6.009-12.126c0.684-1.38,1.04-2.9,1.04-4.44v-6.113c30.51-26.634,67.328-45.602,106.755-54.955l23.529-5.583c13.597-3.226,27.952-0.471,39.389,7.555l34.167,23.979c1.5,1.053,3.261,1.673,5.09,1.793l104,6.821l6.65,18.371c0.724,1.999,2.066,3.716,3.831,4.9l9.982,6.697L357.421,217.666z M311.514,229.489c0,10.093-8.211,18.304-18.304,18.304s-18.304-8.211-18.304-18.304s8.211-18.304,18.304-18.304S311.514,219.396,311.514,229.489z M114.032,229.489c0,10.093-8.211,18.304-18.304,18.304s-18.304-8.211-18.304-18.304s8.211-18.304,18.304-18.304S114.032,219.396,114.032,229.489z" />
        </svg>
        <h3 className={`text-lg font-medium mb-2 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
          {t('myCar.noDataTitle')}
        </h3>
        <p className={`text-sm mb-6 ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>
          {t('myCar.noDataDesc')}
        </p>
        {onConnect && (
          <button
            onClick={onConnect}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 text-white font-bold shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transition-shadow"
          >
            <span className="inline-flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
              </svg>
              {t('myCar.connectButton')}
            </span>
          </button>
        )}
      </div>
    );
  }

  const { vehicle, status, pictures } = vehicleData;
  const lastUpdated = status?.batteryLevel?.lastModified
    ? new Date(status.batteryLevel.lastModified).toLocaleString()
    : null;

  return (
    <div className="space-y-5">
      {/* Vehicle Header Banner */}
      <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-gradient-to-br from-sky-500/10 to-blue-500/10 border-sky-500/20' : 'bg-gradient-to-br from-sky-50 to-blue-50 border-sky-200'}`}>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-sky-400' : 'text-sky-600'}`}>
              {vehicle?.modelName || 'Porsche'}
            </h2>
            <p className={`text-sm mt-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              {vehicle?.modelType?.year && `${vehicle.modelType.year} • `}
              {vehicle?.modelType?.generation && `${t('myCar.generation')} ${vehicle.modelType.generation}`}
            </p>
            <p className={`text-xs mt-2 font-mono ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
              VIN: {vehicle?.vin}
            </p>
          </div>

          {/* Lock Status */}
          {status?.lockState?.isLocked !== undefined && (
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
              status.lockState.isLocked
                ? (darkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700')
                : (darkMode ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-700')
            }`}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                {status.lockState.isLocked ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                )}
              </svg>
              <span className="text-sm font-medium">
                {status.lockState.isLocked ? t('myCar.locked') : t('myCar.unlocked')}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Battery, Tire Pressure & Mileage Cards - Above photos/map */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Battery Level Card - 125% relative width */}
        <div className={`flex-[1.25] p-4 rounded-xl border ${darkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-200'}`}>
          <BatteryLevel
            percent={status?.batteryLevel?.percent}
            range={status?.range?.kilometers}
            darkMode={darkMode}
            units={units}
          />
        </div>

        {/* Tire Pressure Card - 125% relative width */}
        <div className={`flex-[1.25] p-4 rounded-xl border ${darkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-200'}`}>
          <TirePressure
            tirePressure={status?.tirePressure}
            darkMode={darkMode}
            units={units}
          />
        </div>

        {/* Mileage Card - 100% relative width */}
        <div className={`flex-1 p-4 rounded-xl border flex items-center ${darkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-200'}`}>
          <StatusCard
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
              </svg>
            }
            label={t('myCar.totalMileage')}
            value={status?.mileage?.kilometers ? units.dist(status.mileage.kilometers).formatted : '-'}
            darkMode={darkMode}
            color="teal"
          />
        </div>
      </div>

      {/* Main Content Grid - Photos and Map */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left Column - Vehicle Images */}
        <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-200'}`}>
          <h3 className={`font-medium mb-4 flex items-center gap-2 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            {t('myCar.vehiclePhotos')}
          </h3>
          <ImageCarousel images={pictures} darkMode={darkMode} />
        </div>

        {/* Right Column - Location */}
        <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-200'}`}>
          <h3 className={`font-medium mb-4 flex items-center gap-2 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            {t('myCar.lastKnownLocation')}
          </h3>
          {status?.gpsLocation ? (
            <LocationMap location={status.gpsLocation} darkMode={darkMode} />
          ) : (
            <div className={`p-8 rounded-xl text-center ${darkMode ? 'bg-zinc-800/50' : 'bg-zinc-50'}`}>
              <p className={`text-sm ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>
                {t('myCar.locationUnavailable')}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Last Updated */}
      {lastUpdated && (
        <p className={`text-center text-xs ${darkMode ? 'text-zinc-600' : 'text-zinc-400'}`}>
          {t('myCar.lastUpdated')}: {lastUpdated}
        </p>
      )}
    </div>
  );
}
