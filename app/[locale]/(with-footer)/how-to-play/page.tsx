'use client';

import styles from '@/app/(styles)/how-to-play-styles/how-to-play.module.css';
import { useTranslation } from '@/app/(hooks)/use-translation';

const DISCORD_LINK = 'https://discord.gg/dgF5ScZ7eH';
const TELEGRAM_LINK = 'https://t.me/eliumhronick';
const TELEGRAM_BN_LINK = 'https://t.me/bn1world';

export default function HowToPlay() {
  const { translate } = useTranslation();
  const t = translate.howToPlay;

  const commands = [
    { cmd: '/menu', desc: t.commands.menu },
    { cmd: '/name', desc: t.commands.name },
    { cmd: t.commands.chatLabel, desc: t.commands.chat },
    { cmd: '/sh', desc: t.commands.sh },
    { cmd: '/low', desc: t.commands.low },
    { cmd: '/scr', desc: t.commands.scr },
    { cmd: '/me', desc: t.commands.me },
    { cmd: '/do', desc: t.commands.do },
    { cmd: '/try', desc: t.commands.try },
    { cmd: '/dice', desc: t.commands.dice },
    { cmd: '/sit', desc: t.commands.sit },
    { cmd: '/lay', desc: t.commands.lay },
    { cmd: t.commands.nrpLabel, desc: t.commands.nrp },
    { cmd: t.commands.globalNrpLabel, desc: t.commands.globalNrp },
  ];

  const channels = [
    { emoji: '📖', name: t.channels.chronicle.name, desc: t.channels.chronicle.desc },
    { emoji: '🏛️', name: t.channels.truths.name, desc: t.channels.truths.desc },
    { emoji: '📢', name: t.channels.news.name, desc: t.channels.news.desc },
    { emoji: '🌺', name: t.channels.sneakPeeks.name, desc: t.channels.sneakPeeks.desc },
    { emoji: '🎪', name: t.channels.announcements.name, desc: t.channels.announcements.desc },
  ];

  return (
    <article className={styles.container}>
      <section className={styles.section}>
        <p className={styles.introText}>{t.intro}</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t.serverAddress}</h2>
        <div className={styles.addressCards}>
          <div className={styles.addressCard}>
            <span className={styles.addressLabel}>IP</span>
            <code className={styles.addressValue}>elium.aboba.host</code>
          </div>
          <div className={styles.addressCard}>
            <span className={styles.addressLabel}>IP</span>
            <code className={styles.addressValue}>rasiel.site</code>
          </div>
          <div className={styles.addressCard}>
            <span className={styles.addressLabel}>{t.version}</span>
            <code className={styles.addressValue}>1.21.11</code>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t.links.title}</h2>
        <div className={styles.linksGrid}>
          <a
            href={DISCORD_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.linkCard} ${styles.linkDiscord}`}
          >
            <span className={styles.linkIcon}>💬</span>
            <div>
              <span className={styles.linkName}>Discord</span>
              <span className={styles.linkDesc}>{t.links.discord}</span>
            </div>
            <span className={styles.linkArrow}>↗</span>
          </a>
          <a
            href={TELEGRAM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.linkCard} ${styles.linkTelegram}`}
          >
            <span className={styles.linkIcon}>✈️</span>
            <div>
              <span className={styles.linkName}>Telegram</span>
              <span className={styles.linkDesc}>{t.links.telegram}</span>
            </div>
            <span className={styles.linkArrow}>↗</span>
          </a>
          <a
            href={TELEGRAM_BN_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.linkCard} ${styles.linkCreator}`}
          >
            <span className={styles.linkIcon}>🎨</span>
            <div>
              <span className={styles.linkName}>{t.links.creatorChannel}</span>
              <span className={styles.linkDesc}>{t.links.creatorDesc}</span>
            </div>
            <span className={styles.linkArrow}>↗</span>
          </a>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t.howToStart.title}</h2>
        <div className={styles.stepsContainer}>
          <div className={styles.step}>
            <div className={styles.stepNumber}>1</div>
            <div className={styles.stepContent}>
              <h3 className={styles.stepTitle}>{t.howToStart.step1.title}</h3>
              <p className={styles.stepText}>{t.howToStart.step1.text}</p>
            </div>
          </div>
          <div className={styles.stepDivider} />
          <div className={styles.step}>
            <div className={styles.stepNumber}>2</div>
            <div className={styles.stepContent}>
              <h3 className={styles.stepTitle}>{t.howToStart.step2.title}</h3>
              <p className={styles.stepText}>{t.howToStart.step2.text}</p>
            </div>
          </div>
          <div className={styles.stepDivider} />
          <div className={styles.step}>
            <div className={styles.stepNumber}>3</div>
            <div className={styles.stepContent}>
              <h3 className={styles.stepTitle}>{t.howToStart.step3.title}</h3>
              <p className={styles.stepText}>{t.howToStart.step3.text}</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t.importantNotes.title}</h2>

        <div className={styles.noteCard}>
          <div className={styles.noteHeader}>
            <span className={styles.noteIcon}>🚫</span>
            <h3 className={styles.noteTitle}>{t.importantNotes.tlSkin.title}</h3>
          </div>
          <p className={styles.noteText}>{t.importantNotes.tlSkin.text}</p>
          <div className={styles.noteTip}>
            <span className={styles.tipIcon}>💡</span>
            <p className={styles.tipText}>{t.importantNotes.tlSkin.tip}</p>
          </div>
        </div>

        <div className={styles.noteCard}>
          <div className={styles.noteHeader}>
            <span className={styles.noteIcon}>🖼️</span>
            <h3 className={styles.noteTitle}>{t.importantNotes.texturePack.title}</h3>
          </div>
          <p className={styles.noteText}>{t.importantNotes.texturePack.text}</p>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t.commandsTitle}</h2>
        <div className={styles.commandsGrid}>
          {commands.map((c, i) => (
            <div key={i} className={styles.commandCard}>
              <code className={styles.commandName}>{c.cmd}</code>
              <p className={styles.commandDesc}>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.ticketBanner}>
          <span className={styles.ticketIcon}>🎫</span>
          <div>
            <h3 className={styles.ticketTitle}>{t.ticketsSection.title}</h3>
            <p className={styles.ticketText}>{t.ticketsSection.text}</p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t.usefulChannels}</h2>
        <div className={styles.channelsList}>
          {channels.map((ch, i) => (
            <div key={i} className={styles.channelItem}>
              <span className={styles.channelEmoji}>{ch.emoji}</span>
              <div>
                <span className={styles.channelName}>{ch.name}</span>
                <span className={styles.channelDesc}>{ch.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.outro}>
        <h2 className={styles.outroTitle}>{t.outro.title}</h2>
        <p className={styles.outroText}>{t.outro.text1}</p>
        <p className={styles.outroText}>{t.outro.text2}</p>
        <div className={styles.outroCreator}>
          <span>{t.outro.creator}</span>
        </div>
      </section>
    </article>
  );
}
