'use client'

import React from 'react'
import Link from 'next/link'

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-gray-800 text-white py-4">
        <div className="max-w-7xl mx-auto px-4">
          <Link href="/" className="text-white hover:text-gray-300">
            ← Back to Home
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-sm text-gray-600 mb-8">Last updated October 25, 2024</p>
        
        <div className="space-y-8 text-gray-600">
          <section>
            <p>
              This Privacy Notice for Poppa.AI LLC (doing business as Poppa.AI) ("we," "us," or "our"), describes how and why we might access, collect, store, use, and/or share ("process") your personal information when you use our services ("Services"), including when you:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Visit our website at http://www.poppa.ai, or any website of ours that links to this Privacy Notice</li>
              <li>Download and use our mobile application (Poppa.AI), our Facebook application (Poppa.AI), or any other application of ours that links to this Privacy Notice</li>
              <li>Engage with us in other related ways, including any sales, marketing, or events</li>
            </ul>
            <p className="mt-2">
              Questions or concerns? Reading this Privacy Notice will help you understand your privacy rights and choices. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at info@poppa.ai.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Summary of Key Points</h2>
            <ul className="list-disc pl-6 mt-2">
              <li>We collect personal information that you provide to us.</li>
              <li>We process your information for purposes based on legitimate business interests, the fulfillment of our contract with you, compliance with our legal obligations, and/or your consent.</li>
              <li>We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.</li>
              <li>We may use cookies and other tracking technologies to collect and store your information.</li>
              <li>We offer AI-based products and features that process your information.</li>
              <li>You can withdraw your consent at any time.</li>
              <li>You may have specific rights regarding your personal information depending on your location.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. What Information Do We Collect?</h2>
            <h3 className="text-xl font-semibold mt-4 mb-2">Personal information you disclose to us</h3>
            <p>
              In Short: We collect personal information that you provide to us.
            </p>
            <p className="mt-2">
              We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.
            </p>
            <p className="mt-2">
              Personal Information Provided by You. The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include names, phone numbers, email addresses, usernames, passwords, contact preferences, contact or authentication data, billing addresses, debit/credit card numbers, and medications.
            </p>
            <p className="mt-2">
              Sensitive Information. When necessary, with your consent or as otherwise permitted by applicable law, we process health data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How Do We Process Your Information?</h2>
            <p>
              In Short: We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law.
            </p>
            <p className="mt-2">
              We process your personal information for a variety of reasons, depending on how you interact with our Services, including:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>To facilitate account creation and authentication and otherwise manage user accounts.</li>
              <li>To deliver and facilitate delivery of services to the user.</li>
              <li>To respond to user inquiries/offer support to users.</li>
              <li>To enable user-to-user communications.</li>
              <li>To request feedback.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. When and With Whom Do We Share Your Personal Information?</h2>
            <p>
              In Short: We may share information in specific situations described in this section and/or with the following third parties.
            </p>
            <p className="mt-2">
              We may need to share your personal information in the following situations:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Business Transfers. We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Do We Use Cookies and Other Tracking Technologies?</h2>
            <p>
              In Short: We may use cookies and other tracking technologies to collect and store your information.
            </p>
            <p className="mt-2">
              We may use cookies and similar tracking technologies (like web beacons and pixels) to gather information when you interact with our Services. For more information, please see our Cookie Notice: http://www.poppa.ai/cookies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Do We Offer Artificial Intelligence-Based Products?</h2>
            <p>
              In Short: We offer products, features, or tools powered by artificial intelligence, machine learning, or similar technologies.
            </p>
            <p className="mt-2">
              As part of our Services, we offer AI Products designed to enhance your experience and provide innovative solutions. These products are provided through third-party service providers, including OpenAI.
            </p>
          </section>

          {/* Add sections 6-14 here, following the same structure */}

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">15. How Can You Review, Update, or Delete the Data We Collect From You?</h2>
            <p>
              Based on the applicable laws of your country or state of residence in the US, you may have the right to request access to the personal information we collect from you, details about how we have processed it, correct inaccuracies, or delete your personal information. You may also have the right to withdraw your consent to our processing of your personal information. These rights may be limited in some circumstances by applicable law.
            </p>
            <p className="mt-2">
              To request to review, update, or delete your personal information, please visit: <a href="http://www.poppa.ai/users" className="text-blue-600 hover:underline">http://www.poppa.ai/users</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
