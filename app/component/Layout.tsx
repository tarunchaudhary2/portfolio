'use client'
import React, { ReactNode, useContext, useEffect, useState } from 'react'
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import Logo, { Logo1 } from './logo/logoImg';


type Props = {
    children: ReactNode
}

export default function Layout({ children }: Props) {

    const [loaderIsVisible, setLoaderIsVisible] = useState(true);
    const iswindow = typeof window !== 'undefined' ? true : false;

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setLoaderIsVisible(false);
        }
    }, [iswindow]);

    return (
        <>
            {!loaderIsVisible && (
                <>
                    {/* <Toaster
                        position='bottom-center'
                        richColors
                        closeButton
                        toastOptions={{
                            duration: 3000,
                            unstyled: false,
                        }}
                    /> */}
                  
                    <Navbar />
                    {children}
                    <Footer />
                </>
            )}
            {loaderIsVisible && (
                <div className='w-[100vw] h-[100vh] min-h-[100vh] grid place-items-center bg-white'>
                    <div className='w-44 h-40 border-white border text-black bg-white rounded-full flex items-center justify-center'>
                        {/* <Image src={images.logo} alt='logo' className='w-full h-full border-none object-contain' />   */}

                        {/* John */}
                        <Logo1/>
                    </div>
                </div>
            )}
        </>
    )
}