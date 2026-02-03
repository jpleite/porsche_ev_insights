import { useTranslation } from '../../i18n';

export function Header({ darkMode, menuOpen, setMenuOpen }) {
  const { t } = useTranslation();

  return (
    <header className={`border-b backdrop-blur-sm sticky top-0 z-50 ${darkMode ? 'border-zinc-800 bg-zinc-950/80' : 'border-zinc-200 bg-white/80'}`}>
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-sky-500 flex items-center justify-center text-white">
              <svg className="w-5 h-5" viewBox="0 0 381.678 381.678" fill="currentColor">
                <path d="M374.989,190.691l-10.216-6.854l-7.761-21.44c-1.352-3.734-4.785-6.315-8.749-6.575l-107.727-7.065l-31.874-22.369c-16.114-11.308-36.34-15.188-55.494-10.644l-23.529,5.583c-25.215,5.982-49.437,15.61-71.846,28.436c-0.313-0.03-0.629-0.048-0.95-0.048H29.985l-9.074-9.074c-3.905-3.905-10.237-3.905-14.143,0c-3.905,3.905-3.905,10.237,0,14.143l12.003,12.003c1.875,1.875,4.419,2.929,7.071,2.929h1.918c-5.84,4.469-11.506,9.177-16.971,14.122c-2.095,1.896-3.291,4.589-3.291,7.415v8.262L1.04,212.55c-0.684,1.38-1.04,2.9-1.04,4.44c0,12.406,10.093,22.499,22.499,22.499h36.258c4.41,16.286,19.31,28.304,36.971,28.304s32.562-12.018,36.971-28.304h123.539c4.41,16.286,19.31,28.304,36.971,28.304s32.562-12.018,36.971-28.304h24.834c10.034,0,18.94-6.746,21.659-16.406l4.435-15.768C382.881,201.017,380.422,194.336,374.989,190.691z M357.421,217.666c-0.302,1.073-1.291,1.823-2.406,1.823h-24.834c-4.41-16.286-19.31-28.304-36.971-28.304s-32.562,12.018-36.971,28.304H132.699c-4.41-16.286-19.31-28.304-36.971-28.304s-32.562,12.018-36.971,28.304H22.499c-0.846,0-1.596-0.423-2.048-1.068l6.009-12.126c0.684-1.38,1.04-2.9,1.04-4.44v-6.113c30.51-26.634,67.328-45.602,106.755-54.955l23.529-5.583c13.597-3.226,27.952-0.471,39.389,7.555l34.167,23.979c1.5,1.053,3.261,1.673,5.09,1.793l104,6.821l6.65,18.371c0.724,1.999,2.066,3.716,3.831,4.9l9.982,6.697L357.421,217.666z M311.514,229.489c0,10.093-8.211,18.304-18.304,18.304s-18.304-8.211-18.304-18.304s8.211-18.304,18.304-18.304S311.514,219.396,311.514,229.489z M114.032,229.489c0,10.093-8.211,18.304-18.304,18.304s-18.304-8.211-18.304-18.304s8.211-18.304,18.304-18.304S114.032,219.396,114.032,229.489z" />
              </svg>
            </div>
            <div>
              <h1 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{t('header.title')}</h1>
              <p className={`text-xs ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>{t('header.subtitle')}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/jpleite/porsche_ev_insights"
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full ${darkMode ? 'bg-emerald-500/10 border-emerald-500/20 hover:bg-emerald-500/20' : 'bg-emerald-500/20 border-emerald-500/30 hover:bg-emerald-500/30'} border transition-colors`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className={`text-xs font-medium ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>{t('header.localFirst')}</span>
            </a>
            <a
              href="https://github.com/jpleite/porsche_ev_insights"
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full ${darkMode ? 'bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/20' : 'bg-blue-500/20 border-blue-500/30 hover:bg-blue-500/30'} border transition-colors`}
            >
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span className={`text-xs font-medium ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{t('header.privacyFirst')}</span>
            </a>
            <a
              href="https://github.com/jpleite/porsche_ev_insights/wiki"
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full ${darkMode ? 'bg-amber-500/10 border-amber-500/20 hover:bg-amber-500/20' : 'bg-amber-500/20 border-amber-500/30 hover:bg-amber-500/30'} border transition-colors`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span className={`text-xs font-medium ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>{t('header.help')}</span>
            </a>
            {/* Menu toggle button - visible on mobile/tablet */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${darkMode ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-zinc-200 hover:bg-zinc-300'}`}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg className={`w-5 h-5 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className={`w-5 h-5 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
