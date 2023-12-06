/** @type {import('next').NextConfig} */
module.exports = {
    output: "standalone",
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "127.0.0.1",
                port: "8090",
                pathname: "/api/files/**",
            },
        ],
    },
};
