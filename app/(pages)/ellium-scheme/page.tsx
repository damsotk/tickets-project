'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from '@/app/(styles)/ellium-scheme-styles/ellium-schema.module.css';

interface Point {
  id: string;
  label: string;
  icon: string;
  position: { x: number; y: number };
  lineDirection: 'left' | 'right' | 'top' | 'bottom';
  info: {
    title: string;
    description: string;
  };
}

const points: Point[] = [
  {
    id: 'amai',
    label: 'Amai',
    icon: '○',
    position: { x: 40, y: 8 },
    lineDirection: 'right',
    info: {
      title: 'Amai',
      description: 'The upper layer of the world of Elium, dwelling place of higher beings',
    },
  },
  {
    id: 'abnu',
    label: 'Abnu',
    icon: '○',
    position: { x: 85, y: 10 },
    lineDirection: 'right',
    info: {
      title: 'Abnu',
      description: 'Sacred lands preserving ancient knowledge',
    },
  },
  {
    id: 'svetoch',
    label: 'Children of the Luminary',
    icon: '○',
    position: { x: 60, y: 22 },
    lineDirection: 'right',
    info: {
      title: 'Children of the Luminary',
      description: 'The source of divine light illuminating all worlds',
    },
  },
  {
    id: 'razriadnye',
    label: 'Discharge Planes',
    icon: '◇',
    position: { x: 75, y: 32 },
    lineDirection: 'right',
    info: {
      title: 'Discharge Planes',
      description: 'Intermediate dimensions between worlds',
    },
  },
  {
    id: 'svetoch-center',
    label: 'Luminary',
    icon: '☰',
    position: { x: 58, y: 48 },
    lineDirection: 'right',
    info: {
      title: 'Luminary',
      description: 'The central core of Elium’s cosmos',
    },
  },
  {
    id: 'cep-ostrovov',
    label: 'Chain of Edge Islands',
    icon: '○',
    position: { x: 78, y: 56 },
    lineDirection: 'right',
    info: {
      title: 'Chain of Edge Islands',
      description: 'An archipelago at the boundary of the known world',
    },
  },
  {
    id: 'oskol-plany',
    label: 'Fragmented Planes',
    icon: '◇',
    position: { x: 30, y: 40 },
    lineDirection: 'left',
    info: {
      title: 'Fragmented Planes',
      description: 'Shattered realities of ancient worlds',
    },
  },
  {
    id: 'plany-obitaemye',
    label: 'Inhabited Planes',
    icon: '◇',
    position: { x: 25, y: 52 },
    lineDirection: 'left',
    info: {
      title: 'Inhabited Planes',
      description: 'Populated layers of reality',
    },
  },
  {
    id: 'taiushie',
    label: 'Melting Lands',
    icon: '○',
    position: { x: 70, y: 72 },
    lineDirection: 'right',
    info: {
      title: 'Melting Lands',
      description: 'Unstable territories on the verge of collapse',
    },
  },
  {
    id: 'kant',
    label: 'Kant',
    icon: '○',
    position: { x: 32, y: 84 },
    lineDirection: 'left',
    info: {
      title: 'Kant',
      description: 'The boundary between the worlds of the living and the dead',
    },
  },
  {
    id: 'harantil',
    label: 'Harantil',
    icon: '○',
    position: { x: 18, y: 94 },
    lineDirection: 'left',
    info: {
      title: 'Harantil',
      description: 'The underground realm of shadows and oblivion',
    },
  },
  {
    id: 'bezdna',
    label: 'Abyss',
    icon: '○',
    position: { x: 60, y: 94 },
    lineDirection: 'right',
    info: {
      title: 'Abyss',
      description: 'Endless void beyond creation',
    },
  },
  {
    id: 'oskolki',
    label: 'Shards of Creation',
    icon: '○',
    position: { x: 82, y: 84 },
    lineDirection: 'right',
    info: {
      title: 'Shards of Creation',
      description: 'Remnants of destroyed worlds and realities',
    },
  },
];

export default function ElimaScheme() {
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);

  return (
    <div className={styles.container}>
      <Image src="/2.png" alt="Background" fill className={styles.background} priority />

      <div className={styles.legend}>
        <h2 className={styles.legendTitle}>
          Approximate diagram
          <br />
          of Elium’s structure
        </h2>
        <div className={styles.legendItems}>
          <div className={styles.legendItem}>
            <span className={styles.iconDiamond}>◇</span>
            <span>Chapter “Life”</span>
          </div>
          <div className={styles.legendItem}>
            <span className={styles.iconCircle}>○</span>
            <span>Chapter “Higher Ones”</span>
          </div>
          <div className={styles.legendItem}>
            <span className={styles.iconBars}>☰</span>
            <span>Chapter “Foundation”</span>
          </div>
          <div className={styles.legendItem}>
            <span className={styles.iconWave}>○</span>
            <span>Chapter “Gates”</span>
          </div>
        </div>
      </div>

      <div className={styles.schemeWrapper}>
        {points.map((point) => (
          <div
            key={point.id}
            className={styles.pointContainer}
            style={{
              left: `${point.position.x}%`,
              top: `${point.position.y}%`,
            }}
            onMouseEnter={() => setHoveredPoint(point.id)}
            onMouseLeave={() => setHoveredPoint(null)}
          >
            <div
              className={`${styles.line} ${
                styles[`line-${point.lineDirection}`]
              } ${hoveredPoint === point.id ? styles.lineActive : ''}`}
            />

            <div
              className={`${styles.point} ${hoveredPoint === point.id ? styles.pointHovered : ''}`}
            >
              <span className={styles.pointIcon}>{point.icon}</span>
            </div>

            <div
              className={`${styles.label} ${
                hoveredPoint === point.id ? styles.labelHidden : ''
              } ${styles[`label-${point.lineDirection}`]}`}
            >
              {point.label}
            </div>

            <div
              className={`${styles.infoCard} ${
                hoveredPoint === point.id ? styles.infoCardVisible : ''
              } ${styles[`infoCard-${point.lineDirection}`]}`}
            >
              <h3 className={styles.infoTitle}>{point.info.title}</h3>
              <p className={styles.infoDescription}>{point.info.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
