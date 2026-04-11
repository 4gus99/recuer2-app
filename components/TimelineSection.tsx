import { timelineItems } from '@/data/timeline';
import { Container } from './Container';
import { Reveal } from './Reveal';
import { SectionTitle } from './SectionTitle';

export function TimelineSection() {
  return (
    <section className="section-shell section-spacing">
      <Container>
        <SectionTitle
          eyebrow="Timeline"
          title="Una historia hecha de momentos que fueron creciendo"
          description="Una línea de tiempo simple, clara y fácil de personalizar con hitos reales de la relación."
        />

        <div className="relative mt-14 space-y-8 before:absolute before:left-4 before:top-0 before:h-full before:w-px before:bg-wine/20 sm:before:left-1/2 sm:before:-translate-x-1/2">
          {timelineItems.map((item, index) => (
            <Reveal key={item.id}>
              <div
                className={`relative grid gap-4 sm:grid-cols-2 ${
                  index % 2 === 0 ? '' : 'sm:[&>*:first-child]:order-2'
                }`}
              >
                <div className="hidden sm:block" />
                <article className="glass-panel relative ml-10 px-6 py-6 sm:ml-0">
                  <span className="absolute -left-[2.65rem] top-8 h-3.5 w-3.5 rounded-full border-4 border-cream bg-wine sm:left-auto sm:right-[calc(100%+1.65rem)] sm:top-1/2 sm:-translate-y-1/2 sm:translate-x-1/2" />
                  <p className="text-xs uppercase tracking-[0.28em] text-wine/75">{item.period}</p>
                  <h3 className="mt-3 font-serif text-2xl text-cocoa">{item.title}</h3>
                  <p className="mt-3 text-base leading-8 text-cocoa/80">{item.description}</p>
                </article>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
