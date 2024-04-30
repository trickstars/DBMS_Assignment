/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', "./node_modules/flowbite/**/*.js"],
  theme: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },


    extend: {
      gridTemplateColumns: {
        '16': 'repeat(16, minmax(0, 1fr))',
        'footer': '200px minmax(900px, 1fr) 100px',
      },
      backgroundImage: {
        'home': "url('https://images.unsplash.com/photo-1501183638710-841dd1904471?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9tZXxlbnwwfHwwfHx8MA%3D%3D')",
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
};
