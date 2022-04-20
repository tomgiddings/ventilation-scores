import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head />
      <body className='bg-blue-900'>
        <main className='container mx-auto bg-blue-50'>
            <Main />
        </main>
        <NextScript />
      </body>
    </Html>
  )
}
