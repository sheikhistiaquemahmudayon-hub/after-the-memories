import React from 'react';
import { memoriesData } from '../data/content';
import MemoryCard from '../components/MemoryCard';
import ChapterHeader from '../components/ChapterHeader';

const LAYOUTS = ['right', 'center', 'left', 'center', 'full'];

export default function Reflection() {
  const items = memoriesData.filter(m => m.chapter === 'Reflection');

  return (
    <section className="chapter-section" id="reflection">
      <ChapterHeader number="III" title="Reflection" />
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
