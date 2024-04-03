/** @type {import('next').NextConfig} */
module.exports = {
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
