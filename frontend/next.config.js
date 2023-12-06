/** @type {import('next').NextConfig} */
module.exports = {
    output: "standalone",
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "0.0.0.0",
                port: "8090",
                pathname: "/api/files/**",
            },
        ],
    },
};
