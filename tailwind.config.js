// module.exports = {
//     content: [
//       "./index.html",
//       "./src/**/*.{js,ts,jsx,tsx}",
//     ],
//     theme: {
//       extend: {
//         colors: {
//           primary: '#2563eb',
//           secondary: '#1d4ed8',
//         },
//       },
//     },
//     plugins: [],
//   }

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Include all TSX files
    theme: {
      extend: {},
    },
    plugins: [],
  };
  