import React from 'react';
import { memoriesData } from '../data/content';
import MemoryCard from '../components/MemoryCard';
import ChapterHeader from '../components/ChapterHeader';

export default function TheBeginning() {
  const items = memoriesData.filter(m => m.chapter === 'The Beginning');

  return (
    <section className="chapter-section" id="the-beginning">
      <ChapterHeader number="I" title="The Beginning" />
      <div className="memory-stream">
        {items.map((memory) => (
          <MemoryCard
            key={memory.id}
            memory={memory}
          />
        ))}
      </div>
    </section>
  );
}
