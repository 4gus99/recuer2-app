import { footerPhrase } from '@/data/site-content';
import { Container } from './Container';

export function FooterSection() {
  return (
    <footer className="section-shell pb-10 pt-4 sm:pb-14">
      <Container>
        <div className="border-t border-wine/15 pt-6 text-center">
          <p className="font-serif text-2xl text-cocoa sm:text-3xl">{footerPhrase}</p>
        </div>
      </Container>
    </footer>
  );
}
