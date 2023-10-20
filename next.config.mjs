/** @type import("next").NextConfig */
const config = {
    reactStrictMode: true,
    swcMinify: true,
    compiler: {
        reactRemoveProperties: true,
        removeConsole: false,
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
};

export default config;
