/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#98880E",
                secondary: "#7B6D50",
                black: "#181D16",
                "black-light": "#3D3E3B",
                white: "#F2F4F7",
            },
            spacing: {
                0: "0px",
                "2.5px": "2.5px",
                "5px": "5px",
                "10px": "10px",
                "15px": "15px",
                "30px": "30px",
                "60px": "60px",
                "90px": "90px",
                "120px": "120px",
                "150px": "150px",
            },
            fontFamily: {
                text: ["Montserrat"],
            },
            fontSize: {
                small: "12px",
                h4: "16px",
                h3: "24px",
                h2: "32px",
                h1: "48px",
            },
        },
    },
    plugins: [],
};
