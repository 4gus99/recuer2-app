import { memories } from '@/data/memories';
import { Container } from './Container';
import { MemoryCard } from './MemoryCard';
import { SectionTitle } from './SectionTitle';

export function MemoriesSection() {
  return (
    <section className="section-shell section-spacing">
      <Container>
        <SectionTitle
          eyebrow="Recuerdos"
          title="Momentos que merecían quedarse para siempre"
          description="Una selección de escenas que, por un motivo u otro, se volvieron parte de nuestra historia."
        />

        <div className="mt-12 space-y-6 sm:space-y-8">
          {memories.map((item, index) => (
            <MemoryCard key={item.id} item={item} reverse={index % 2 !== 0} />
          ))}
        </div>
      </Container>
    </section>
  );
}
