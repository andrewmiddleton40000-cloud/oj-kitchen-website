import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TESTIMONIALS } from "@/data/testimonials";

export function Testimonials() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  function goTo(index: number) {
    const track = trackRef.current;
    const slide = track?.children[index] as HTMLElement | undefined;
    if (!track || !slide) return;
    track.scrollTo({
      left: slide.offsetLeft - track.offsetLeft,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }

  return (
    <section
      aria-labelledby="testimonials-heading"
      aria-roledescription="carousel"
      className="relative isolate overflow-hidden bg-cream"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 top-32 -z-10 size-[34rem] rounded-full border border-gold/25"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-48 bottom-12 -z-10 size-96 rounded-full border-[40px] border-gold/5"
      />
      <div className="mx-auto max-w-content px-4 py-12 sm:px-6 lg:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-3 inline-flex items-center gap-3 text-burgundy">
            <span aria-hidden="true" className="h-px w-8 bg-gold" />
            Better food, happy belle
            <span aria-hidden="true" className="h-px w-8 bg-gold" />
          </p>
          <h2
            id="testimonials-heading"
            className="text-4xl leading-[1.08] font-semibold text-balance text-burgundy sm:text-5xl"
          >
            Loved by Our <em className="font-normal">Customers</em>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
            Good food wey go make you smile. From our home-style meals to fresh
            cuts, na care we put for every order. Hear wetin our customers have
            to say about OJ Kitchen.
          </p>
        </div>

        <ul
          id="testimonial-slides"
          ref={trackRef}
          aria-label="Customer testimonials"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
              event.preventDefault();
              goTo(
                Math.max(
                  0,
                  Math.min(
                    TESTIMONIALS.length - 1,
                    activeIndex + (event.key === "ArrowRight" ? 1 : -1),
                  ),
                ),
              );
            }
          }}
          onScroll={() => {
            const track = trackRef.current;
            if (!track) return;
            const slideWidth =
              track.firstElementChild?.getBoundingClientRect().width;
            if (slideWidth)
              setActiveIndex(Math.round(track.scrollLeft / slideWidth));
          }}
          className="relative mx-auto mt-7 flex max-w-3xl snap-x snap-mandatory overflow-x-auto rounded-[1.75rem] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-burgundy [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {TESTIMONIALS.map(({ name, quote }, index) => (
            <li
              key={name}
              aria-label={`${index + 1} of ${TESTIMONIALS.length}`}
              className="w-full min-w-0 shrink-0 snap-start snap-always"
            >
              <Card className="relative h-full overflow-hidden rounded-[1.75rem] border-burgundy bg-burgundy p-6 text-white sm:p-8">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full border-[24px] border-gold/10"
                />
                <figure className="relative flex h-full flex-col">
                  <Quote
                    aria-hidden="true"
                    className="mb-3 size-8 fill-gold/15 text-gold"
                    strokeWidth={1.4}
                  />
                  <blockquote className="flex-1 font-display text-lg leading-relaxed sm:text-xl">
                    <p>{quote}</p>
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-3 border-t border-gold/25 pt-4">
                    <span aria-hidden="true" className="h-px w-8 bg-gold" />
                    <span className="text-sm font-semibold tracking-wide text-gold">
                      {name}
                    </span>
                  </figcaption>
                </figure>
              </Card>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="icon-lg"
            className="rounded-full border-burgundy/20 text-burgundy motion-reduce:transition-none"
            aria-label="Previous testimonial"
            aria-controls="testimonial-slides"
            disabled={activeIndex === 0}
            onClick={() => goTo(activeIndex - 1)}
          >
            <ArrowLeft aria-hidden="true" />
          </Button>
          <div className="flex items-center" aria-label="Choose a testimonial">
            {TESTIMONIALS.map(({ name }, index) => (
              <button
                key={name}
                type="button"
                aria-label={`Show testimonial from ${name}`}
                aria-current={index === activeIndex ? "true" : undefined}
                aria-controls="testimonial-slides"
                onClick={() => goTo(index)}
                className="flex size-10 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-burgundy"
              >
                <span
                  aria-hidden="true"
                  className={`h-2 rounded-full transition-all motion-reduce:transition-none ${index === activeIndex ? "w-6 bg-burgundy" : "w-2 bg-burgundy/30"}`}
                />
              </button>
            ))}
          </div>
          <Button
            variant="outline"
            size="icon-lg"
            className="rounded-full border-burgundy/20 text-burgundy motion-reduce:transition-none"
            aria-label="Next testimonial"
            aria-controls="testimonial-slides"
            disabled={activeIndex === TESTIMONIALS.length - 1}
            onClick={() => goTo(activeIndex + 1)}
          >
            <ArrowRight aria-hidden="true" />
          </Button>
        </div>
        <p
          className="mt-2 text-center text-xs text-muted-foreground"
          aria-live="polite"
          aria-atomic="true"
        >
          {activeIndex + 1} / {TESTIMONIALS.length} · Swipe to read more
        </p>
      </div>
    </section>
  );
}
