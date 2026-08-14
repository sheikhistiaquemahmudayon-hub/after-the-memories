import React from 'react';
import { memoriesData } from '../data/content';
import MemoryCard from '../components/MemoryCard';
import ChapterHeader from '../components/ChapterHeader';

const LAYOUTS = ['full', 'left', 'right', 'center', 'left'];

export default function TheBeginning() {
  const items = memoriesData.filter(m => m.chapter === 'The Beginning');

  return (
    <section className="chapter-section" id="the-beginning">
      <ChapterHeader number="I" title="The Beginning" />
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
