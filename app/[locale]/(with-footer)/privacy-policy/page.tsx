'use client';
import styles from '@/app/(styles)/articles-styles/single-article-page.module.css';
import { useTranslation } from '@/app/(hooks)/use-translation';

export default function PrivacyPolicyPage() {
  const { translate } = useTranslation();
  const t = translate.privacyPolicy;

  return (
    <div className={styles.pageWrapper} style={{ color: 'white' }}>
      <div className={styles.contentContainer}>
        <h1 className={styles.pageTitle}>{t.title}</h1>

        <div className={styles.contentWrapper}>
          <div className={styles.content}>
            <p>
              <strong>{t.lastUpdated}</strong> {t.lastUpdatedDate}
            </p>

            <h2>{t.sections.introduction.title}</h2>
            <p>{t.sections.introduction.text}</p>

            <h2>{t.sections.whatDataWeCollect.title}</h2>
            <p>{t.sections.whatDataWeCollect.text}</p>

            <h3>{t.sections.whatDataWeCollect.essential.title}</h3>
            <ul>
              {t.sections.whatDataWeCollect.essential.items.map(
                (item: { label: string; text: string }, i: number) => (
                  <li key={i}>
                    <strong>{item.label}</strong> {item.text}
                  </li>
                ),
              )}
            </ul>

            <h3>{t.sections.whatDataWeCollect.analytics.title}</h3>
            <p>{t.sections.whatDataWeCollect.analytics.text}</p>
            <ul>
              {t.sections.whatDataWeCollect.analytics.items.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p>
              <strong>{t.sections.whatDataWeCollect.analytics.important}</strong>
            </p>

            <h2>{t.sections.whyWeUseCookies.title}</h2>

            <h3>{t.sections.whyWeUseCookies.essential.title}</h3>
            <p>{t.sections.whyWeUseCookies.essential.text}</p>
            <ul>
              {t.sections.whyWeUseCookies.essential.items.map(
                (item: { label: string; text: string }, i: number) => (
                  <li key={i}>
                    <strong>{item.label}</strong> {item.text}
                  </li>
                ),
              )}
            </ul>

            <h3>{t.sections.whyWeUseCookies.analytics.title}</h3>
            <p>{t.sections.whyWeUseCookies.analytics.text}</p>
            <ul>
              {t.sections.whyWeUseCookies.analytics.items.map(
                (item: { label: string; text: string }, i: number) => (
                  <li key={i}>
                    <strong>{item.label}</strong> {item.text}
                  </li>
                ),
              )}
            </ul>

            <h2>{t.sections.howWeUseYourData.title}</h2>
            <ul>
              {t.sections.howWeUseYourData.items.map(
                (item: { label: string; text: string }, i: number) => (
                  <li key={i}>
                    <strong>{item.label}</strong> {item.text}
                  </li>
                ),
              )}
            </ul>

            <h2>{t.sections.dataRetention.title}</h2>
            <ul>
              {t.sections.dataRetention.items.map(
                (item: { label: string; text: string }, i: number) => (
                  <li key={i}>
                    <strong>{item.label}</strong> {item.text}
                  </li>
                ),
              )}
            </ul>

            <h2>{t.sections.yourRights.title}</h2>
            <p>{t.sections.yourRights.text}</p>
            <ul>
              {t.sections.yourRights.items.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <h2>{t.sections.thirdPartyServices.title}</h2>
            <p>{t.sections.thirdPartyServices.text}</p>
            <ul>
              {t.sections.thirdPartyServices.items.map(
                (
                  item: { label: string; text: string; linkText: string; linkUrl: string },
                  i: number,
                ) => (
                  <li key={i}>
                    <strong>{item.label}</strong> {item.text}{' '}
                    <a href={item.linkUrl} target="_blank" rel="noopener noreferrer">
                      {item.linkText}
                    </a>
                  </li>
                ),
              )}
            </ul>

            <h2>{t.sections.changesToPolicy.title}</h2>
            <p>{t.sections.changesToPolicy.text}</p>

            <h2>{t.sections.contactUs.title}</h2>
            <p>{t.sections.contactUs.text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
