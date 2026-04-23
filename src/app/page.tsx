import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Countdown from "@/components/Countdown";
import Story from "@/components/Story";
import Events from "@/components/Events";
import Gallery from "@/components/Gallery";
import Venue from "@/components/Venue";
import RSVP from "@/components/RSVP";
import Footer from "@/components/Footer";
import AudioPlayer from "@/components/AudioPlayer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between overflow-x-hidden">
      <Navbar />
      <div className="w-full">
        <Hero />
        <Countdown />
        <Story />
        <Events />
        <Gallery />
        <Venue />
        <RSVP />
        <Footer />
      </div>
      <AudioPlayer />
    </main>
  );
}
