import { useTranslation } from '../../i18n';
import { version } from '../../../package.json';

export function Footer({ darkMode }) {
  const { t } = useTranslation();

  return (
    <footer className={`border-t mt-8 ${darkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
      <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
        <p className={`text-xs text-center ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>{t('footer.tagline')}</p>
        <p className={`text-xs text-center ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>
          {t('footer.developedBy')} <a href="https://github.com/jpleite/porsche_ev_insights" target="_blank" rel="noopener noreferrer" className={`underline hover:${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>jpleite</a> @ <a href="https://magicbytestudios.com" target="_blank" rel="noopener noreferrer" className={`underline hover:${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>MagicByteStudios</a> • 2026 v{version}
        </p>
      </div>
    </footer>
  );
}
