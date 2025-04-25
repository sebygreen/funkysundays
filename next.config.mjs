/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "office.funkysundays.com",
                pathname: "/api/files/**",
            },
            {
                protocol: "http",
                hostname: "127.0.0.1",
                pathname: "/api/files/**",
                port: "8090",
            },
        ],
    },
};

export default nextConfig;
