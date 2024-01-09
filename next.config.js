/** @type {import('next').NextConfig} */
module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "pocketbase.funkysundays.com",
                pathname: "/api/files/**",
            },
        ],
    },
};
