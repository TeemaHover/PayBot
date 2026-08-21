/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Docker/Railway дээр жижиг image гаргахад ашиглана.
  output: 'standalone',
  images: { remotePatterns: [{ protocol: 'https', hostname: '**' }] },
};
export default nextConfig;
