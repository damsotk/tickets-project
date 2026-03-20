import Header from '@/app/(components)/main-page/Header';
import styles from '@/app/(styles)/articles-styles/single-article-page.module.css';

export const metadata = {
  title: 'Privacy Policy | Ellium Tickets',
  description: 'Privacy policy and cookie usage information',
};

export default function PrivacyPolicyPage() {
  return (
    <div style={{ color: 'whitesmoke' }} className={styles.pageWrapper}>
      <Header />
      <div className={styles.contentContainer}>
        <h1 className={styles.pageTitle}>Privacy Policy</h1>

        <div className={styles.contentWrapper}>
          <div className={styles.content}>
            <p>
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <h2>Introduction</h2>
            <p>
              Welcome to Ellium Site. We respect your privacy and are committed to protecting your
              personal data. This privacy policy explains how we use cookies and collect data when
              you use our service.
            </p>

            <h2>What Data We Collect</h2>
            <p>We collect minimal data necessary to provide and improve our service:</p>

            <h3>Essential Data (Always Active)</h3>
            <ul>
              <li>
                <strong>Authentication Token:</strong> JWT token stored in cookies to maintain your
                logged-in session
              </li>
              <li>
                <strong>Language Preference:</strong> Your selected interface language for a
                personalized experience
              </li>
              <li>
                <strong>Message Cache:</strong> Temporary storage of messages to reduce API requests
                and improve performance
              </li>
            </ul>

            <h3>Analytics Data (Optional)</h3>
            <p>With your consent, we collect anonymous analytics data through Vercel Analytics:</p>
            <ul>
              <li>Page views and navigation patterns</li>
              <li>Browser type and device information</li>
              <li>Geographic location (country/city level only)</li>
              <li>Performance metrics (page load times)</li>
            </ul>

            <p>
              <strong>Important:</strong> Analytics data is completely anonymous and cannot be used
              to identify individual users. No personal information is collected through analytics.
            </p>

            <h2>Why We Use Cookies</h2>

            <h3>Essential Cookies</h3>
            <p>These cookies are necessary for the service to function and cannot be disabled:</p>
            <ul>
              <li>
                <strong>auth_token:</strong> Keeps you logged in and secure
              </li>
              <li>
                <strong>locale:</strong> Remembers your language choice
              </li>
              <li>
                <strong>message_cache:</strong> Stores recent messages locally to improve speed
              </li>
            </ul>

            <h3>Analytics Cookies</h3>
            <p>
              These cookies help us understand how users interact with our service. You can opt-out
              at any time:
            </p>
            <ul>
              <li>
                <strong>Vercel Analytics:</strong> Privacy-friendly analytics without personal data
                collection
              </li>
            </ul>

            <h2>How We Use Your Data</h2>
            <ul>
              <li>
                <strong>Authentication:</strong> To verify your identity and maintain secure
                sessions
              </li>
              <li>
                <strong>Personalization:</strong> To display content in your preferred language
              </li>
              <li>
                <strong>Performance:</strong> To cache data and reduce loading times
              </li>
              <li>
                <strong>Improvement:</strong> To understand usage patterns and enhance the service
              </li>
            </ul>

            <h2>Data Retention</h2>
            <ul>
              <li>
                <strong>Authentication tokens:</strong> Valid until logout or expiration
              </li>
              <li>
                <strong>Language preferences:</strong> Stored indefinitely until changed
              </li>
              <li>
                <strong>Message cache:</strong> Cleared periodically or on logout
              </li>
              <li>
                <strong>Analytics data:</strong> Aggregated and anonymized, retained for 90 days
              </li>
            </ul>

            <h2>Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Opt-out of analytics at any time</li>
              <li>Clear all cookies through your browser settings</li>
              <li>Request deletion of your account and associated data</li>
              <li>Access information about data we store</li>
            </ul>

            <h2>Third-Party Services</h2>
            <p>We use the following third-party services:</p>
            <ul>
              <li>
                <strong>Vercel Analytics:</strong> Privacy-focused analytics that doesn't use
                cookies or collect personal data.{' '}
                <a
                  href="https://vercel.com/docs/analytics/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn more
                </a>
              </li>
            </ul>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any
              significant changes by posting the new policy on this page and updating the "Last
              updated" date.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have questions about this privacy policy or your data, please contact us
              through our support system.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
