/** @type {import('next').NextConfig} */
const sass = require('sass');
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
      "yt3.googleusercontent.com",
      "scontent.fsgn3-1.fna.fbcdn.net",
      "ysedu.yuanta.com.vn",
      "cdn-new.topcv.vn",
      "icon-library.com"
    ]
  },
  sassOptions: {
    implementation: sass,
  },
  async headers () {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
        ],
      },
      // {
      //   source: '/api/:path*',
      //   headers: [
      //     { key: 'Access-Control-Allow-Origin', value: '*' },
      //     { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,PATCH,DELETE,OPTIONS' },
      //     { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
      //   ],
      // },
    ];
  },
  webpack (config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    )

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      },
    )

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i

    return config
  },
}

module.exports = nextConfig
