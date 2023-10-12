/** @type import("next").NextConfig */
const config = {
    reactStrictMode: true,
    swcMinify: true,
    compiler: {
        reactRemoveProperties: true,
        removeConsole: false,
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
