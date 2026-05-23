import termsVideo from "../assets/footerVideo.mp4";

function TermsOfService({ setPage }) {
  return (
    <div className="relative min-h-screen text-white overflow-hidden">

      {/* Fixed Background Video */}
      <video
        className="fixed top-0 left-0 w-full h-full object-cover z-[-2]"
        src={termsVideo}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Dark Overlay */}
      <div className="fixed inset-0 bg-black/80 z-[-1]"></div>

      {/* Content */}
      <div className="relative z-10 px-6 py-16">
        <div className="max-w-5xl mx-auto">

          {/* Back Button */}
          <button
            onClick={() => setPage("home")}
            className="mb-8 px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:opacity-90 transition"
          >
            ← Back
          </button>

          {/* Center Heading */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              Terms & Conditions
            </h1>

            <p className="text-lg font-semibold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              Welcome to Jaswisys
            </p>
          </div>

          <div className="space-y-10 text-gray-300 leading-8">

            {/* Intro */}
            <div>
              <p>
                By accessing our website, you agree to comply with these terms.
              </p>

              <p className="mt-4">
                By accessing or using our website and services, you agree to
                comply with and be bound by the following Terms & Conditions.
                If you do not agree with these terms, please do not use our
                website or services.
              </p>
            </div>

            {/* Section 1 */}
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">
                1. Use of Website
              </h2>

              <p className="mb-4">
                You agree to use this website only for lawful purposes and in
                accordance with these Terms & Conditions.
              </p>

              <ul className="list-disc pl-6 space-y-3">
                <li>Do not violate any applicable laws or regulations.</li>
                <li>Do not attempt unauthorized access to systems or data.</li>
                <li>Do not disrupt website functionality.</li>
                <li>
                  Do not use the website for fraudulent or harmful activities.
                </li>
              </ul>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">
                2. Intellectual Property
              </h2>

              <p>
                All content on this website, including text, graphics, logos,
                images, software, and branding, is the property of Jaswisys or
                its licensors and is protected by applicable intellectual
                property laws.
              </p>

              <p className="mt-4">
                You may not reproduce, distribute, or modify website content
                without prior written permission.
              </p>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">
                3. Disclaimer
              </h2>

              <p className="mb-4">
                The information provided on this website is for general
                informational purposes only.
              </p>

              <ul className="list-disc pl-6 space-y-3">
                <li>Accuracy</li>
                <li>Completeness</li>
                <li>Reliability</li>
                <li>Availability</li>
              </ul>

              <p className="mt-4">
                Your use of the website is at your own risk.
              </p>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">
                4. Limitation of Liability
              </h2>

              <p>
                To the fullest extent permitted by law, Jaswisys shall not be
                liable for any indirect, incidental, consequential, or special
                damages arising from your use of this website or services.
              </p>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">
                5. Third-Party Links
              </h2>

              <p>
                Our website may contain links to third-party websites. We are
                not responsible for the content, policies, or practices of
                external websites.
              </p>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">
                6. SMS Terms & Conditions
              </h2>

              <p className="mb-4">
                By opting in to receive SMS communications from Jaswisys, you
                consent to receive conversational text messages related to
                customer support and job interviews.
              </p>

              <ul className="list-disc pl-6 space-y-3">
                <li>Message frequency may vary.</li>

                <li>
                  Message and data rates may apply depending on your carrier.
                </li>

                <li>
                  Consent to receive SMS messages is not a condition of
                  purchase.
                </li>

                <li>
                  Supported carriers are not liable for delayed or undelivered
                  messages.
                </li>
              </ul>

              <div className="mt-6">
                <h3 className="text-xl font-semibold text-white mb-3">
                  Opt-Out & Help
                </h3>

                <ul className="list-disc pl-6 space-y-3">
                  <li>
                    Reply STOP to any message to opt out at any time.
                  </li>

                  <li>
                    Reply HELP for assistance or contact us through our website.
                  </li>
                </ul>

                <p className="mt-4">
                  No mobile information will be shared with third parties or
                  affiliates. SMS opt-in data and consent information will not
                  be shared with any third parties.
                </p>
              </div>
            </div>

            {/* Section 7 */}
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">
                7. Privacy Policy
              </h2>

              <p>
                Your use of this website is also governed by our Privacy
                Policy, which describes how we collect, use, and protect your
                information.
              </p>
            </div>

            {/* Section 8 */}
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">
                8. Changes to Terms
              </h2>

              <p>
                We reserve the right to modify these Terms & Conditions at any
                time. Updated versions will be posted on this page with a
                revised effective date.
              </p>
            </div>

            {/* Section 9 */}
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">
                9. Governing Law
              </h2>

              <p>
                These Terms & Conditions shall be governed by and interpreted
                in accordance with the laws of the USA, without regard to
                conflict of law principles.
              </p>
            </div>

            {/* Section 10 */}
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">
                10. Contact Information
              </h2>

              <p className="mb-4">
                If you have any questions regarding these Terms & Conditions,
                please contact us:
              </p>

              <div className="space-y-3">
                <p className="text-lg">
                  <span className="font-semibold text-white">
                    Email:
                  </span>{" "}

                  <a
                    href="mailto:info@jaswisys.com"
                    className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text font-semibold hover:opacity-80 transition"
                  >
                    info@jaswisys.com
                  </a>
                </p>

                <p className="text-lg">
                  <span className="font-semibold text-white">
                    Website:
                  </span>{" "}

                  <a
                    href="https://www.jaswisys.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text font-semibold hover:opacity-80 transition"
                  >
                    www.jaswisys.com
                  </a>
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default TermsOfService;