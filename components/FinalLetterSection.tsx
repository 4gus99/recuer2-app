import { finalLetter } from '@/data/site-content';
import { Container } from './Container';
import { Reveal } from './Reveal';

export function FinalLetterSection() {
  return (
    <section id="carta" className="section-shell section-spacing">
      <Container className="max-w-4xl">
        <Reveal>
          <div className="glass-panel px-6 py-10 sm:px-10 sm:py-14 lg:px-14">
            <p className="text-xs uppercase tracking-[0.28em] text-wine/75">Cierre</p>
            <h2 className="mt-4 font-serif text-4xl text-cocoa sm:text-5xl">{finalLetter.title}</h2>

            <div className="mt-8 space-y-6 text-base leading-8 text-cocoa/85 sm:text-lg sm:leading-9">
              {finalLetter.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
