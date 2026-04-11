import { introContent } from '@/data/site-content';
import { Container } from './Container';
import { Reveal } from './Reveal';
import { SectionTitle } from './SectionTitle';

export function IntroSection() {
  return (
    <section id="intro" className="section-shell section-spacing">
      <Container>
        <Reveal>
          <div className="glass-panel px-6 py-10 sm:px-10 sm:py-14">
            <SectionTitle
              eyebrow={introContent.eyebrow}
              title={introContent.title}
              description={introContent.description}
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
