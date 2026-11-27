// Media. A storytelling gallery: every picture on this site and the story
// behind it, in an even grid of rounded frames, numbered left to right.
// (Press features + video grid slot in above the gallery when they arrive.)

import Image from "next/image";
import PageHeader from "@/components/shared/PageHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CTA from "@/components/home/CTA";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Media",
  description:
    "Photography, appearances and the stories behind them. Press-ready images of Opeyemi T. Ojurongbe, Founder and CEO of BitLayerX Technologies.",
  path: "/media",
});

// Every picture, its title, and its story.
const gallery = [
  {
    src: "/images/hero/hero-3.jpg",
    title: "What Lies Beneath",
    story:
      "The portrait that opens this site. A mining engineer learns early that the surface tells you little, the truth is in what lies beneath. Shot in profile, mid-thought, because that is where most of the work happens.",
  },
  {
    src: "/images/ventures/leadership.jpg",
    title: "The Khaki Year",
    story:
      "National Youth Service Corps, completed with distinction. After years of leading students from a podium, a year of serving the country in uniform, a reminder that every mandate begins and ends with service.",
  },
  {
    src: "/images/ventures/bitlayerx.jpg",
    title: "Founder's Blue",
    story:
      "Taken the season BitLayerX Technologies was founded. A company is a design engineer's largest product, this is what it looks like to carry that quietly.",
  },
  {
    src: "/images/insights/editorial.jpg",
    title: "The Long Think",
    story:
      "Between decisions. Engineering rewards those who sit with a problem longer than is comfortable, in the field we call it site investigation; everywhere else it just looks like stillness.",
  },
  {
    src: "/images/about/portrait.jpg",
    title: "Rose Linen",
    story:
      "Design is a promise kept in public. The suit is soft, the standard is not, human centred on the outside, engineered underneath.",
  },
  {
    src: "/images/media/appearance.jpg",
    title: "On Set",
    story:
      "Media direction taught me that a brand is a voice held steady across borders. Some days you design the message; some days you are the message.",
  },
  {
    src: "/images/media/lounge.jpg",
    title: "Terminal A",
    story:
      "Working globally means a lot of quiet lobbies. Coffee, a notebook, and the next brief, building across markets happens one departure lounge at a time.",
  },
  {
    src: "/images/about/portrait-bio.jpg",
    title: "The Waistcoat",
    story:
      "Old discipline, new work. Tailoring and engineering agree on the essentials: measure twice, respect the material, and let the structure show.",
  },
];

export default function MediaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Media"
        title="Every Picture, a Story"
        description="Press, appearances, and the moments in between, each frame with the story behind it."
        facts={[
          { label: "Frames", value: String(gallery.length) },
          { label: "Usage", value: "Press and event use" },
          { label: "High resolution", value: "Speaker kit" },
          { label: "Press enquiries", value: "Via contact" },
        ]}
      />

      <section className="bg-paper pb-12">
        <div className="mx-auto grid max-w-7xl gap-x-5 gap-y-10 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
          {gallery.map((item, i) => (
            <ScrollReveal key={item.src} delay={(i % 3) * 0.08}>
              <figure className="group">
                <div className="relative aspect-3/4 w-full overflow-hidden rounded-3xl bg-mist">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover object-[50%_20%] transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <span className="numeric absolute top-4 left-4 grid size-10 place-items-center rounded-full bg-paper text-[11px] font-bold text-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <figcaption className="px-1 pt-5 pb-4">
                  <p className="font-display text-xl font-bold tracking-[-0.02em] text-ink">{item.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate">{item.story}</p>
                </figcaption>
              </figure>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <CTA
        title="Press, features"
        accent="and appearances."
        body="Bios at three lengths, downloadable photography and speaking topics are ready on the speaker kit. For interviews and features, write directly."
        primary={{ label: "Open the speaker kit", href: "/speaking" }}
        secondary={{ label: "Press enquiry", href: "/contact" }}
      />
    </>
  );
}
