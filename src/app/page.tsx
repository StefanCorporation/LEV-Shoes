import Hero from './components/hero/Hero'
import Collection from './components/collection/Collection'
import FeaturedCollection from './components/featuredCollection/FeaturedCollection'
import Preloader from './components/preloader/Preloader'
import BrandStory from './components/brand-story/BrandStory'
import BrandVision from './components/brand-vision/BrandVision'

export default function Home() {
  return (
    <main>
      <Preloader />
      <Hero />
      <Collection />
      <FeaturedCollection />
      <BrandStory />
      <BrandVision />
    </main>
  )
}
