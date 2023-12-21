/** @type {import('next').NextConfig} */
module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "funkysundays.com",
                pathname: "/api/files/**",
            },
        ],
    },
};
