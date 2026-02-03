import { icons } from '../icons/Icons';
import { tabs } from '../../constants/tabs';
import { useTranslation } from '../../i18n';

export function MobileSidebar({
  menuOpen,
  setMenuOpen,
  activeTab,
  setActiveTab,
  showSettings,
  setShowSettings,
  darkMode,
  setDarkMode
}) {
  const { t } = useTranslation();

  return (
    <>
      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar Menu - slides in from left on mobile/tablet */}
      <aside
        className={`lg:hidden fixed top-0 left-0 h-full z-50 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        } w-72 ${
          darkMode ? 'bg-zinc-900 border-r border-zinc-800' : 'bg-white border-r border-zinc-200'
        } overflow-y-auto`}
      >
        <div className="p-4 flex flex-col h-full">
          {/* Mobile header */}
          <div className={`flex items-center justify-between mb-6 pb-4 border-b ${darkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" viewBox="0 0 381.678 381.678" fill="currentColor">
                  <path d="M374.989,190.691l-10.216-6.854l-7.761-21.44c-1.352-3.734-4.785-6.315-8.749-6.575l-107.727-7.065l-31.874-22.369c-16.114-11.308-36.34-15.188-55.494-10.644l-23.529,5.583c-25.215,5.982-49.437,15.61-71.846,28.436c-0.313-0.03-0.629-0.048-0.95-0.048H29.985l-9.074-9.074c-3.905-3.905-10.237-3.905-14.143,0c-3.905,3.905-3.905,10.237,0,14.143l12.003,12.003c1.875,1.875,4.419,2.929,7.071,2.929h1.918c-5.84,4.469-11.506,9.177-16.971,14.122c-2.095,1.896-3.291,4.589-3.291,7.415v8.262L1.04,212.55c-0.684,1.38-1.04,2.9-1.04,4.44c0,12.406,10.093,22.499,22.499,22.499h36.258c4.41,16.286,19.31,28.304,36.971,28.304s32.562-12.018,36.971-28.304h123.539c4.41,16.286,19.31,28.304,36.971,28.304s32.562-12.018,36.971-28.304h24.834c10.034,0,18.94-6.746,21.659-16.406l4.435-15.768C382.881,201.017,380.422,194.336,374.989,190.691z M357.421,217.666c-0.302,1.073-1.291,1.823-2.406,1.823h-24.834c-4.41-16.286-19.31-28.304-36.971-28.304s-32.562,12.018-36.971,28.304H132.699c-4.41-16.286-19.31-28.304-36.971-28.304s-32.562,12.018-36.971,28.304H22.499c-0.846,0-1.596-0.423-2.048-1.068l6.009-12.126c0.684-1.38,1.04-2.9,1.04-4.44v-6.113c30.51-26.634,67.328-45.602,106.755-54.955l23.529-5.583c13.597-3.226,27.952-0.471,39.389,7.555l34.167,23.979c1.5,1.053,3.261,1.673,5.09,1.793l104,6.821l6.65,18.371c0.724,1.999,2.066,3.716,3.831,4.9l9.982,6.697L357.421,217.666z M311.514,229.489c0,10.093-8.211,18.304-18.304,18.304s-18.304-8.211-18.304-18.304s8.211-18.304,18.304-18.304S311.514,219.396,311.514,229.489z M114.032,229.489c0,10.093-8.211,18.304-18.304,18.304s-18.304-8.211-18.304-18.304s8.211-18.304,18.304-18.304S114.032,219.396,114.032,229.489z" />
                </svg>
              </div>
              <span className={`font-semibold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>Menu</span>
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              className={`p-1.5 rounded-lg ${darkMode ? 'hover:bg-zinc-800' : 'hover:bg-zinc-100'}`}
            >
              <svg className={`w-5 h-5 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Menu Items */}
          <nav className="flex-1 space-y-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setMenuOpen(false);
                  setShowSettings(false);
                }}
                className={`w-full px-3 py-2.5 rounded-xl font-medium transition-all flex items-center gap-3 text-sm ${
                  activeTab === tab.id && !showSettings
                    ? 'bg-sky-500 text-white'
                    : darkMode
                      ? 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                      : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
                }`}
              >
                {icons[tab.id]}
                <span>{t(`tabs.${tab.id}`)}</span>
              </button>
            ))}
          </nav>

          {/* Divider */}
          <div className={`my-4 border-t ${darkMode ? 'border-zinc-800' : 'border-zinc-200'}`} />

          {/* Settings Section */}
          <div className="space-y-1">
            <button
              onClick={() => {
                setShowSettings(!showSettings);
                setMenuOpen(false);
              }}
              className={`w-full px-3 py-2.5 rounded-xl font-medium transition-all flex items-center gap-3 text-sm ${
                showSettings
                  ? 'bg-sky-500 text-white'
                  : darkMode
                    ? 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                    : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
              }`}
            >
              {icons.settings}
              <span>{t('common.settings')}</span>
            </button>

            {/* Dark mode toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-full px-3 py-2.5 rounded-xl font-medium transition-all flex items-center gap-3 text-sm ${
                darkMode
                  ? 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                  : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
              }`}
            >
              {darkMode ? icons.moon : icons.sun}
              <span>{darkMode ? t('sidebar.darkMode') : t('sidebar.lightMode')}</span>
            </button>
          </div>

          {/* Privacy badges */}
          <div className="mt-4 pt-4 border-t border-zinc-700 space-y-2">
            <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full ${darkMode ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-500/20 border-emerald-500/30'} border`}>
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className={`text-xs font-medium ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>{t('header.localFirst')}</span>
            </div>
            <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full ${darkMode ? 'bg-blue-500/10 border-blue-500/20' : 'bg-blue-500/20 border-blue-500/30'} border`}>
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span className={`text-xs font-medium ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{t('header.privacyFirst')}</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
