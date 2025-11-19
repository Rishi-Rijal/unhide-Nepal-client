import Container from '../Components/Container/Container';
import { useState } from 'react';

const TermsOfService = () => {
  const [showConsent, setShowConsent] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(
    localStorage.getItem('termsAgreed') === 'true'
  );

  const handleAgree = () => {
    localStorage.setItem('termsAgreed', 'true');
    setAgreedToTerms(true);
    setShowConsent(false);
  };

  const handleDisagree = () => {
    localStorage.removeItem('termsAgreed');
    setAgreedToTerms(false);
    setShowConsent(false);
  };

  return (
    <Container>
      <div className="py-12 md:py-20">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Terms of Service
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Please read these terms carefully before using Unhide Nepal.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Last Updated: November 15, 2025
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              Welcome to Unhide Nepal. These Terms of Service ("Terms") govern your access to and use 
              of our website, mobile application, and services (collectively, the "Platform"). By accessing 
              or using Unhide Nepal, you agree to be bound by these Terms. If you do not agree to any part 
              of these Terms, you may not use our Platform.
            </p>
          </section>

          {/* User Accounts */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">2. User Accounts</h2>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                To use certain features of Unhide Nepal, you may need to create an account. You agree to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Provide accurate, complete, and current information during registration</li>
                <li>Maintain the confidentiality of your password and account credentials</li>
                <li>Take responsibility for all activities that occur under your account</li>
                <li>Notify us immediately of any unauthorized access or use of your account</li>
                <li>Be at least 13 years old to create an account (18 or older in some jurisdictions)</li>
              </ul>
            </div>
          </section>

          {/* User Conduct */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">3. User Conduct and Prohibited Activities</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You agree not to engage in any of the following activities:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Violating any applicable laws, regulations, or third-party rights</li>
              <li>Uploading false, misleading, or defamatory content</li>
              <li>Harassing, threatening, or abusing other users</li>
              <li>Spamming or posting promotional content without authorization</li>
              <li>Attempting to hack, disrupt, or damage the Platform</li>
              <li>Scraping or automatically collecting data from the Platform</li>
              <li>Impersonating another person or organization</li>
              <li>Uploading content that infringes intellectual property rights</li>
              <li>Engaging in any form of fraud or deception</li>
            </ul>
          </section>

          {/* Content Rights */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">4. User-Generated Content</h2>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                When you submit listings, photos, reviews, or other content to Unhide Nepal, you retain 
                ownership of that content. By submitting content to our Platform, you grant us a 
                non-exclusive, worldwide, royalty-free license to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Display, reproduce, and distribute your content on our Platform</li>
                <li>Use your content for marketing and promotional purposes</li>
                <li>Create derivative works based on your content</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                You represent and warrant that you own or have the necessary rights to all content you submit, 
                and that your content does not infringe any third-party rights.
              </p>
            </div>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">5. Intellectual Property Rights</h2>
            <p className="text-gray-700 leading-relaxed">
              The Platform and its content (including text, graphics, logos, images, software, and code) are 
              owned by Unhide Nepal or our licensors and are protected by copyright, trademark, and other 
              intellectual property laws. You may not reproduce, distribute, modify, or transmit any content 
              without our prior written permission. Unauthorized use of our intellectual property may result 
              in legal action.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">6. Disclaimer of Warranties</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              The Platform is provided "as is" and "as available" without any warranties of any kind, either 
              express or implied. We do not warrant that:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>The Platform will be uninterrupted or error-free</li>
              <li>Any defects will be corrected</li>
              <li>The Platform is free of viruses or harmful components</li>
              <li>All user-submitted information is accurate or current</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              We are not responsible for the accuracy, completeness, or reliability of any content posted 
              by users or third parties.
            </p>
          </section>

          {/* Limitation of Damages */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">7. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              To the maximum extent permitted by law, Unhide Nepal shall not be liable for any indirect, 
              incidental, special, consequential, or punitive damages arising out of or in connection with 
              your use of the Platform, even if we have been advised of the possibility of such damages. 
              Our total liability to you shall not exceed the amount you have paid to us, if any, in the 
              twelve months preceding the claim.
            </p>
          </section>

          {/* Third-Party Links */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">8. Third-Party Links and Services</h2>
            <p className="text-gray-700 leading-relaxed">
              Unhide Nepal may contain links to third-party websites and services. We do not endorse and are 
              not responsible for the content, accuracy, or practices of these external sites. Your use of 
              third-party services is governed by their own terms and policies. We are not liable for any 
              damages or losses arising from your use of third-party services.
            </p>
          </section>

          {/* Indemnification */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">9. Indemnification</h2>
            <p className="text-gray-700 leading-relaxed">
              You agree to indemnify and hold harmless Unhide Nepal, its founders, employees, and agents 
              from any claims, damages, or costs (including attorney fees) arising from your violation of 
              these Terms, your use of the Platform, or your content that infringes third-party rights.
            </p>
          </section>

          {/* Account Termination */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">10. Suspension and Termination</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We reserve the right to suspend or terminate your account at any time for:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Violating these Terms or any applicable laws</li>
              <li>Posting offensive, harmful, or misleading content</li>
              <li>Engaging in fraudulent or malicious activities</li>
              <li>Repeated violations of our policies</li>
              <li>Inactivity for an extended period</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              Upon termination, your right to use the Platform ceases immediately, though certain provisions 
              of these Terms will survive.
            </p>
          </section>

          {/* Modifications */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">11. Modifications to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We may modify these Terms at any time. Changes will be effective immediately upon posting. 
              Your continued use of the Platform after any modifications indicates your acceptance of the 
              updated Terms. We encourage you to review these Terms regularly to stay informed of any changes.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">12. Governing Law and Jurisdiction</h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms are governed by the laws of Nepal, without regard to its conflict of law principles. 
              Any disputes arising from these Terms or your use of the Platform shall be subject to the 
              exclusive jurisdiction of the courts located in Nepal.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 md:p-12 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">13. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              If you have any questions about these Terms, please contact us:
            </p>
            <div className="space-y-3 text-gray-700">
              <p>
                <span className="font-semibold">Email:</span> terms@unhidenepal.com
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

          {/* Consent Section */}
          <section className="mt-12 p-8 md:p-12 border-2 border-cyan-200 rounded-lg bg-cyan-50">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Your Consent</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              By using Unhide Nepal, you acknowledge that you have read, understood, and agree to be bound 
              by these Terms of Service.
            </p>
            
            <div className="space-y-4">
              {agreedToTerms ? (
                <div className="p-4 bg-green-100 border border-green-400 rounded-lg">
                  <p className="text-green-800 font-semibold flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    ✓ You have accepted the Terms of Service
                  </p>
                  <p className="text-green-700 text-sm mt-2">
                    You can withdraw your consent at any time by clicking the "Withdraw Consent" button below.
                  </p>
                </div>
              ) : (
                <div className="p-4 bg-yellow-100 border border-yellow-400 rounded-lg">
                  <p className="text-yellow-800 font-semibold">
                    ⚠ You have not accepted the Terms of Service
                  </p>
                  <p className="text-yellow-700 text-sm mt-2">
                    To use Unhide Nepal fully, please accept the Terms of Service.
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                {agreedToTerms ? (
                  <button
                    onClick={() => setShowConsent(true)}
                    className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-semibold"
                  >
                    Withdraw Consent
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleAgree}
                      className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-semibold"
                    >
                      I Agree to Terms
                    </button>
                    <button
                      onClick={() => setShowConsent(true)}
                      className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition font-semibold"
                    >
                      View Consent Options
                    </button>
                  </>
                )}
              </div>
            </div>
          </section>

          {/* Closing */}
          <div className="text-center mt-12 pt-8 border-t border-gray-200">
            <p className="text-gray-600 italic">
              Thank you for being part of the Unhide Nepal community. Together, we're making Nepal more visible to the world.
            </p>
          </div>
        </div>
      </div>

      {/* Consent Modal */}
      {showConsent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-8 shadow-2xl">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Terms Consent</h3>
            
            {agreedToTerms ? (
              <>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Are you sure you want to withdraw your consent to the Terms of Service? 
                  This action may limit your access to certain features.
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={handleDisagree}
                    className="flex-1 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-semibold"
                  >
                    Yes, Withdraw
                  </button>
                  <button
                    onClick={() => setShowConsent(false)}
                    className="flex-1 px-4 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="agreeTerms"
                      defaultChecked
                      className="mt-1 w-4 h-4 rounded border-gray-300"
                    />
                    <label htmlFor="agreeTerms" className="text-gray-700 leading-relaxed">
                      I have read and agree to the Terms of Service
                    </label>
                  </div>
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="understandResponsibility"
                      defaultChecked
                      className="mt-1 w-4 h-4 rounded border-gray-300"
                    />
                    <label htmlFor="understandResponsibility" className="text-gray-700 leading-relaxed">
                      I understand my responsibilities as a user
                    </label>
                  </div>
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="acknowledgeRisks"
                      defaultChecked
                      className="mt-1 w-4 h-4 rounded border-gray-300"
                    />
                    <label htmlFor="acknowledgeRisks" className="text-gray-700 leading-relaxed">
                      I acknowledge the disclaimer and limitations of liability
                    </label>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={handleAgree}
                    className="flex-1 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-semibold"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => setShowConsent(false)}
                    className="flex-1 px-4 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition font-semibold"
                  >
                    Decline
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </Container>
  );
};

export default TermsOfService;
