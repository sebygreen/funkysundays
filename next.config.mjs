/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "demo.office.fs.smkg.me",
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
