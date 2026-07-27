import Blog from '@/components/home/blog';
import Events from '@/components/home/events';
import Hero from '@/components/home/hero';
import News from '@/components/home/news';
import Welcome from '@/components/home/welcome';

export default function Home() {
  return (
    <>
      <Hero />
      <Welcome />
      <Events />
      <News />
      <Blog />
    </>
  );
}
