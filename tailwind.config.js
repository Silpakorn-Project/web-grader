module.exports = {
    content: ["./src/**/*.tsx"],
    important: '#root',
    theme: {
        extend: {},
    },
    corePlugins: {
        // Remove the Tailwind CSS preflight styles so it can use Material UI's preflight instead (CssBaseline).
        preflight: false,
    },
    plugins: [],
};
