import { Category } from "@/components/Category";
import Header from "@/components/Header";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      <Header />
      <Hero />
      <Category />
      {/*<Treding />
      <Banner />
      <NewArrivals />
      <SocialMedia />
      <Footer /> */}
    </div>
  );
}