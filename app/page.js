import Category from '@/components/Home/Category';
import Hero from '@/components/Home/Hero'
import PopularBundle from './bundle/page';
import Popular from './popularproduct/page';

export default function Home() {
  return (

    <>
          
      <Hero/>
      <Category/>
      <Popular/>
      <PopularBundle/>

    </>
  )
}
