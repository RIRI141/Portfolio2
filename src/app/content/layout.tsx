import React from 'react'
import Header from '../../components/Header';
import Footer from '../../components/Footer';


type Props = {
    children: React.ReactNode;
}

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