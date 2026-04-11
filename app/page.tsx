import { FinalLetterSection } from '@/components/FinalLetterSection';
import { FooterSection } from '@/components/FooterSection';
import { GallerySection } from '@/components/GallerySection';
import { HeroSection } from '@/components/HeroSection';
import { IntroSection } from '@/components/IntroSection';
import { MemoriesSection } from '@/components/MemoriesSection';
import { MessagesSection } from '@/components/MessagesSection';
import { TimelineSection } from '@/components/TimelineSection';
import { PhotoUploadSection } from '@/components/PhotoUploadSection';
import { PostsSection } from '@/components/PostsSection';

export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      <HeroSection />
      <IntroSection />
      <MemoriesSection />
      <GallerySection />
      <MessagesSection />
      <TimelineSection />
      {/*
        New interactive sections allow users to contribute their own
        memories and dedications. The photo uploader lets you choose
        pictures from your device and preview them immediately, and
        the posts section records brief messages locally. These sections
        are optional and can be removed if you only want to display static
        content from the data files.
      */}
      <PhotoUploadSection />
      <PostsSection />
      <FinalLetterSection />
      <FooterSection />
    </main>
  );
}
