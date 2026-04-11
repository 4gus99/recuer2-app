import { messages } from '@/data/messages';
import { Container } from './Container';
import { Reveal } from './Reveal';
import { SectionTitle } from './SectionTitle';

export function MessagesSection() {
  return (
    <section className="section-shell section-spacing">
      <Container>
        <SectionTitle
          eyebrow="Mensajes"
          title="Pequeñas cosas que quería decirte"
          description="Frases breves, pero hechas con intención."
          centered
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {messages.map((message, index) => (
            <Reveal key={message.id} delay={index * 0.05}>
              <article className="glass-panel h-full px-6 py-6">
                <p className="text-base leading-8 text-cocoa/85">“{message.text}”</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
