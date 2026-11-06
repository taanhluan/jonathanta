/** Assets downloaded from official brand sites; provenance in docs/TRAINING-LOGO-SOURCES.md. */
const brands = [
  { id: 'migros', name: 'Migros Bank', file: 'migros-bank.svg', href: 'https://www.migrosbank.ch/' },
  { id: 'bic', name: 'BIC Bank Cambodia', file: 'bic-bank.png', href: 'https://ibank.com.kh/' },
  { id: 'abbank', name: 'ABBank', file: 'abbank.png', href: 'https://abbank.vn/' },
  { id: 'jaccs', name: 'JACCS', file: 'jaccs.png', href: 'https://jaccs.com.vn/' },
  { id: 'home-credit', name: 'Home Credit', file: 'home-credit.webp', href: 'https://www.homecredit.vn/' },
  { id: 'cole', name: 'COLE', file: 'cole.png', href: 'https://cole.vn/' },
];

export default function TrainingBrands() {
  return <div className="training-context training-shell">
    <p>KINH NGHIỆM DỰ ÁN<br/><span>& giảng dạy domain</span></p>
    <ul className="training-brand-list" aria-label="Kinh nghiệm dự án và giảng dạy">
      {brands.map(brand => <li key={brand.id}>
        <a className={`training-company-logo company-${brand.id}`} href={brand.href} target="_blank" rel="noreferrer" title={brand.name}>
          <img src={`${import.meta.env.BASE_URL}logos/${brand.file}`} alt={brand.name} width={180} height={60} decoding="async" onError={event => { event.currentTarget.hidden = true; event.currentTarget.parentElement?.setAttribute('data-fallback', 'true'); }}/>
          <span className="training-logo-fallback">{brand.name}</span>
        </a>
      </li>)}
    </ul>
  </div>;
}
