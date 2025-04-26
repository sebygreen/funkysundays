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
                hostname: "localhost",
                pathname: "/api/files/**",
                port: "8090",
            },
        ],
    },
};

export default nextConfig;
