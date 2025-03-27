import Image from "next/image";
import Link from "next/link";

const galleryImages = [
  {
    src: "https://hmrvazaoddsexmrgydqx.supabase.co/storage/v1/object/sign/Engineering-India-Storage/Events-Images/DonationEvent.JPG?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJFbmdpbmVlcmluZy1JbmRpYS1TdG9yYWdlL0V2ZW50cy1JbWFnZXMvRG9uYXRpb25FdmVudC5KUEciLCJpYXQiOjE3NDMwOTU3MzAsImV4cCI6MjA1ODQ1NTczMH0.akR4Yj4m57u8zSqSmwSC9na0dW3k33_9YDc04sGF2tA",
    alt: "",
    title: "Donation Drive",
  },
  {
    src: "https://hmrvazaoddsexmrgydqx.supabase.co/storage/v1/object/sign/Engineering-India-Storage/Events-Images/ust-event2.JPG?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJFbmdpbmVlcmluZy1JbmRpYS1TdG9yYWdlL0V2ZW50cy1JbWFnZXMvdXN0LWV2ZW50Mi5KUEciLCJpYXQiOjE3NDMwOTU3NTMsImV4cCI6MjA1ODQ1NTc1M30.KIRG0liJ_2EVP9HiJ2XKLqzCPx7ALe11Mdxea4B8rGw",
    alt: "Coding Competition",
    title: "Ultimate Social Technocart",
  },
  {
    src: "https://hmrvazaoddsexmrgydqx.supabase.co/storage/v1/object/sign/Engineering-India-Storage/Events-Images/Rangataleem.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJFbmdpbmVlcmluZy1JbmRpYS1TdG9yYWdlL0V2ZW50cy1JbWFnZXMvUmFuZ2F0YWxlZW0uanBnIiwiaWF0IjoxNzQzMDk1Nzc1LCJleHAiOjIwNTg0NTU3NzV9.WIZg-JIh9acvYoKBYd3192H95xoSwE1d8ZW3hz0ASBs",
    alt: "Social Initiative",
    title: "Rangittalim",
  },
  {
    src: "https://hmrvazaoddsexmrgydqx.supabase.co/storage/v1/object/sign/Engineering-India-Storage/Events-Images/Chitrankan.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJFbmdpbmVlcmluZy1JbmRpYS1TdG9yYWdlL0V2ZW50cy1JbWFnZXMvQ2hpdHJhbmthbi5qcGciLCJpYXQiOjE3NDMwOTU3OTksImV4cCI6MjA1ODQ1NTc5OX0.NO4w2LnmTNAFdQQwC2w0Oq3-mzOG8AeQWxrECW03KoE",
    alt: "Social Initiative",
    title: "Chitrankan",
  },
  {
    src: "https://hmrvazaoddsexmrgydqx.supabase.co/storage/v1/object/sign/Engineering-India-Storage/Events-Images/Abhudaya.JPG?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJFbmdpbmVlcmluZy1JbmRpYS1TdG9yYWdlL0V2ZW50cy1JbWFnZXMvQWJodWRheWEuSlBHIiwiaWF0IjoxNzQzMDk1Njg4LCJleHAiOjIwNTg0NTU2ODh9.u9i0WElVv4V1np6uKhcDHhHt1PzgX6dk0IgBv_fkK9Y",
    alt: "Social Initiative",
    title: "Abhyudhaya 24.0",
  },
  {
    src: "/image/Shiv-2.JPG",
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
