import { alegreyaSansSC, martel } from '@/app/ui/fonts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: "Learn more about Recipe2Go's Privacy policy.",
};

export default function Page() {
  return (
    <main
      className={`${martel.className} mx-auto flex flex-grow flex-col justify-center p-4 md:w-2/3 md:text-lg xl:w-1/3`}
    >
      <h1
        className={`${alegreyaSansSC.className} mb-4 text-center text-4xl font-bold`}
      >
        Privacy Policy for Recipes2Go
      </h1>
      <section className="flex flex-col gap-2 rounded-md bg-gray-100 p-2 text-sm">
        <p className="font-bold">Disclaimer:</p>
        <p>
          Please note that this privacy policy is for demonstration purposes
          only and does not constitute legal advice. While we strive to ensure
          the accuracy and completeness of the information provided herein, it
          may not reflect the specific legal requirements applicable to this
          website or jurisdiction. This privacy policy template is not legally
          binding and should not be relied upon as such.
        </p>
        <p>
          For personalized legal advice regarding privacy policies and
          compliance with applicable laws, we recommend consulting with a
          qualified attorney familiar with your circumstances and jurisdiction.
        </p>
      </section>
      <section className="flex flex-col gap-2 py-2">
        <em className="text-lg">Last Updated: 2/21/2024</em>
        <p>
          Welcome to Recipes2Go (the &quot;Website&quot;). This Privacy Policy
          outlines how we collect, use, and protect the information you provide
          when using our website.
        </p>
        <h2 className={`${alegreyaSansSC.className} text-2xl font-bold`}>
          Information We Collect:
        </h2>
        <ul>
          <li>
            <span className="font-bold">1. Personal Information:</span>
            <ul className="list-disc pl-8">
              <li>
                When you sign up for an account, we may collect your name, email
                address, and other necessary information.
              </li>
            </ul>
          </li>
          <li>
            <span className="font-bold">2. Non-Personal Information:</span>
            <ul className="list-disc pl-8">
              <li>
                We may collect non-personal information such as browser type,
                operating system, and IP address for analytical purposes.
              </li>
            </ul>
          </li>
        </ul>
      </section>
      <section className="flex flex-col gap-2 py-2">
        <h2 className={`${alegreyaSansSC.className} text-2xl font-bold`}>
          How we Use Your Information:
        </h2>
        <ul>
          <li>
            <span className="font-bold">1. Personal Information:</span>
            <ul className="list-disc pl-8">
              <li>
                We use personal information to provide and personalize our
                services, communicate with you, and process transactions.
              </li>
              <li>
                Your email address may be used to send you updates, newsletters,
                and promotional materials. You can opt-out at any time.
              </li>
            </ul>
          </li>
          <li>
            <span className="font-bold">2. Non-Personal Information:</span>
            <ul className="list-disc pl-8">
              <li>
                Non-personal information is used for statistical analysis, to
                improve our website and services, and for marketing purposes.
              </li>
            </ul>
          </li>
        </ul>
      </section>
      <section className="flex flex-col gap-2 py-2">
        <h2 className={`${alegreyaSansSC.className} text-2xl font-bold`}>
          Data Security:
        </h2>
        <p>
          We implement security measures to protect your personal information.
          However, no method of transmission over the internet is 100% secure.
          We strive to use commercially acceptable means to protect your
          information but cannot guarantee its absolute security.
        </p>
      </section>
      <section className="flex flex-col gap-2 py-2">
        <h2 className={`${alegreyaSansSC.className} text-2xl font-bold`}>
          Sharing Your Information:
        </h2>
        <p>
          We do not sell, trade, or otherwise transfer your personal information
          to third parties without your consent. However, we may share
          non-personal information for marketing, advertising, or other uses.
        </p>
      </section>
      <section className="flex flex-col gap-2 py-2">
        <h2 className={`${alegreyaSansSC.className} text-2xl font-bold`}>
          Cookies:
        </h2>
        <p>
          We use cookies to enhance your experience on our website. You can
          choose to disable cookies through your browser settings, but this may
          affect the functionality of the site.
        </p>
      </section>
      <section className="flex flex-col gap-2 py-2">
        <h2 className={`${alegreyaSansSC.className} text-2xl font-bold`}>
          Third-Party Links:
        </h2>
        <p>
          Our website may contain links to third-party websites. We are not
          responsible for the privacy practices of these sites. Please read the
          privacy policies of each website you visit.
        </p>
      </section>
      <section className="flex flex-col gap-2 py-2">
        <h2 className={`${alegreyaSansSC.className} text-2xl font-bold`}>
          Changes to This Privacy Policy:
        </h2>
        <p>
          WWe may update our Privacy Policy from time to time. Any changes will
          be posted on this page with a revised date.
        </p>
      </section>
      <section className="flex flex-col gap-2 py-2">
        <h2 className={`${alegreyaSansSC.className} text-2xl font-bold`}>
          Contact Information:
        </h2>
        <p>
          If you have any questions or concerns regarding our Privacy Policy,
          please contact us at{' '}
          <a href="mailto:example@example.com">example@example.com</a>.
        </p>
      </section>
      <section className="flex flex-col gap-2 py-2">
        <p>By using our website, you consent to our Privacy Policy.</p>
      </section>
    </main>
  );
}
