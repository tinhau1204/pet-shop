/** @type import("next").NextConfig */
const config = {
    reactStrictMode: true,
    swcMinify: true,
    compiler: {
        reactRemoveProperties: true,
        removeConsole: true,
    },
};

export default config;
