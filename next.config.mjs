/** @type import("next").NextConfig */
const config = {
    reactStrictMode: true,
    swcMinify: true,
    compiler: {
        reactRemoveProperties: true,
        removeConsole: false,
    },
    async headers() {
        return [
            {
                // matching all API routes
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
                    {
                        key: "Access-Control-Allow-Methods",
                        value: "GET,DELETE,PATCH,POST,PUT",
                    },
                    {
                        key: "Access-Control-Allow-Headers",
                        value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
                    },
                ],
            },
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                port: "3000",
                pathname: "/images/**",
            },
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ["@svgr/webpack"],
        });

        return config;
    },
    redirects: async () => {
        return [
            {
                source: "/products",
                destination: "/categories",
                permanent: true,
            },
            {
                source: "/products/accessory",
                destination: "/categories/accessories",
                permanent: true,
            },
            {
                source: "/products/pet",
                destination: "/categories/pets",
                permanent: true,
            },

        ];
    }
};

export default config;
