import { useTranslation } from '../i18n';

export function WelcomeScreen({ setShowUpload, setUseSampleData, setShowPorscheConnect, darkMode }) {
  const { t } = useTranslation();

  return (
    <div className="text-center py-16">
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 ${darkMode ? 'bg-zinc-800 text-sky-400' : 'bg-zinc-200 text-sky-600'}`}>
        <svg className="w-10 h-10" viewBox="0 0 381.678 381.678" fill="currentColor">
          <path d="M374.989,190.691l-10.216-6.854l-7.761-21.44c-1.352-3.734-4.785-6.315-8.749-6.575l-107.727-7.065l-31.874-22.369c-16.114-11.308-36.34-15.188-55.494-10.644l-23.529,5.583c-25.215,5.982-49.437,15.61-71.846,28.436c-0.313-0.03-0.629-0.048-0.95-0.048H29.985l-9.074-9.074c-3.905-3.905-10.237-3.905-14.143,0c-3.905,3.905-3.905,10.237,0,14.143l12.003,12.003c1.875,1.875,4.419,2.929,7.071,2.929h1.918c-5.84,4.469-11.506,9.177-16.971,14.122c-2.095,1.896-3.291,4.589-3.291,7.415v8.262L1.04,212.55c-0.684,1.38-1.04,2.9-1.04,4.44c0,12.406,10.093,22.499,22.499,22.499h36.258c4.41,16.286,19.31,28.304,36.971,28.304s32.562-12.018,36.971-28.304h123.539c4.41,16.286,19.31,28.304,36.971,28.304s32.562-12.018,36.971-28.304h24.834c10.034,0,18.94-6.746,21.659-16.406l4.435-15.768C382.881,201.017,380.422,194.336,374.989,190.691z M357.421,217.666c-0.302,1.073-1.291,1.823-2.406,1.823h-24.834c-4.41-16.286-19.31-28.304-36.971-28.304s-32.562,12.018-36.971,28.304H132.699c-4.41-16.286-19.31-28.304-36.971-28.304s-32.562,12.018-36.971,28.304H22.499c-0.846,0-1.596-0.423-2.048-1.068l6.009-12.126c0.684-1.38,1.04-2.9,1.04-4.44v-6.113c30.51-26.634,67.328-45.602,106.755-54.955l23.529-5.583c13.597-3.226,27.952-0.471,39.389,7.555l34.167,23.979c1.5,1.053,3.261,1.673,5.09,1.793l104,6.821l6.65,18.371c0.724,1.999,2.066,3.716,3.831,4.9l9.982,6.697L357.421,217.666z M311.514,229.489c0,10.093-8.211,18.304-18.304,18.304s-18.304-8.211-18.304-18.304s8.211-18.304,18.304-18.304S311.514,219.396,311.514,229.489z M114.032,229.489c0,10.093-8.211,18.304-18.304,18.304s-18.304-8.211-18.304-18.304s8.211-18.304,18.304-18.304S114.032,219.396,114.032,229.489z" />
        </svg>
      </div>
      <h2 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{t('welcome.title')}</h2>
      <p className={`mb-6 max-w-md mx-auto text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>{t('welcome.description')}</p>

      {/* Main options */}
      <div className="flex flex-col gap-3 max-w-md mx-auto">
        {/* Porsche Connect - Primary option */}
        <button
          onClick={() => setShowPorscheConnect(true)}
          className="w-full px-5 py-4 rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 text-white font-bold shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transition-shadow"
        >
          <span className="inline-flex items-center gap-3">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
            </svg>
            <span className="flex flex-col items-start">
              <span>{t('welcome.connectButton')}</span>
              <span className="text-xs font-normal opacity-80">{t('welcome.connectDesc')}</span>
            </span>
          </span>
        </button>

        {/* CSV Upload - Secondary option */}
        <button
          onClick={() => setShowUpload(true)}
          className={`w-full px-5 py-3 rounded-xl font-medium ${darkMode ? 'bg-zinc-800 hover:bg-zinc-700 text-white' : 'bg-zinc-200 hover:bg-zinc-300 text-zinc-900'}`}
        >
          <span className="inline-flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            {t('welcome.uploadButton')}
          </span>
        </button>

        {/* Sample Data - Tertiary option */}
        <button
          onClick={() => setUseSampleData(true)}
          className={`w-full px-5 py-3 rounded-xl font-medium ${darkMode ? 'bg-zinc-800/50 hover:bg-zinc-800 text-zinc-300' : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'}`}
        >
          <span className="inline-flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>
            {t('welcome.sampleButton')}
          </span>
        </button>
      </div>

      {/* Privacy note */}
      <div className={`mt-10 max-w-sm mx-auto p-3 rounded-xl border ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-100 border-zinc-200'}`}>
        <p className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
          <span className="inline-flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            <strong className={darkMode ? 'text-white' : 'text-zinc-900'}>{t('welcome.privacyTitle')}</strong>
          </span>
          {' '}&mdash; {t('welcome.privacyText')}
        </p>
      </div>
    </div>
  );
}
