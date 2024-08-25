/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "office.funkysundays.com",
                pathname: "/api/files/**",
            },
        ],
    },
};

export default nextConfig;
