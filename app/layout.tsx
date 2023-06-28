import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import SessionProvider from '@/components/SessionProvider';

const inter = Inter({ subsets: ['latin'] })

// Navbar contains (and will contain) basic menu items

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <Navbar/>{children}
        </SessionProvider>
      </body>
    </html>
  )
};
