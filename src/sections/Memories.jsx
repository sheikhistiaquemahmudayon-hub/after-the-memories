import React from 'react';
import { memoriesData } from '../data/content';
import MemoryCard from '../components/MemoryCard';
import ChapterHeader from '../components/ChapterHeader';

const LAYOUTS = ['center', 'right', 'left', 'full', 'center', 'left'];

export default function Memories() {
  const items = memoriesData.filter(m => m.chapter === 'Memories');

  return (
    <section className="chapter-section" id="memories">
      <ChapterHeader number="II" title="Memories" />
      <div className="memory-stream">
        {items.map((memory, i) => (
          <MemoryCard
            key={memory.id}
            memory={memory}
            layout={LAYOUTS[i % LAYOUTS.length]}
          />
        ))}
      </div>
    </section>
  );
}
