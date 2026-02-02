import { useTranslation } from '../../i18n';

export function UploadModal({
  showUpload,
  setShowUpload,
  uploadStatus,
  handleFileUpload,
  processUploadedFiles,
  darkMode,
  hasExistingData,
  uploadMode,
  setUploadMode
}) {
  const { t } = useTranslation();

  if (!showUpload) return null;

  const isMergeMode = uploadMode === 'merge';
  const isAudiMode = uploadStatus.start?.isAudi;

  return (
    <div className={`fixed inset-0 ${darkMode ? 'bg-black/70' : 'bg-black/50'} backdrop-blur-sm z-50 flex items-center justify-center p-4`}>
      <div className={`rounded-2xl border max-w-md w-full p-5 ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
        <div className="flex items-center justify-between mb-5">
          <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
            {isMergeMode ? t('upload.mergeTitle') : t('upload.title')}
          </h2>
          <button onClick={() => setShowUpload(false)} className={`p-1.5 rounded-lg ${darkMode ? 'hover:bg-zinc-800 text-zinc-400' : 'hover:bg-zinc-100 text-zinc-600'}`}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mode Toggle (only show if there's existing data) */}
        {hasExistingData && (
          <div className={`mb-4 p-3 rounded-xl ${darkMode ? 'bg-zinc-800/50' : 'bg-zinc-100'}`}>
            <div className="flex gap-2">
              <button
                onClick={() => setUploadMode('replace')}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  !isMergeMode
                    ? 'bg-sky-500 text-white'
                    : darkMode ? 'text-zinc-400 hover:bg-zinc-700' : 'text-zinc-600 hover:bg-zinc-200'
                }`}
              >
                {t('upload.modeReplace')}
              </button>
              <button
                onClick={() => setUploadMode('merge')}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  isMergeMode
                    ? 'bg-emerald-500 text-white'
                    : darkMode ? 'text-zinc-400 hover:bg-zinc-700' : 'text-zinc-600 hover:bg-zinc-200'
                }`}
              >
                {t('upload.modeMerge')}
              </button>
            </div>
            <p className={`mt-2 text-xs ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>
              {isMergeMode ? t('upload.mergeDesc') : t('upload.replaceDesc')}
            </p>
          </div>
        )}

        <div className="space-y-3">
          {/* Audi ZIP upload */}
          <label className={`block p-4 rounded-xl border-2 border-dashed cursor-pointer text-center ${darkMode ? 'border-zinc-700 hover:border-orange-500/50' : 'border-zinc-300 hover:border-orange-500'}`}>
            <input type="file" accept=".zip" className="hidden" onChange={(e) => e.target.files[0] && handleFileUpload(e.target.files[0], 'audi')} />
            <div className={`text-sm font-medium ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>{t('upload.audiZip')} <span className="text-zinc-500">{t('upload.audiZipAlt')}</span></div>
            <div className="text-xs text-zinc-500">{t('upload.audiZipDesc')}</div>
            {uploadStatus.start?.isAudi && <div className="mt-2 text-xs text-emerald-500"><span className="inline-flex items-center gap-1"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>{uploadStatus.start.name}</span> ({t('upload.tripsCount', { count: uploadStatus.start.rows })})</div>}
          </label>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className={`flex-1 h-px ${darkMode ? 'bg-zinc-700' : 'bg-zinc-200'}`}></div>
            <span className={`text-xs ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>{t('upload.orPorsche')}</span>
            <div className={`flex-1 h-px ${darkMode ? 'bg-zinc-700' : 'bg-zinc-200'}`}></div>
          </div>

          {/* Porsche CSV uploads */}
          <label className={`block p-4 rounded-xl border-2 border-dashed cursor-pointer text-center ${darkMode ? 'border-zinc-700 hover:border-sky-500/50' : 'border-zinc-300 hover:border-sky-500'} ${isAudiMode ? 'opacity-50 pointer-events-none' : ''}`}>
            <input type="file" accept=".csv" className="hidden" disabled={isAudiMode} onChange={(e) => e.target.files[0] && handleFileUpload(e.target.files[0], 'start')} />
            <div className={`text-sm font-medium ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>{t('upload.sinceStart')} <span className="text-sky-500">*{t('common.required')}</span></div>
            <div className="text-xs text-zinc-500">{t('upload.sinceStartDesc')}</div>
            {uploadStatus.start && !uploadStatus.start.isAudi && <div className="mt-2 text-xs text-emerald-500"><span className="inline-flex items-center gap-1"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>{uploadStatus.start.name}</span> ({t('upload.tripsCount', { count: uploadStatus.start.rows })})</div>}
          </label>
          <label className={`block p-4 rounded-xl border-2 border-dashed cursor-pointer text-center ${darkMode ? 'border-zinc-700 hover:border-blue-500/50' : 'border-zinc-300 hover:border-blue-500'} ${isAudiMode ? 'opacity-50 pointer-events-none' : ''}`}>
            <input type="file" accept=".csv" className="hidden" disabled={isAudiMode} onChange={(e) => e.target.files[0] && handleFileUpload(e.target.files[0], 'charge')} />
            <div className={`text-sm font-medium ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>{t('upload.sinceCharge')} <span className="text-zinc-500">{t('common.optional')}</span></div>
            <div className="text-xs text-zinc-500">{t('upload.sinceChargeDesc')}</div>
            {uploadStatus.charge && <div className="mt-2 text-xs text-emerald-500"><span className="inline-flex items-center gap-1"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>{uploadStatus.charge.name}</span> ({t('upload.cyclesCount', { count: uploadStatus.charge.rows })})</div>}
          </label>
          <button
            onClick={processUploadedFiles}
            disabled={!uploadStatus.start}
            className={`w-full py-2.5 rounded-xl text-white font-bold transition-colors ${
              !uploadStatus.start
                ? 'opacity-50 bg-zinc-500'
                : isMergeMode
                  ? 'bg-emerald-500 hover:bg-emerald-600'
                  : 'bg-sky-500 hover:bg-sky-600'
            }`}
          >
            {isMergeMode ? t('upload.mergeButton') : t('upload.processButton')}
          </button>
        </div>
      </div>
    </div>
  );
}
