import { useState } from 'react'
import { Hero } from '../sections/Hero'
import { Navbar } from '../sections/Navbar/Navbar'
import { Categories } from '../sections/Categories'
import { FreshArrivals } from '../sections/FreshArrivals'
import { Footer } from '../sections/Footer'

const FRESH_PRODUCTS = [
  {
    id: 'p1',
    name: 'Awesome Sponge Armchair',
    price: 12.76,
    image: 'https://www.figma.com/api/mcp/asset/518213bc-bfad-4005-b5aa-a426ad60bd6e',
    slug: 'awesome-sponge-armchair',
  },
  {
    id: 'p2',
    name: 'Black Night Lamp',
    price: 12.76,
    image: 'https://www.figma.com/api/mcp/asset/538aa324-38d7-48f0-9869-bc5cddeb0b81',
    slug: 'black-night-lamp',
  },
  {
    id: 'p3',
    name: 'Wooden Box with Stand',
    price: 12.76,
    image: 'https://www.figma.com/api/mcp/asset/46de3a43-1c41-48c3-89d6-fce94e5d250b',
    slug: 'wooden-box-with-stand',
  },
  {
    id: 'p4',
    name: 'Blue Wooden Armchair',
    price: 12.76,
    image: 'https://www.figma.com/api/mcp/asset/c00f7b9a-cb3c-4566-a9a3-661d2e01b759',
    slug: 'blue-wooden-armchair',
  },
]

const CATEGORIES = [
  { id: '1', label: 'All', slug: 'all' },
  { id: '2', label: 'Living Room', slug: 'living-room' },
  { id: '3', label: 'Bedroom', slug: 'bedroom' },
  { id: '4', label: 'Dining Room', slug: 'dining-room' },
  { id: '5', label: 'Home Office', slug: 'home-office' },
  { id: '6', label: 'Outdoor', slug: 'outdoor' },
  { id: '7', label: 'Kids Room', slug: 'kids-room' },
  { id: '8', label: 'Hallway', slug: 'hallway' },
  { id: '9', label: 'Bathroom', slug: 'bathroom' },
  { id: '10', label: 'Storage', slug: 'storage' },
]

export function HomePage() {
  const [activeCategory, setActiveCategory] = useState('all')

  return (
    <>
      <Navbar cartItemCount={2} currentLanguage="Eng" activeLink="Home" />
      <Hero
        headline="Masterpieces crafted from solid wood"
        subheading="Our company is happy to take up production of custom-made wooden furniture according to individual sizes."
        ctaText="Explore"
        ctaHref="#products"
        cartItemCount={2}
      />
      <Categories
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <FreshArrivals
        products={FRESH_PRODUCTS}
        onViewAll={() => console.log('View all clicked')}
      />
      <Footer
        paymentCards={[
          { src: 'https://www.figma.com/api/mcp/asset/1f495be7-e3aa-4aaa-afda-4037ff3beba1', alt: 'Visa' },
          { src: 'https://www.figma.com/api/mcp/asset/d61d1afe-2e70-4d86-9b71-d0e892294f63', alt: 'Mastercard' },
          { src: 'https://www.figma.com/api/mcp/asset/91c69ea8-c944-4fff-9c72-ae212ed05678', alt: 'Amex' },
          { src: 'https://www.figma.com/api/mcp/asset/012ea064-0c84-4330-9c27-aa4e3bbf5400', alt: 'PayPal' },
          { src: 'https://www.figma.com/api/mcp/asset/08c23bbb-30d3-4969-80aa-0b708d59990b', alt: 'Apple Pay' },
        ]}
      />
    </>
  )
}
