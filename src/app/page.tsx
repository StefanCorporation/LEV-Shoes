import Hero from './components/hero/Hero'
import Collection from './components/collection/Collection'
import FeaturedCollection from './components/featuredCollection/FeaturedCollection'
import Preloader from './components/preloader/Preloader'
import BrandStory from './components/brand-story/BrandStory'
import BrandVision from './components/brand-vision/BrandVision'
import BrandCutting from './components/brand-cutting/BrandCutting'

export default function Home() {
  return (
    <main>
      <Preloader />
      <Hero />
      <Collection />
      <FeaturedCollection />
      <BrandStory />
      <BrandVision />
      <BrandCutting />
    </main>
  )
}
