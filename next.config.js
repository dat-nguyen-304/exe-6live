/** @type {import('next').NextConfig} */
const sass = require('sass');
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
      "yt3.googleusercontent.com",
      "scontent.fsgn3-1.fna.fbcdn.net",
      "ysedu.yuanta.com.vn",
      "cdn-new.topcv.vn"
    ]
  },
  sassOptions: {
    implementation: sass,
  },
}

module.exports = nextConfig
