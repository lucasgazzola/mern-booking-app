import Footer from '../components/Footer'
import Header from '../components/Header'
import Hero from '../components/Hero'

type LayoutProps = {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <div className="container mx-auto py-10 flex-1">{children}</div>
      <Footer />
    </div>
  )
}
