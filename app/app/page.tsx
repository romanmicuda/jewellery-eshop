import { Banner } from "@/components/Banner";
import { Category } from "@/components/Category";
import Header from "@/components/Header";
import { Hero } from "@/components/Hero";
import { NewArrivals } from "@/components/NewArrivals";
import { SocialMedia } from "@/components/SocialMedia";
import { Trending } from "@/components/Trending";

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      <Header />
      <Hero />
      <Category />
      <Trending />
      <Banner />
      <NewArrivals />
      <SocialMedia />
      {/*<Footer /> */}
    </div>
  );
}