/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
            },
        ],
    },
    async redirects() {
        return [
            {
                source: '/:path*',
                has: [
                    {
                        type: 'host',
                        value: 'atharva-naik-portfolio.vercel.app',
                    },
                ],
                destination: 'https://atharvanaik.me/:path*',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
