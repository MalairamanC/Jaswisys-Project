import privacyVideo from "../assets/PrivacyPolicy.mp4";

function PrivacyPolicy({ setPage }) {
  return (
    <div className="relative min-h-screen overflow-hidden text-white">

      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={privacyVideo}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/80"></div>

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

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold mb-10 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            DATA PRIVACY AND CONFIDENTIALITY POLICY
          </h1>

          <div className="space-y-10 text-gray-300 leading-8">

            {/* Section 1 */}
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">
                1. Purpose and Objective
              </h2>

              <p>
                Jaswisys Technologies ("Jaswisys Technologies") is committed to
                protecting the confidentiality, integrity, and availability of
                all data in its possession or control. This policy outlines the
                framework for securing personal, confidential, and proprietary
                information in accordance with applicable data protection
                regulations and industry best practices.
              </p>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">
                2. Scope
              </h2>

              <p>
                This policy applies to all employees, interns, contractors,
                consultants, vendors, and third-party partners who process,
                access, transmit, or manage data owned by or entrusted to
                Jaswisys. It covers all forms of data including electronic,
                paper-based, and verbal information and all systems used for
                data processing.
              </p>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">
                3. Definitions
              </h2>

              <div className="space-y-4">
                <p>
                  <span className="font-semibold text-white">
                    Personal Data:
                  </span>{" "}
                  Any information related to an identified or identifiable
                  individual.
                </p>

                <p>
                  <span className="font-semibold text-white">
                    Confidential Information:
                  </span>{" "}
                  Proprietary or sensitive business data including client
                  information, financial records, IP, trade secrets, source
                  code, and internal strategies.
                </p>

                <p>
                  <span className="font-semibold text-white">
                    Sensitive Personal Data:
                  </span>{" "}
                  Includes health data, biometric identifiers, financial
                  credentials, etc.
                </p>

                <p>
                  <span className="font-semibold text-white">
                    Processing:
                  </span>{" "}
                  Any action performed on data such as collection, storage,
                  analysis, transfer, or deletion.
                </p>

                <p>
                  <span className="font-semibold text-white">
                    Data Subject:
                  </span>{" "}
                  An individual whose personal data is being processed.
                </p>
              </div>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">
                4. Data Collection and Use
              </h2>

              <p>
                Jaswisys collects data solely for legitimate business, legal,
                or operational needs, ensuring that all data collection
                practices are lawful, fair, and transparent.
              </p>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">
                5. Data Access and Role-Based Confidentiality
              </h2>

              <p>
                Access to data is strictly limited based on operational roles
                and responsibilities. Employees must not access, use, or share
                data beyond their authorized scope.
              </p>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">
                6. Data Security Measures
              </h2>

              <ul className="list-disc pl-6 space-y-3">
                <li>Encryption of sensitive data at rest and in transit.</li>
                <li>Multi-factor authentication and strong password policies.</li>
                <li>Role-based access management and access reviews.</li>
                <li>Firewalls, anti-malware, and IDS/IPS systems.</li>
                <li>Restricted physical access and surveillance.</li>
                <li>Regular backups and disaster recovery plans.</li>
                <li>Audit trails for monitoring access and modifications.</li>
              </ul>
            </div>

            {/* Section 7 */}
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">
                7. Customer Data Security & Privacy
              </h2>

              <ul className="list-disc pl-6 space-y-3">
                <li>Strict confidentiality of customer data.</li>
                <li>Customer data remains customer property.</li>
                <li>Industry-standard security measures are implemented.</li>
                <li>Only authorized personnel can access data.</li>
                <li>Data retained only as legally required.</li>
                <li>Compliance with all privacy regulations.</li>
              </ul>
            </div>

            {/* Section 8 */}
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">
                8. Data Retention and Disposal
              </h2>

              <p>
                Data is retained only as long as necessary and securely deleted
                or destroyed once no longer required.
              </p>
            </div>

            {/* Section 9 */}
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">
                9. Data Transfer and Sharing
              </h2>

              <p>
                Data sharing occurs only on a need-to-know basis and under
                approved protection agreements.
              </p>
            </div>

            {/* Section 10 */}
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">
                10. Breach Notification and Incident Response
              </h2>

              <p>
                Jaswisys activates its Data Breach Response Plan immediately
                upon detecting any breach or incident.
              </p>
            </div>

            {/* Section 11 */}
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">
                11. Employee Responsibilities and Training
              </h2>

              <p>
                Employees must complete mandatory data security training and
                report suspicious activities immediately.
              </p>
            </div>

            {/* Section 12 */}
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">
                12. Vendor and Third-Party Management
              </h2>

              <p>
                All third-party vendors must meet Jaswisys security standards
                and sign Data Processing Agreements.
              </p>
            </div>

            {/* Section 13 */}
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">
                13. Monitoring and Audit
              </h2>

              <p>
                Regular audits are conducted to ensure compliance with this
                policy and applicable regulations.
              </p>
            </div>

            {/* Section 14 */}
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">
                14. Policy Violations and Disciplinary Action
              </h2>

              <p>
                Violations may result in disciplinary action including
                termination and legal consequences.
              </p>
            </div>

            {/* Section 15 */}
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">
                15. Contact Information and Further Assistance
              </h2>

              <p>
                For questions regarding this policy, contact:
              </p>

              <p className="mt-3 text-blue-400 font-semibold">
                info@jaswisys.com
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;