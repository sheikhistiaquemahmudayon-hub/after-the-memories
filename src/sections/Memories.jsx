import React from 'react';
import { memoriesData } from '../data/content';
import MemoryCard from '../components/MemoryCard';
import ChapterHeader from '../components/ChapterHeader';

export default function Memories() {
  const items = memoriesData.filter(m => m.chapter === 'Memories');

  return (
    <section className="chapter-section" id="memories">
      <ChapterHeader number="II" title="Memories" />
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
