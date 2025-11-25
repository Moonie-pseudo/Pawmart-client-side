import React from 'react';
import Banner from '../../components/Banner';
import CategorySection from '../../components/CategorySection';
import RecentListings from '../../components/RecentListings';
import WhyAdopt from '../../components/WhyAdopt';
import PetHeroes from '../../components/PetHeroes';

const Home = () => {
    return (
        <div className="pt-16"> 
      <Banner />
      <CategorySection/>
      <RecentListings/>
      <WhyAdopt/>
      <PetHeroes/>
      
    </div>
    );
};

export default Home;