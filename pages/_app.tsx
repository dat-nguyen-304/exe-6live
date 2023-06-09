import '@/styles/globals.css';
import '@/styles/scss/app.scss';
import type { AppProps } from 'next/app';
import { Inter } from '@next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
})

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={ `${inter.variable} font-sans` }>
      <Component { ...pageProps } />
    </main>
  )
}
