import React from 'react';
import { memoriesData } from '../data/content';
import MemoryCard from '../components/MemoryCard';
import ChapterHeader from '../components/ChapterHeader';

export default function Reflection() {
  const items = memoriesData.filter(m => m.chapter === 'Reflection');

  return (
    <section className="chapter-section" id="reflection">
      <ChapterHeader number="III" title="Reflection" />
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
