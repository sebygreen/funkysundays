/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                port: "8090",
                pathname: "/api/files/**",
            },
            {
                protocol: "http",
                hostname: "backend",
                port: "8090",
                pathname: "/api/files/**",
            },
        ],
    },
};
module.exports = nextConfig;
