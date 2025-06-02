/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Раскомментируйте и укажите имя вашего репозитория, если сайт размещен не в корневом домене
  // basePath: '/имя-вашего-репозитория',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // GitHub Pages не поддерживает слеши в конце URL
  trailingSlash: false,
  // Добавляем опцию для правильной работы с GitHub Pages
  assetPrefix: process.env.NODE_ENV === 'production' ? '.' : '',
}

export default nextConfig
