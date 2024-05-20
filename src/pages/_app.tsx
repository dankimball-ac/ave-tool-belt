// import "@/styles/globals.css";
// import type { AppProps } from "next/app";

// export default function App({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />;
// }

import Layout from '@/components/layout'
import '@/styles/globals.css'
import { ColorModeContext, useMode } from '@/theme'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { useState } from 'react'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'

export default function App({ Component, pageProps }: AppProps) {
  const [theme, colorMode] = useMode()
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
              <Layout>
                <div>
                  <CssBaseline />
                  <Head>
                    <meta
                      name="viewport"
                      content="width=device-width, minimum-scale=1, maximum-scale=1"
                    />
                    {/* <link rel="icon" href="/favicon.ico" /> */}
                  </Head>
                  <Component {...pageProps} />
                </div>
              </Layout>
            </ThemeProvider>
          </ColorModeContext.Provider>
        </LocalizationProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}

