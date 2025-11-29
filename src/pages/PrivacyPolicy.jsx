import {Container} from '../components';

const PrivacyPolicy = () => {
  return (
    <Container>
      <div className="py-12 md:py-20">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Privacy Policy
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your privacy matters to us. Here's how we protect and handle your information.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Last Updated: November 15, 2025
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              Unhide Nepal ("we," "us," "our," or "Company") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
              when you visit our website and use our platform.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">1. Information We Collect</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Personal Information</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  We collect information you voluntarily provide when you:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Create an account (name, email, phone number)</li>
                  <li>Add or update a listing (location details, photos, descriptions)</li>
                  <li>Leave reviews or ratings</li>
                  <li>Contact us through forms or email</li>
                  <li>Update your profile information</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Location Information</h3>
                <p className="text-gray-700 leading-relaxed">
                  When you add places to Unhide Nepal, we collect location data (coordinates, addresses, 
                  descriptions) that you provide. This information is used to display places on our map 
                  and help other travelers discover them.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Usage Information</h3>
                <p className="text-gray-700 leading-relaxed">
                  We automatically collect information about how you interact with our platform:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mt-2">
                  <li>Pages visited and time spent</li>
                  <li>Links clicked</li>
                  <li>Search queries</li>
                  <li>Device type and browser information</li>
                  <li>IP address and approximate location</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Cookies and Tracking</h3>
                <p className="text-gray-700 leading-relaxed">
                  We use cookies and similar technologies to enhance your experience, remember preferences, 
                  and understand how you use our platform.
                </p>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">2. How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use the information we collect for various purposes:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-3">
              <li>To provide, maintain, and improve our services</li>
              <li>To create and manage your account</li>
              <li>To display your listings and reviews on our platform</li>
              <li>To send you updates, notifications, and communications (with your consent)</li>
              <li>To respond to your inquiries and support requests</li>
              <li>To analyze usage patterns and improve user experience</li>
              <li>To detect and prevent fraud or misuse of our platform</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          {/* How We Share Information */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">3. How We Share Your Information</h2>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                We do not sell or rent your personal information to third parties. However, we may share 
                your information in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-3">
                <li><strong>Public Information:</strong> Content you add (listings, reviews, photos) is publicly visible on our platform</li>
                <li><strong>Service Providers:</strong> We may share information with vendors who help us operate our platform (hosting, analytics, etc.)</li>
                <li><strong>Legal Requirements:</strong> We may disclose information when required by law or to protect our rights</li>
                <li><strong>User Consent:</strong> We may share information with your explicit permission</li>
              </ul>
            </div>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">4. Data Security</h2>
            <p className="text-gray-700 leading-relaxed">
              We implement appropriate technical and organizational security measures to protect your 
              personal information against unauthorized access, alteration, disclosure, or destruction. 
              This includes encryption, secure servers, and access controls. However, no method of 
              transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          {/* User Rights */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">5. Your Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-3">
              <li>Access the personal information we hold about you</li>
              <li>Request corrections to inaccurate information</li>
              <li>Request deletion of your account and associated data</li>
              <li>Opt-out of promotional emails and notifications</li>
              <li>Export your data in a portable format</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              To exercise these rights, please contact us at the email address provided below.
            </p>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">6. Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              Unhide Nepal is not intended for users under the age of 13. We do not knowingly collect 
              personal information from children under 13. If we become aware that a child under 13 has 
              provided us with personal information, we will delete such information and terminate the 
              child's account. If you believe a child has provided us with their information, please 
              contact us immediately.
            </p>
          </section>

          {/* Third-Party Links */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">7. Third-Party Links</h2>
            <p className="text-gray-700 leading-relaxed">
              Our platform may contain links to third-party websites and services that are not operated 
              by us. This Privacy Policy does not apply to third-party websites, and we are not responsible 
              for their privacy practices. We encourage you to review the privacy policies of any third-party 
              services before providing your information.
            </p>
          </section>

          {/* Changes to Privacy Policy */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">8. Changes to This Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time to reflect changes in our practices, 
              technology, or legal requirements. When we make material changes, we will notify you by 
              updating the "Last Updated" date at the top of this policy. Your continued use of Unhide 
              Nepal after any changes constitutes your acceptance of the updated Privacy Policy.
            </p>
          </section>

          {/* Contact Us */}
          <section className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 md:p-12 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">9. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our 
              privacy practices, please don't hesitate to contact us:
            </p>
            <div className="space-y-3 text-gray-700">
              <p>
                <span className="font-semibold">Email:</span> rishirijal2025@gmail.com
              </p>
              <p>
                <span className="font-semibold">GitHub:</span>{' '}
                <a 
                  href="https://github.com/Rishi-Rijal" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cyan-600 hover:text-cyan-700 underline"
                >
                  github.com/Rishi-Rijal
                </a>
              </p>
              <p>
                <span className="font-semibold">Response Time:</span> We aim to respond to all inquiries 
                within 7 business days.
              </p>
            </div>
          </section>

          {/* Closing */}
          <div className="text-center mt-12 pt-8 border-t border-gray-200">
            <p className="text-gray-600 italic">
              Thank you for trusting Unhide Nepal with your information. Your privacy is important to us.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PrivacyPolicy;
