import './globals.css'
import ThemeRegistry from '@/theme/ThemeRegistry'
import ReduxProvider from '@/store/ReduxProvider'

export const metadata = {
  title: 'E-Shopping Web Application',
  description: 'A versatile platform built on Next.js and Material UI for online shopping, catering to both buyers and shopkeepers.',
  keywords: ['e-shopping', 'Next.js', 'Material UI', 'online shopping', 'buyers', 'shopkeepers'],
  author: 'Your Name or Company Name',
  url: 'https://eshop-webapp.netlify.app', // Replace with your website URL
  image: 'https://eshop-webapp.netlify.app/site-logo.png', // Replace with an image URL for your app
  social: {
    instagram: 'https://www.instagram.com/g0a0z/', // Your Instagram handle
    linkedin: 'yourlinkedihttps://www.linkedin.com/in/avinash-jha-201459257/npage', // Your LinkedIn page
    github: 'https://github.com/Avinash-sord12k/eshop', // Your GitHub username
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
        <ReduxProvider>
          <ThemeRegistry>
            {children}
          </ThemeRegistry>
        </ReduxProvider>
      </body>
    </html>
  )
}
