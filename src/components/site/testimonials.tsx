import { Quote } from "lucide-react";
import { Card } from "@/components/ui/card";
import { TESTIMONIALS } from "@/data/testimonials";
import { cn } from "@/lib/utils";

export function Testimonials() {
  return (
    <section
      aria-labelledby="testimonials-heading"
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
      <div className="mx-auto max-w-content px-4 py-20 sm:px-6 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-5 inline-flex items-center gap-3 text-burgundy">
            <span aria-hidden="true" className="h-px w-8 bg-gold" />
            From our table to yours
            <span aria-hidden="true" className="h-px w-8 bg-gold" />
          </p>
          <h2
            id="testimonials-heading"
            className="text-4xl leading-[1.08] font-semibold text-balance text-burgundy sm:text-5xl lg:text-6xl"
          >
            Loved by Our <em className="font-normal">Customers</em>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
            Good food, great experiences and happy customers. Here's what people
            have to say about OJ Kitchen.
          </p>
        </div>

        <ul className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-2 lg:mt-16 lg:gap-8">
          {TESTIMONIALS.map(({ name, quote }, index) => (
            <li key={name} className="min-w-0">
              <Card
                className={cn(
                  "relative h-full overflow-hidden rounded-[1.75rem] p-7 shadow-[0_12px_40px_-24px_var(--burgundy)] transition-transform duration-300 hover:-translate-y-1 motion-reduce:transform-none motion-reduce:transition-none sm:p-9 lg:p-10",
                  index === 0
                    ? "border-burgundy bg-burgundy text-white"
                    : "border-gold/25 bg-card text-card-foreground",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute -right-10 -top-10 size-40 rounded-full border-[24px]",
                    index === 0 ? "border-gold/10" : "border-gold/5",
                  )}
                />
                <figure className="relative flex h-full flex-col">
                  <Quote
                    aria-hidden="true"
                    className="mb-6 size-10 fill-gold/15 text-gold"
                    strokeWidth={1.4}
                  />
                  <blockquote className="flex-1 font-display text-xl leading-[1.65] sm:text-[1.4rem]">
                    <p>{quote}</p>
                  </blockquote>
                  <figcaption
                    className={cn(
                      "mt-8 flex items-center gap-3 border-t pt-6",
                      index === 0 ? "border-gold/25" : "border-border/70",
                    )}
                  >
                    <span aria-hidden="true" className="h-px w-8 bg-gold" />
                    <span
                      className={cn(
                        "text-sm font-semibold tracking-wide",
                        index === 0 ? "text-gold" : "text-burgundy",
                      )}
                    >
                      {name}
                    </span>
                  </figcaption>
                </figure>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
