import { FC, ReactNode } from 'react';
import Head from 'next/head'
import Navbar from '../ui/Navbar'

interface Props {
  title: string;
  children: ReactNode;
}

const origin = (typeof window === 'undefined') ? '' : window.origin;

const Layout: FC<Props>= ({ children, title }) => {
  return (
    <>
        <Head>
            <title>{title}</title>
            <meta name='author' content='Carlos Padin'/>
            <meta name="description" content={`Informacion sobre ${title} `} />
            <meta name="keywords" content={`${title}, pokemon, pokedex`} />

            <meta property="og:title" content={`${title}`} />
            <meta property="og:description" content={`Informacion sobre ${title}`} />
            <meta property="og:image" content={`${origin}/img/banner.png`} />
        </Head>

        <Navbar />

        <main>
            {children}
        </main>
    </>
  )
}

export default Layout;
