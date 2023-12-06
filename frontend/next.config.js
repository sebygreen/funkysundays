/** @type {import('next').NextConfig} */
module.exports = {
    output: "standalone",
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "backend",
                port: "8090",
                pathname: "/api/files/**",
            },
        ],
    },
};
