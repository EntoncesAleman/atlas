// Preserve labels and the complete subject in article images. Category photos
// keep their editorial crop; focal points can be adjusted without altering files.
const categoryPositions = {
  'asset-marco-legal-congreso': '50% 60%',
  'asset-fundamentos-vegetative': '50% 45%',
  'asset-suelo-agua-garden-sevela': '50% 55%',
  'asset-poda-topped': '50% 25%',
  'asset-germinacion-hanfsamen': '50% 60%',
  'asset-luz-clima-sunlight': '50% 40%',
  'asset-fertilizacion-nutrient-deficiency': '50% 45%',
};

export function visualPresentation(asset, { card = false } = {}) {
  const complete = asset?.type === 'diagram' || asset?.type === 'illustration' || asset?.file?.endsWith('.svg');
  return {
    objectFit: !card || complete ? 'contain' : 'cover',
    objectPosition: card ? categoryPositions[asset?.id] ?? '50% 50%' : '50% 50%',
  };
}

export function visualLicenseUrl(asset) {
  if (asset.licenseUrl) return asset.licenseUrl;
  const match = asset.license?.match(/CC (BY-SA|BY) (\d+\.\d+)/);
  if (match) return `https://creativecommons.org/licenses/${match[1].toLowerCase()}/${match[2]}/`;
  if (asset.license?.startsWith('CC0')) return 'https://creativecommons.org/publicdomain/zero/1.0/';
  if (asset.license === 'Dominio público') return 'https://creativecommons.org/publicdomain/mark/1.0/';
  return null;
}
