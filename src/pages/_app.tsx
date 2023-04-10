import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { client } from '@/utils/trpc'
import Layout from '@/components/Layout'

function App({ Component, pageProps }: AppProps) {
  return <Layout>
      <Component {...pageProps} />
    </Layout>
}

export default client.withTRPC(App)
