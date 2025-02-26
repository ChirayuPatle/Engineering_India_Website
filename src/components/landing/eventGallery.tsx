import Image from "next/image";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1713687552559-5a6ec044027f?w=600&auto=format&fit=crop&q=60",
    alt: "Technical Workshop",
    title: "Technical Workshop 2023",
  },
  {
    src: "https://images.unsplash.com/photo-1713687552559-5a6ec044027f?w=600&auto=format&fit=crop&q=60",
    alt: "Coding Competition",
    title: "Annual Hackathon",
  },
  {
    src: "https://images.unsplash.com/photo-1713687552559-5a6ec044027f?w=600&auto=format&fit=crop&q=60",
    alt: "Social Initiative",
    title: "Tree Plantation Drive",
  },
];

export default function EventsGallery() {
  return (
    <section className="py-16 text-zinc-700 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Our Events &amp; Activities
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            A glimpse of the various events, workshops, and social initiatives
            organized by Engineering India.
          </p>
        </div>

        {/* 
          1) "grid-cols-2 md:grid-cols-3" -> 2 columns on smaller screens, 3 on medium+ 
          2) "gap-4" -> space between images
        */}
        <div className="bento-grid grid grid-cols-2 gap-4 md:grid-cols-3">
          {galleryImages.map((data, index) => (
            <div
              key={index}
              className="group relative aspect-square overflow-hidden rounded-lg"
            >
              {/* Next.js <Image> in "fill" mode */}
              <Image
                src={data.src}
                alt={data.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <h3 className="font-medium text-white">{data.title}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="/events"
            className="font-medium text-primary hover:underline"
          >
            View All Events →
          </a>
        </div>
      </div>
    </section>
  );
}
