import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Featured Section */}
      <section className="max-w-7xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-8">Featured Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* We'll populate this with trending articles */}
        </div>
      </section>

      {/* Topics/Tags Section */}
      <section className="max-w-7xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-8">Explore Topics</h2>
        <div className="flex flex-wrap gap-2">
          {/* Dynamic tags will go here */}
        </div>
      </section>

      {/* Personalized Feed */}
      <section className="max-w-7xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-8">For You</h2>
        <div className="space-y-8">
          {/* AI-recommended content will go here */}
        </div>
      </section>
    </main>
  );
}
