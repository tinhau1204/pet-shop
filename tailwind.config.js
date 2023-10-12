/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        colors: {
            ["primary"]: "#FDFDFD",
            ["secondary"]: "#EBEEEF",
            ["blue"]: {
                ["light"]: "#0078CD",
                ["normal"]: "#00528C",
                ["medium"]: "#003459",
                ["bold"]: "#002A48",
            },

            ["yellow"]: {
                ["light"]: "#FCEED5",
                ["normal"]: "#F7DBA7",
                ["medium"]: "#F1D092",
                ["bold"]: "#EEC77E",
            },
            ["black"]: {
                ["light"]: "#99A2A5",
                ["normal"]: "#667479",
                ["medium"]: "#242B33",
                ["bold"]: "#00171F",
            },
            ["red"]: {
                ["normal"]: "#FF564F",
            },
            ["green"]: {
                ["normal"]: "#34C759",
            },
            ["orange"]: {
                ["normal"]: "#FF912C",
            },
        },

        screens: {
            xs: "550px",
            sm: "768px",
            md: "1024px",
            lg: "1280px",
            xl: "1440px",
        },

        extend: {},
    },
    plugins: [],
};
