import Blog from "@/components/home/blog/blog";
import Events from "@/components/home/events/events";
import Hero from "@/components/home/hero/hero";
import News from "@/components/home/news/news";
import Welcome from "@/components/home/welcome/welcome";
export default function Home() {
  return (
    <div className="">
      <main className="">
        <Hero/>
        <Welcome/>
        <Events/>
        <News/>
        <Blog/>
      </main>
    </div>
  );
}
