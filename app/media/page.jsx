// Media — a storytelling gallery: every picture on this site, and the
// story behind it. Masonry columns of portraits with narrative captions.
// (Press features + video grid slot in above the gallery when they arrive.)

import Image from "next/image";
import PageHeader from "@/components/shared/PageHeader";

export const metadata = { title: "Media" };

// Every picture, its title, and its story.
const gallery = [
  {
    src: "/images/hero/hero-3.jpg",
    title: "What Lies Beneath",
    story:
      "The portrait that opens this site. A mining engineer learns early that the surface tells you little, the truth is in what lies beneath. Shot in profile, mid-thought, because that is where most of the work happens.",
    aspect: "aspect-3/4",
  },
  {
    src: "/images/ventures/leadership.jpg",
    title: "The Khaki Year",
    story:
      "National Youth Service Corps, completed with distinction. After years of leading students from a podium, a year of serving the country in uniform, a reminder that every mandate begins and ends with service.",
    aspect: "aspect-square",
  },
  {
    src: "/images/ventures/bitlayerx.jpg",
    title: "Founder's Blue",
    story:
      "Taken the season BitLayerX Technologies was founded. A company is a design engineer's largest product, this is what it looks like to carry that quietly.",
    aspect: "aspect-3/4",
  },
  {
    src: "/images/insights/editorial.jpg",
    title: "The Long Think",
    story:
      "Between decisions. Engineering rewards those who sit with a problem longer than is comfortable, in the field we call it site investigation; everywhere else it just looks like stillness.",
    aspect: "aspect-3/4",
  },
  {
    src: "/images/about/portrait.jpg",
    title: "Rose Linen",
    story:
      "Design is a promise kept in public. The suit is soft, the standard is not, human centred on the outside, engineered underneath.",
    aspect: "aspect-3/4",
  },
  {
    src: "/images/media/appearance.jpg",
    title: "On Set",
    story:
      "Media direction taught me that a brand is a voice held steady across borders. Some days you design the message; some days you are the message.",
    aspect: "aspect-3/4",
  },
  {
    src: "/images/media/lounge.jpg",
    title: "Terminal A",
    story:
      "Working globally means a lot of quiet lobbies. Coffee, a notebook, and the next brief, building across markets happens one departure lounge at a time.",
    aspect: "aspect-3/4",
  },
  {
    src: "/images/about/portrait-bio.jpg",
    title: "The Waistcoat",
    story:
      "Old discipline, new work. Tailoring and engineering agree on the essentials: measure twice, respect the material, and let the structure show.",
    aspect: "aspect-3/4",
  },
];

export default function MediaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Media"
        title="Every Picture, a Story"
        description="Press, appearances, and the moments in between, each frame with the story behind it."
      />

      <section className="bg-ink pb-32">
        <div className="mx-auto max-w-7xl columns-1 gap-6 space-y-6 px-6 sm:columns-2 lg:columns-3">
          {gallery.map((item) => (
            <figure
              key={item.src}
              className="group break-inside-avoid overflow-hidden border border-smoke bg-charcoal"
            >
              <div className={`relative w-full overflow-hidden ${item.aspect}`}>
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <figcaption className="p-6">
                <p className="text-xs uppercase tracking-[0.25em] text-gold">
                  {item.title}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-fog">
                  {item.story}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
