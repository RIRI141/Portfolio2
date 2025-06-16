import React from 'react'
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Metadata } from 'next';


type Props = {
    children: React.ReactNode;
}
export const metadata: Metadata = {
  title: "Ryoga Ishii",
  description: "Portfolio of Ryoga Ishii",
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div>
        <Header />
        <main>
            { children }
        </main>
        <Footer />
    </div>
  )
}

export default Layout