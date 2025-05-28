import React from 'react'
import Header from './Header';
import Footer from './Footer';


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