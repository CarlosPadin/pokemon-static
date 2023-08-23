import { FC, ReactNode } from 'react';
import Head from 'next/head'
import Navbar from '../ui/Navbar'

interface Props {
  title: string;
  children: ReactNode;
}

const Layout: FC<Props>= ({ children, title }) => {
  return (
    <>
        <Head>
            <title>{title}</title>
            <meta name='author' content='Carlos Padin'/>
            <meta name="description" content="Informacion sobre XXXXX" />
            <meta name="keywords" content="XXXXX, pokemon, pokedex" />
        </Head>

        <Navbar />

        <main>
            {children}
        </main>
    </>
  )
}

export default Layout;
