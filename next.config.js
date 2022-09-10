/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'cdn.vox-cdn.com',
      'yt3.ggpht.com',
      'lh3.googleusercontent.com'
    ]
  },
  swcMinify: true,
  compiler: {
    // see https://styled-components.com/docs/tooling#babel-plugin for more info on the options.
    styledComponents: true
  },
}

module.exports = nextConfig
