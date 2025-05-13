import Category from '@/components/Home/Category';
import Hero from '@/components/Home/Hero'
import PopularBundle from './bundle/page';
import Popular from '@/components/Home/PopularProduct';

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
