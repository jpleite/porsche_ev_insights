import { useState, useEffect } from 'react';
import { useTranslation } from '../../i18n';
import * as porscheConnect from '../../services/porscheConnect';

export function PorscheConnectModal({
  darkMode,
  show,
  onClose,
  onDataLoaded,
  onError
}) {
  const { t } = useTranslation();
  const [step, setStep] = useState('check'); // check, login, captcha, vehicles, loading, error
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [vehicles, setVehicles] = useState([]);
  const [selectedVin, setSelectedVin] = useState(null);
  const [serverAvailable, setServerAvailable] = useState(null);
  // Captcha state
  const [captchaImage, setCaptchaImage] = useState(null);
  const [captchaState, setCaptchaState] = useState(null);
  const [captchaCode, setCaptchaCode] = useState('');

  // Check server availability and existing session on mount
  useEffect(() => {
    if (show) {
      checkInitialState();
    }
  }, [show]);

  const checkInitialState = async () => {
    setStep('check');
    setError(null);

    // Check if server is available
    const available = await porscheConnect.checkServerAvailable();
    setServerAvailable(available);

    if (!available) {
      setStep('error');
      setError(t('porscheConnect.serverUnavailable'));
      return;
    }

    // Check for existing session
    const existingSession = porscheConnect.getStoredSession();
    if (existingSession) {
      // Try to fetch vehicles with existing session
      try {
        setLoadingMessage(t('porscheConnect.loadingVehicles'));
        const vehicleList = await porscheConnect.getVehicles();
        if (vehicleList?.length > 0) {
          setVehicles(vehicleList);
          setStep('vehicles');
          return;
        }
      } catch {
        // Session expired, clear and show login
        porscheConnect.clearSession();
      }
    }

    setStep('login');
  };

  const handleLogin = async (e, captcha = null) => {
    e?.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await porscheConnect.login(email, password, captcha);

      // Check if captcha is required
      if (result.captchaRequired) {
        setCaptchaImage(result.captchaImage);
        setCaptchaState(result.captchaState);
        setCaptchaCode('');
        setStep('captcha');
        setLoading(false);
        return;
      }

      // Fetch vehicles
      setLoadingMessage(t('porscheConnect.loadingVehicles'));
      const vehicleList = await porscheConnect.getVehicles();

      if (!vehicleList?.length) {
        throw new Error(t('porscheConnect.noVehicles'));
      }

      setVehicles(vehicleList);

      // Auto-select if only one vehicle
      if (vehicleList.length === 1) {
        setSelectedVin(vehicleList[0].vin);
      }

      setStep('vehicles');
    } catch (err) {
      setError(err.message);
      // If we were on the captcha step and it failed, stay there
      if (step === 'captcha') {
        // Refresh captcha on error
        setCaptchaCode('');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCaptchaSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(null, { code: captchaCode, state: captchaState });
  };

  const handleFetchData = async () => {
    if (!selectedVin) return;

    setLoading(true);
    setStep('loading');
    setError(null);

    try {
      const { trips, chargeData, vehicleInfo } = await porscheConnect.fetchAllData(
        selectedVin,
        ({ message }) => setLoadingMessage(message)
      );

      if (trips.length === 0) {
        throw new Error(t('porscheConnect.noTrips'));
      }

      // Pass data to parent (including charge cycle data)
      onDataLoaded({
        trips,
        chargeData,
        vehicleInfo,
        vin: selectedVin
      });

      onClose();
    } catch (err) {
      setError(err.message);
      setStep('error');
      onError?.(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await porscheConnect.logout();
    setVehicles([]);
    setSelectedVin(null);
    setStep('login');
  };

  const handleRetry = () => {
    checkInitialState();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className={`relative w-full max-w-md rounded-2xl shadow-2xl ${darkMode ? 'bg-zinc-900' : 'bg-white'}`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-5 border-b ${darkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
          <div className="flex items-center gap-3">
            {/* Porsche Connect logo */}
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${darkMode ? 'bg-zinc-800' : 'bg-zinc-100'}`}>
              <svg className={`w-6 h-6 ${darkMode ? 'text-sky-400' : 'text-sky-600'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
              </svg>
            </div>
            <div>
              <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                {t('porscheConnect.title')}
              </h2>
              <p className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                {t('porscheConnect.subtitle')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-zinc-800 text-zinc-400' : 'hover:bg-zinc-100 text-zinc-500'}`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Checking state */}
          {step === 'check' && (
            <div className="flex flex-col items-center py-8">
              <div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin mb-4" />
              <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                {t('porscheConnect.checking')}
              </p>
            </div>
          )}

          {/* Login form */}
          {step === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <p className={`text-sm mb-4 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                {t('porscheConnect.loginDescription')}
              </p>

              <div>
                <label className={`block text-sm font-medium mb-1.5 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                  {t('porscheConnect.email')}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  autoComplete="email"
                  className={`w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-colors ${
                    darkMode
                      ? 'bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500'
                      : 'bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1.5 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                  {t('porscheConnect.password')}
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  className={`w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-colors ${
                    darkMode
                      ? 'bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500'
                      : 'bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400'
                  }`}
                />
              </div>

              {error && (
                <div className={`p-3 rounded-xl text-sm ${darkMode ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-red-50 text-red-600 border border-red-200'}`}>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !email || !password}
                className={`w-full py-2.5 px-4 rounded-xl font-bold text-white transition-colors ${
                  loading || !email || !password
                    ? 'bg-zinc-600 cursor-not-allowed'
                    : 'bg-sky-500 hover:bg-sky-600'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {t('porscheConnect.loggingIn')}
                  </span>
                ) : (
                  t('porscheConnect.login')
                )}
              </button>

              <p className={`text-xs text-center ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                {t('porscheConnect.privacyNote')}
              </p>
            </form>
          )}

          {/* Captcha step */}
          {step === 'captcha' && (
            <form onSubmit={handleCaptchaSubmit} className="space-y-4">
              <p className={`text-sm mb-4 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                {t('porscheConnect.captchaDescription')}
              </p>

              {/* Captcha image */}
              {captchaImage && (
                <div className={`p-4 rounded-xl ${darkMode ? 'bg-zinc-800' : 'bg-zinc-100'} flex justify-center`}>
                  <img
                    src={captchaImage}
                    alt="Captcha"
                    className="max-w-full h-auto"
                    style={{ maxHeight: '120px' }}
                  />
                </div>
              )}

              <div>
                <label className={`block text-sm font-medium mb-1.5 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                  {t('porscheConnect.captchaLabel')}
                </label>
                <input
                  type="text"
                  value={captchaCode}
                  onChange={(e) => setCaptchaCode(e.target.value)}
                  placeholder={t('porscheConnect.captchaPlaceholder')}
                  required
                  autoComplete="off"
                  autoFocus
                  className={`w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-colors ${
                    darkMode
                      ? 'bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500'
                      : 'bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400'
                  }`}
                />
              </div>

              {error && (
                <div className={`p-3 rounded-xl text-sm ${darkMode ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-red-50 text-red-600 border border-red-200'}`}>
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setStep('login');
                    setCaptchaImage(null);
                    setCaptchaState(null);
                    setCaptchaCode('');
                    setError(null);
                  }}
                  className={`flex-1 py-2.5 px-4 rounded-xl font-medium transition-colors ${
                    darkMode
                      ? 'bg-zinc-800 hover:bg-zinc-700 text-white'
                      : 'bg-zinc-200 hover:bg-zinc-300 text-zinc-900'
                  }`}
                >
                  {t('common.back')}
                </button>
                <button
                  type="submit"
                  disabled={loading || !captchaCode}
                  className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-white transition-colors ${
                    loading || !captchaCode
                      ? 'bg-zinc-600 cursor-not-allowed'
                      : 'bg-sky-500 hover:bg-sky-600'
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {t('porscheConnect.verifying')}
                    </span>
                  ) : (
                    t('porscheConnect.verifyCaptcha')
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Vehicle selection */}
          {step === 'vehicles' && (
            <div className="space-y-4">
              <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                {t('porscheConnect.selectVehicle')}
              </p>

              <div className="space-y-2">
                {vehicles.map((vehicle) => (
                  <button
                    key={vehicle.vin}
                    onClick={() => setSelectedVin(vehicle.vin)}
                    className={`w-full p-4 rounded-xl border text-left transition-colors ${
                      selectedVin === vehicle.vin
                        ? darkMode
                          ? 'border-sky-500 bg-sky-500/10'
                          : 'border-sky-500 bg-sky-50'
                        : darkMode
                          ? 'border-zinc-700 hover:border-zinc-600 bg-zinc-800/50'
                          : 'border-zinc-200 hover:border-zinc-300 bg-zinc-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        darkMode ? 'bg-zinc-700' : 'bg-zinc-200'
                      }`}>
                        <svg className={`w-7 h-7 ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`} viewBox="0 0 381.678 381.678" fill="currentColor">
                          <path d="M374.989,190.691l-10.216-6.854l-7.761-21.44c-1.352-3.734-4.785-6.315-8.749-6.575l-107.727-7.065l-31.874-22.369c-16.114-11.308-36.34-15.188-55.494-10.644l-23.529,5.583c-25.215,5.982-49.437,15.61-71.846,28.436c-0.313-0.03-0.629-0.048-0.95-0.048H29.985l-9.074-9.074c-3.905-3.905-10.237-3.905-14.143,0c-3.905,3.905-3.905,10.237,0,14.143l12.003,12.003c1.875,1.875,4.419,2.929,7.071,2.929h1.918c-5.84,4.469-11.506,9.177-16.971,14.122c-2.095,1.896-3.291,4.589-3.291,7.415v8.262L1.04,212.55c-0.684,1.38-1.04,2.9-1.04,4.44c0,12.406,10.093,22.499,22.499,22.499h36.258c4.41,16.286,19.31,28.304,36.971,28.304s32.562-12.018,36.971-28.304h123.539c4.41,16.286,19.31,28.304,36.971,28.304s32.562-12.018,36.971-28.304h24.834c10.034,0,18.94-6.746,21.659-16.406l4.435-15.768C382.881,201.017,380.422,194.336,374.989,190.691z M357.421,217.666c-0.302,1.073-1.291,1.823-2.406,1.823h-24.834c-4.41-16.286-19.31-28.304-36.971-28.304s-32.562,12.018-36.971,28.304H132.699c-4.41-16.286-19.31-28.304-36.971-28.304s-32.562,12.018-36.971,28.304H22.499c-0.846,0-1.596-0.423-2.048-1.068l6.009-12.126c0.684-1.38,1.04-2.9,1.04-4.44v-6.113c30.51-26.634,67.328-45.602,106.755-54.955l23.529-5.583c13.597-3.226,27.952-0.471,39.389,7.555l34.167,23.979c1.5,1.053,3.261,1.673,5.09,1.793l104,6.821l6.65,18.371c0.724,1.999,2.066,3.716,3.831,4.9l9.982,6.697L357.421,217.666z M311.514,229.489c0,10.093-8.211,18.304-18.304,18.304s-18.304-8.211-18.304-18.304s8.211-18.304,18.304-18.304S311.514,219.396,311.514,229.489z M114.032,229.489c0,10.093-8.211,18.304-18.304,18.304s-18.304-8.211-18.304-18.304s8.211-18.304,18.304-18.304S114.032,219.396,114.032,229.489z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className={`font-medium ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                          {vehicle.modelName || 'Porsche'}
                        </div>
                        <div className={`text-xs ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                          {vehicle.modelType?.year} • {vehicle.vin?.slice(-6)}
                        </div>
                      </div>
                      {selectedVin === vehicle.vin && (
                        <svg className="w-5 h-5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {error && (
                <div className={`p-3 rounded-xl text-sm ${darkMode ? 'bg-red-500/10 text-red-400' : 'bg-red-50 text-red-600'}`}>
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={handleLogout}
                  className={`flex-1 py-2.5 px-4 rounded-xl font-medium transition-colors ${
                    darkMode
                      ? 'bg-zinc-800 hover:bg-zinc-700 text-white'
                      : 'bg-zinc-200 hover:bg-zinc-300 text-zinc-900'
                  }`}
                >
                  {t('porscheConnect.logout')}
                </button>
                <button
                  onClick={handleFetchData}
                  disabled={!selectedVin || loading}
                  className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-white transition-colors ${
                    !selectedVin || loading
                      ? 'bg-zinc-600 cursor-not-allowed'
                      : 'bg-sky-500 hover:bg-sky-600'
                  }`}
                >
                  {t('porscheConnect.fetchData')}
                </button>
              </div>
            </div>
          )}

          {/* Loading state */}
          {step === 'loading' && (
            <div className="flex flex-col items-center py-8">
              <div className="w-12 h-12 border-3 border-sky-500 border-t-transparent rounded-full animate-spin mb-4" />
              <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                {loadingMessage || t('porscheConnect.loading')}
              </p>
            </div>
          )}

          {/* Error state */}
          {step === 'error' && (
            <div className="text-center py-6">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${darkMode ? 'bg-red-500/10' : 'bg-red-50'}`}>
                <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
              </div>
              <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                {t('porscheConnect.errorTitle')}
              </h3>
              <p className={`text-sm mb-4 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                {error}
              </p>
              {!serverAvailable && (
                <div className={`p-3 rounded-xl text-sm mb-4 ${darkMode ? 'bg-amber-500/10 text-amber-400' : 'bg-amber-50 text-amber-600'}`}>
                  {t('porscheConnect.serverInstructions')}
                </div>
              )}
              <div className="flex gap-3 justify-center">
                <button
                  onClick={onClose}
                  className={`py-2.5 px-4 rounded-xl font-medium transition-colors ${
                    darkMode
                      ? 'bg-zinc-800 hover:bg-zinc-700 text-white'
                      : 'bg-zinc-200 hover:bg-zinc-300 text-zinc-900'
                  }`}
                >
                  {t('common.cancel')}
                </button>
                <button
                  onClick={handleRetry}
                  className="py-2.5 px-4 rounded-xl font-bold bg-sky-500 hover:bg-sky-600 text-white transition-colors"
                >
                  {t('common.retry')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
