import { alegreyaSansSC, martel } from '@/app/ui/fonts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Learn the Terms and Conditions of Use for Recipes2Go.',
};

export default function Page() {
  return (
    <main
      className={`${martel.className} mx-auto flex flex-grow flex-col justify-center p-4 md:w-2/3 md:text-lg xl:w-1/3`}
    >
      <h1
        className={`${alegreyaSansSC.className} mb-4 text-center text-4xl font-bold`}
      >
        Terms and Conditions
      </h1>
      <section className="flex flex-col gap-2 rounded-md bg-gray-100 p-2 text-sm">
        <p className="font-bold">Disclaimer:</p>
        <p>
          Please note that these Terms and Conditions is for demonstration
          purposes only and does not constitute legal advice. While we strive to
          ensure the accuracy and completeness of the information provided
          herein, it may not reflect the specific legal requirements applicable
          to this website or jurisdiction. This Terms and Conditions template is
          not legally binding and should not be relied upon as such.
        </p>
        <p>
          For personalized legal advice regarding these Terms and Conditions and
          compliance with applicable laws, we recommend consulting with a
          qualified attorney familiar with your circumstances and jurisdiction.
        </p>
      </section>
      <section>
        <h2 className={`${alegreyaSansSC.className} text-2xl font-bold`}>
          1. Introduction
        </h2>
        <p className="p-2">
          These Terms and Conditions govern your use of Recipes2Go.vercel.app
          (the &quot;Website&quot;) operated by Recipes2go (the
          &quot;Company&quot;). By accessing this Website, you agree to abide by
          these Terms and Conditions in full. If you disagree with any part of
          these terms, you must not use this Website.
        </p>
      </section>
      <section>
        <h2 className={`${alegreyaSansSC.className} text-2xl font-bold`}>
          2. Intellectual Property Rights
        </h2>
        <p className="p-2">
          Unless otherwise stated, the Company and/or its licensors own the
          intellectual property rights for all material on the Website. All
          intellectual property rights are reserved.
        </p>
      </section>
      <section>
        <h2 className={`${alegreyaSansSC.className} text-2xl font-bold`}>
          3. Restrictions
        </h2>
        <p className="p-2">
          You are specifically restricted from all of the following:
        </p>
        <ul className="list-disc pl-8">
          <li>Publishing any Website material in any other media.</li>
          <li>
            Selling, sublicensing, and/or otherwise commercializing any Website
            material.
          </li>
          <li>
            Using this Website in any way that is or may be damaging to this
            Website.
          </li>
          <li>
            Using this Website in any way that impacts user access to this
            Website.
          </li>
        </ul>
      </section>
      <section>
        <h2 className={`${alegreyaSansSC.className} text-2xl font-bold`}>
          4. User Content
        </h2>
        <p className="p-2">
          By submitting content to the Website, you grant the Company a
          worldwide, irrevocable, non-exclusive, royalty-free license to use,
          reproduce, adapt, publish, translate, and distribute your content in
          any existing or future media.
        </p>
      </section>
      <section>
        <h2 className={`${alegreyaSansSC.className} text-2xl font-bold`}>
          5. Limitation of Liability
        </h2>
        <p className="p-2">
          In no event shall the Company, nor any of its officers, directors, and
          employees, be liable to you for anything arising out of or in any way
          connected with your use of this Website, whether such liability is
          under contract, tort or otherwise.
        </p>
      </section>
      <section>
        <h2 className={`${alegreyaSansSC.className} text-2xl font-bold`}>
          6. Indemnification
        </h2>
        <p className="p-2">
          You hereby indemnify to the fullest extent the Company from and
          against any and all liabilities, costs, demands, causes of action,
          damages, and expenses (including reasonable attorney&apos;s fees)
          arising out of or in any way related to your breach of any of the
          provisions of these Terms.
        </p>
      </section>
      <section>
        <h2 className={`${alegreyaSansSC.className} text-2xl font-bold`}>
          7. Variation of Terms
        </h2>
        <p className="p-2">
          The Company is permitted to revise these Terms at any time as it sees
          fit, and by using this Website, you are expected to review such Terms
          on a regular basis to ensure you understand all terms and conditions
          governing the use of this Website.
        </p>
      </section>
      <section>
        <h2 className={`${alegreyaSansSC.className} text-2xl font-bold`}>
          8. Governing Law & Jurisdiction
        </h2>
        <p className="p-2">
          These Terms will be governed by and construed in accordance with the
          laws of The United States of America, and you submit to the
          non-exclusive jurisdiction of the state and federal courts located in
          Phoenix, Arizona for the resolution of any disputes.
        </p>
      </section>
      <section>
        <h2 className={`${alegreyaSansSC.className} text-2xl font-bold`}>
          9. Entire Agreement
        </h2>
        <p className="p-2">
          These Terms constitute the entire agreement between the Company and
          you in relation to your use of this Website and supersede all prior
          agreements and understandings.
        </p>
      </section>
    </main>
  );
}
