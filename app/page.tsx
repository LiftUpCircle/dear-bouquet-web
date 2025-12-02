import Image from "next/image";
import FallingPetals from "./components/FallingPetals";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FDF6F0] relative">
      {/* Falling Petals */}
      <FallingPetals />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#FDF6F0]/90 backdrop-blur-sm border-b border-[#E8C4B8]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-semibold text-[#4A3728]">
              Dear Bouquet
            </span>
          </div>
          <nav className="hidden md:flex gap-8">
            <a
              href="#features"
              className="text-lg text-[#8B6F5C] hover:text-[#4A3728] transition-colors"
            >
              Features
            </a>
            <a
              href="#gameplay"
              className="text-lg text-[#8B6F5C] hover:text-[#4A3728] transition-colors"
            >
              Gameplay
            </a>
            <a
              href="#about"
              className="text-lg text-[#8B6F5C] hover:text-[#4A3728] transition-colors"
            >
              About
            </a>
          </nav>
          <a
            href="#download"
            className="bg-[#8B3A3A] text-white px-5 py-2 rounded-full text-base font-medium hover:bg-[#7A3333] transition-colors"
          >
            Download
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Flower Decorations - Left */}
        <div className="hidden lg:block absolute left-8 top-1/2 -translate-y-1/2 opacity-60">
          <div className="flex flex-col gap-6 flower-decoration">
            <Image
              src="/assets/Flowers/RoseLeft.png"
              alt=""
              width={70}
              height={100}
            />
            <Image
              src="/assets/Flowers/JasmineLeft.png"
              alt=""
              width={60}
              height={90}
            />
            <Image
              src="/assets/Flowers/LilyLeft.png"
              alt=""
              width={70}
              height={100}
            />
          </div>
        </div>

        {/* Flower Decorations - Right */}
        <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 opacity-60">
          <div
            className="flex flex-col gap-6 flower-decoration"
            style={{ animationDelay: "2s" }}
          >
            <Image
              src="/assets/Flowers/Carnations.png"
              alt=""
              width={70}
              height={100}
            />
            <Image
              src="/assets/Flowers/Tulip.png"
              alt=""
              width={60}
              height={90}
            />
            <Image
              src="/assets/Flowers/Lavender.png"
              alt=""
              width={70}
              height={100}
            />
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#4A3728] mb-6 leading-tight">
            Dear Bouquet
          </h1>
          <p className="text-xl sm:text-2xl text-[#8B6F5C] mb-4 max-w-2xl mx-auto leading-relaxed">
            A cozy storytelling games to help players unwind, decompress, and
            enjoy a moment of ease.
          </p>
          <p className="text-lg text-[#8B6F5C]/80 mb-10 max-w-xl mx-auto">
            Step into a cozy flower shop on its final days. Listen to
            customers&apos; stories, craft meaningful bouquets, and discover the
            language of flowers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <a
              href="#download"
              className="cta-button bg-[#8B3A3A] text-white px-8 py-4 rounded-full text-lg font-medium inline-flex items-center gap-2"
            >
              <span></span> Download on App Store
            </a>
          </div>

          {/* Hero Video Demo */}
          <div className="relative max-w-3xl mx-auto">
            <div className="screenshot-card rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <video
                src="/assets/Demo/GameplayDemo.mov"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-[#F5E1DA] rounded-full opacity-50 blur-xl" />
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#E8C4B8] rounded-full opacity-50 blur-xl" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 lg:py-32 bg-gradient-to-b from-[#FDF6F0] to-[#F5E1DA]/30"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#4A3728] mb-4">
              Craft Stories with Flowers
            </h2>
            <p className="text-lg text-[#8B6F5C] max-w-2xl mx-auto">
              Every bloom carries meaning. Every bouquet tells a tale.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="feature-card bg-white/60 backdrop-blur-sm p-8 rounded-2xl border border-[#E8C4B8]/50">
              <h3 className="text-2xl font-semibold text-[#4A3728] mb-3">
                Heartfelt Stories
              </h3>
              <p className="text-lg text-[#8B6F5C]">
                Listen to touching stories from customers visiting the shop.
                Each character brings their own journey, hopes, and memories.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="feature-card bg-white/60 backdrop-blur-sm p-8 rounded-2xl border border-[#E8C4B8]/50">
              <h3 className="text-2xl font-semibold text-[#4A3728] mb-3">
                Flower Arranging
              </h3>
              <p className="text-lg text-[#8B6F5C]">
                Drag and drop beautiful flowers to create meaningful bouquets.
                Learn the language of flowers and match emotions to blooms.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="feature-card bg-white/60 backdrop-blur-sm p-8 rounded-2xl border border-[#E8C4B8]/50">
              <h3 className="text-2xl font-semibold text-[#4A3728] mb-3">
                Memories Collection
              </h3>
              <p className="text-lg text-[#8B6F5C]">
                Save every bouquet you create in your memories book. Revisit the
                stories and the flowers that touched hearts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gameplay Section */}
      <section id="gameplay" className="py-20 lg:py-32 relative">
        {/* Background flower decorations */}
        <div className="absolute left-4 top-20 opacity-30 hidden lg:block">
          <Image
            src="/assets/Flowers/CarnationsLeft.png"
            alt=""
            width={60}
            height={90}
          />
        </div>
        <div className="absolute right-4 bottom-20 opacity-30 hidden lg:block">
          <Image
            src="/assets/Flowers/Carnations.png"
            alt=""
            width={60}
            height={90}
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#4A3728] mb-4">
              A Peek Inside the Shop
            </h2>
            <p className="text-lg text-[#8B6F5C] max-w-2xl mx-auto">
              Experience the warmth of Dear Bouquet through these glimpses
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Screenshot 1 - Conversation */}
            <div className="screenshot-card rounded-2xl overflow-hidden shadow-lg border-2 border-white">
              <Image
                src="/assets/Demo/Conversation.png"
                alt="Story Conversation"
                width={800}
                height={450}
                className="w-full h-auto"
              />
              <div className="bg-white/80 backdrop-blur-sm p-4">
                <h3 className="text-lg font-semibold text-[#4A3728]">
                  Listen to Stories
                </h3>
                <p className="text-base text-[#8B6F5C]">
                  Engage with heartfelt dialogues from visitors
                </p>
              </div>
            </div>

            {/* Screenshot 2 - Flower Arranging */}
            <div className="screenshot-card rounded-2xl overflow-hidden shadow-lg border-2 border-white">
              <Image
                src="/assets/Demo/FlowerArranging.png"
                alt="Flower Arranging"
                width={800}
                height={450}
                className="w-full h-auto"
              />
              <div className="bg-white/80 backdrop-blur-sm p-4">
                <h3 className="text-lg font-semibold text-[#4A3728]">
                  Arrange Bouquets
                </h3>
                <p className="text-base text-[#8B6F5C]">
                  Craft beautiful arrangements with meaning
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-20 lg:py-32 bg-gradient-to-b from-[#F5E1DA]/30 to-[#FDF6F0]"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <span className="text-6xl">🌷</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#4A3728] mb-6">
            About Dear Bouquet
          </h2>
          <p className="text-lg text-[#8B6F5C] mb-6 leading-relaxed">
            Dear Bouquet is a narrative experience that celebrates the art of
            floristry and the power of meaningful gifts. Set in a charming
            flower shop on its final days of operation, you&apos;ll help
            customers express their deepest emotions through carefully crafted
            bouquets.
          </p>
          <p className="text-lg text-[#8B6F5C] mb-10">
            Every flower has a meaning. Every arrangement tells a story. Every
            customer leaves with a piece of their heart wrapped in petals.
          </p>

          <div className="flex flex-wrap justify-center gap-12 text-base text-[#8B6F5C]">
            <div className="flex flex-col items-center gap-2">
              <div className="h-24 flex items-end justify-center">
                <Image
                  src="/assets/Flowers/Rose.png"
                  alt="Rose"
                  width={50}
                  height={75}
                />
              </div>
              <span>Rose - Love</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="h-24 flex items-end justify-center">
                <Image
                  src="/assets/Flowers/Lavender.png"
                  alt="Lavender"
                  width={50}
                  height={75}
                />
              </div>
              <span>Lavender - Serenity</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="h-24 flex items-end justify-center">
                <Image
                  src="/assets/Flowers/Jasmine.png"
                  alt="Jasmine"
                  width={50}
                  height={75}
                />
              </div>
              <span>Jasmine - Purity</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="h-24 flex items-end justify-center">
                <Image
                  src="/assets/Flowers/Carnations.png"
                  alt="Carnation"
                  width={50}
                  height={75}
                />
              </div>
              <span>Carnation - Joy</span>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section
        id="download"
        className="py-20 lg:py-32 relative overflow-hidden"
      >
        {/* Background decorations */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F5E1DA]/50 via-[#FDF6F0] to-[#F5E1DA]/50" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#4A3728] mb-6">
            Start Your Journey
          </h2>
          <p className="text-lg text-[#8B6F5C] mb-10 max-w-xl mx-auto">
            Download Dear Bouquet and discover the language of flowers.
            Available now on iOS devices.
          </p>

          <a
            href="https://testflight.apple.com/join/A4yrZ6vw"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button inline-block bg-[#4A3728] text-white px-10 py-5 rounded-2xl text-lg font-medium"
          >
            <div className="flex items-center gap-3">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div className="text-left">
                <div className="text-xs opacity-80">Download on the</div>
                <div className="text-xl font-semibold">App Store</div>
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#4A3728] text-white/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <span className="text-xl font-medium text-white">
                Dear Bouquet
              </span>
            </div>

            <div className="flex gap-6 text-base">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Contact
              </a>
            </div>

            <p className="text-base">
              © 2025 Dear Bouquet. Made with ❤️ by LiftUp Circle
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
