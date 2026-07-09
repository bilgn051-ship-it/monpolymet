export default function ProcurementPage({ lang, t }) {
  return (
    <div className="page animate-fade-in" style={{ padding: '120px 5%', minHeight: '60vh', textAlign: 'center' }}>
      <h1>{lang === 'mn' ? 'Худалдан авалт' : 'Procurement'}</h1>
      <p style={{ marginTop: '20px', color: 'var(--text-secondary)' }}>
        {lang === 'mn' ? 'Тун удахгүй...' : 'Coming soon...'}
      </p>
    </div>
  );
}
