import Link from 'next/link';
import styles from '@/app/(styles)/navigation-grid.module.css';

interface NavItem {
  title: string;
  description: string;
  href: string;
  color: 'red' | 'green' | 'purple' | 'blue';
  icon: string;
}

const navItems: NavItem[] = [
  {
    title: 'Tickets',
    description:
      'Contact the server administration. File a complaint against a player, ask a lore question, get technical support, or resolve other issues.',
    href: '/tickets',
    color: 'red',
    icon: '📋',
  },
  {
    title: 'Articles',
    description:
      'Explore the world of Ellium. Here you`ll find articles about server lore, guides for newcomers, update news, and important announcements.',
    href: '/articles',
    color: 'green',
    icon: '📰',
  },
  {
    title: 'Rumors',
    description:
      'Send an anonymous rumor to the server. Your message will appear in the game without identifying the author—intrigue, gossip, and secrets.',
    href: '/rumors',
    color: 'purple',
    icon: '👁️',
  },
];

export default function NavigationGrid() {
  return (
    <section className={styles.container}>
      <div className={styles.grid}>
        {navItems.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className={`${styles.card} ${styles[item.color]}`}
          >
            <div className={styles.iconWrapper}>
              <span className={styles.icon}>{item.icon}</span>
            </div>
            <div className={styles.content}>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.description}>{item.description}</p>
            </div>
            <div className={styles.arrow}>→</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
