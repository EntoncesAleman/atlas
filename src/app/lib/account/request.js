// Next can normalize request.url to localhost behind its dev server or a reverse proxy.
// Match the browser Origin against the actual request Host, including its port.
export function isSameOrigin(request) {
  try {
    const origin = new URL(request.headers.get('origin'));
    const expectedHost = request.headers.get('host') || new URL(request.url).host;
    return ['http:', 'https:'].includes(origin.protocol) && origin.host === expectedHost && !origin.username && !origin.password;
  } catch { return false; }
}
