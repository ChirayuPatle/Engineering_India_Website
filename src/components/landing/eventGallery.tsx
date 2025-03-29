import Image from "next/image";
import Link from "next/link";

const galleryImages = [
  {
    src: "https://hmrvazaoddsexmrgydqx.supabase.co/storage/v1/object/sign/Engineering-India-Storage/Events-Images/DonationEvent.JPG?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJFbmdpbmVlcmluZy1JbmRpYS1TdG9yYWdlL0V2ZW50cy1JbWFnZXMvRG9uYXRpb25FdmVudC5KUEciLCJpYXQiOjE3NDMwOTU3MzAsImV4cCI6MjA1ODQ1NTczMH0.akR4Yj4m57u8zSqSmwSC9na0dW3k33_9YDc04sGF2tA",
    alt: "",
    title: "Donation Drive",
  },
  {
    src: "https://res.cloudinary.com/dzryfm8cb/image/upload/v1743217526/UST-Home_page_rnhpsv.jpg",
    alt: "Coding Competition",
    title: "Ultimate Social Technocart",
  },
  {
    src: "https://hmrvazaoddsexmrgydqx.supabase.co/storage/v1/object/sign/Engineering-India-Storage/Events-Images/Rangataleem.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJFbmdpbmVlcmluZy1JbmRpYS1TdG9yYWdlL0V2ZW50cy1JbWFnZXMvUmFuZ2F0YWxlZW0uanBnIiwiaWF0IjoxNzQzMDk1Nzc1LCJleHAiOjIwNTg0NTU3NzV9.WIZg-JIh9acvYoKBYd3192H95xoSwE1d8ZW3hz0ASBs",
    alt: "Social Initiative",
    title: "Rangittalim",
  },
  {
    src: "/image/Speech Compitaion.jpg",
    alt: "Social Initiative",
    title: "Speech Competition",
  },
  {
    src: "https://res.cloudinary.com/dzryfm8cb/image/upload/v1743217795/abhudaya_tt2su2.jpg",
    alt: "Social Initiative",
    title: "Abhyudhaya 24.0",
  },
  {
    src: "https://res.cloudinary.com/dzryfm8cb/image/upload/v1743218190/Shivaji_Jayanti_rpkzzf.jpg",
    alt: "Social Initiative",
    title: "Shivaji Jayanti",
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
          <Link
            href="/events"
            className="font-medium text-primary hover:underline"
          >
            View All Events →
          </Link>
        </div>
      </div>
    </section>
  );
}
