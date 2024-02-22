import { alegreyaSansSC, martel } from '@/app/ui/fonts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Learn more about our cookies policy at Recipes2Go.',
};

export default function Page() {
  return (
    <main
      className={`${martel.className} mx-auto flex flex-grow flex-col justify-center p-4 md:w-2/3 md:text-lg xl:w-1/3`}
    >
      <h1
        className={`${alegreyaSansSC.className} mb-4 text-center text-4xl font-bold`}
      >
        Cookie Policy
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
        <em>Effective Date: 2/21/2024</em>
        <p>
          This Cookie Policy explains how Recipes2Go (&quot;we&quot;,
          &quot;us&quot;, or &quot;our&quot;) uses cookies and similar
          technologies to recognize you when you visit our website at Recipes2Go
          (&quot;Website&quot;). It explains what these technologies are and why
          we use them, as well as your rights to control our use of them.
        </p>
      </section>
      <section className="flex flex-col gap-2 py-2">
        <h2 className={`${alegreyaSansSC.className} text-2xl font-bold`}>
          What are cookies?
        </h2>
        <p>
          Cookies are small data files that are placed on your computer or
          mobile device when you visit a website. Cookies are widely used by
          website owners in order to make their websites work, or to work more
          efficiently, as well as to provide reporting information.
        </p>
      </section>
      <section className="flex flex-col gap-2 py-2">
        <h2 className={`${alegreyaSansSC.className} text-2xl font-bold`}>
          How do we use cookies?
        </h2>
        <p>
          We use cookies to improve your browsing experience on our Website, to
          analyze Website traffic, and to understand where our visitors are
          coming from. Cookies may also be used to personalize content and ads,
          and to provide social media features.
        </p>
      </section>
      <section className="flex flex-col gap-2 py-2">
        <h2 className={`${alegreyaSansSC.className} text-2xl font-bold`}>
          What types of cookies do we use?
        </h2>
        <ul className="list-disc pl-8">
          <li>
            <span className="font-bold">Essential cookies:</span> These cookies
            are necessary for the Website to function properly. They enable core
            functionality such as security, network management, and
            accessibility. You may disable these by changing your browser
            settings, but this may affect how the Website functions.
          </li>
          <li>
            <span className="font-bold">Analytics cookies:</span> These cookies
            allow us to analyze how visitors use the Website, so we can measure
            and improve the performance of our site. These cookies collect
            information in an anonymous form.
          </li>
          <li>
            <span className="font-bold">Functionality cookies:</span> These
            cookies enable the Website to provide enhanced functionality and
            personalization. They may be set by us or by third-party providers
            whose services we have added to our pages.
          </li>
          <li>
            <span className="font-bold">Advertising cookies:</span> These
            cookies are used to make advertising messages more relevant to you.
            They perform functions like preventing the same ad from continuously
            reappearing, ensuring that ads are properly displayed, and in some
            cases selecting advertisements that are based on your interests.
          </li>
        </ul>
      </section>
      <section className="flex flex-col gap-2 py-2">
        <h2 className={`${alegreyaSansSC.className} text-2xl font-bold`}>
          How to control cookies
        </h2>
        <p>
          You have the right to decide whether to accept or reject cookies. You
          can exercise your cookie preferences by clicking on the &quot;Cookie
          Settings&quot; link in the footer of our Website and adjusting the
          settings according to your preferences. You can also set your browser
          to refuse all cookies or to indicate when a cookie is being sent.
          However, if you do not accept cookies, you may not be able to use some
          portions of our Website.
        </p>
      </section>
      <section className="flex flex-col gap-2 py-2">
        <h2 className={`${alegreyaSansSC.className} text-2xl font-bold`}>
          Changes to this Cookie Policy
        </h2>
        <p>
          We may update our Cookie Policy from time to time. We will notify you
          of any changes by posting the new Cookie Policy on this page.
        </p>
      </section>
      <section className="flex flex-col gap-2 py-2">
        <h2 className={`${alegreyaSansSC.className} text-2xl font-bold`}>
          Contact Us
        </h2>
        <p>
          If you have any questions about our Cookie Policy, please contact us
          at <a href="mailto:example@example.com">example@example.com</a>.
        </p>
      </section>
    </main>
  );
}
