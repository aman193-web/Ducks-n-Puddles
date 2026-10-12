/* =============================================================================
   THE LEGAL COPY — Terms of Service and Privacy Policy, exactly as the client
   supplied them (Untitled document, October 2026).

   THIS FILE IS DATA, NOT PROSE WRITTEN HERE. Every string below was parsed out
   of the client's document rather than retyped, because a transcription slip
   in legal copy is a different class of mistake from a typo in a headline. The
   only edits are typographic: straight apostrophes and quotes raised to curly
   ones, to match the rest of the site.

   The shape is three block kinds — a paragraph, a sub-heading, a list — which
   is everything the two documents actually use. <LegalPage> renders them.

   ⚠️ TODO(client): both documents give the email address as a placeholder,
   "[Add official support email]" / "[Add official privacy or support email]".
   Until one arrives, <LegalPage> shows brand.email, which is still the
   personal Gmail that content/brand.ts has had a TODO against since September.
   Replace `contact.email` below the day the real address exists.
   ========================================================================== */

/** A paragraph, a bold sub-heading, or a bulleted list. */
export type Block = { p: string } | { h: string } | { ul: string[] }

export type LegalSection = {
  /** As numbered in the client's document — the contents list uses it. */
  n: string
  title: string
  body: Block[]
}

export type LegalDoc = {
  slug: 'terms' | 'privacy'
  eyebrow: string
  title: string
  /** "October 8, 2026" — the client's own Last Updated line. */
  updated: string
  /** The document's opening line, set as the page lede. */
  lede: string
  /** What follows the lede, above the numbered sections. */
  intro: Block[]
  sections: LegalSection[]
  /** The address block lifted out of the final section and set as a card. */
  contact: { name: string; place: string; email: string }
  /** The sign-off, where the document has one. */
  tagline?: string
}

/* Paragraphs carry **bold** runs in a couple of places (the character names in
   Terms §4). <Rich> in LegalPage splits on the markers. */

export const terms: LegalDoc = {
  slug: 'terms',
  eyebrow: 'Terms',
  title: 'Terms of Service',
  updated: 'October 8, 2026',
  lede: 'Welcome to Ducks ’n Puddles! We’re so happy you’re here.',
  intro: [
    { p: 'These Terms of Service (“Terms”) govern your use of the Ducks ’n Puddles website, including its content, products, features, and related services.' },
    { p: 'By accessing or using our website, you agree to comply with these Terms. If you do not agree, please discontinue use of the website.' },
  ],
  sections: [
    {
      n: '1',
      title: 'About Ducks ’n Puddles',
      body: [
        { p: 'Ducks ’n Puddles is a family-focused children’s lifestyle brand founded by Larisa and Vinny in South Florida. Our products, characters, stories, and experiences are thoughtfully created to bring comfort, connection, confidence, and joy to everyday childhood adventures.' },
        { p: 'Our mission is to create products that combine practical functionality for parents with positive experiences and meaningful messages for children.' },
        { p: 'As our brand grows, we may introduce additional products, memberships, educational content, community initiatives, and other experiences.' },
      ],
    },
    {
      n: '2',
      title: 'Age and Eligibility',
      body: [
        { p: 'Although Ducks ’n Puddles creates products and experiences for children and families, purchases, account registrations, subscriptions, and other transactions through our website are intended for adults who are legally able to enter into binding agreements.' },
        { p: 'Parents and guardians are responsible for supervising their children’s interactions with our website.' },
        { p: 'We encourage families to enjoy Ducks ’n Puddles together while ensuring that all purchases, registrations, and communications are managed by an appropriate adult.' },
      ],
    },
    {
      n: '3',
      title: 'Use of Our Website',
      body: [
        { p: 'You agree to use our website responsibly, lawfully, and in a manner that respects Ducks ’n Puddles and other visitors.' },
        { p: 'You may not:' },
        { ul: [
            'Violate applicable laws or regulations.',
            'Interfere with the operation, functionality, or security of our website.',
            'Attempt to gain unauthorized access to our systems, accounts, or information.',
            'Introduce malicious software or engage in activities that could damage our website.',
            'Copy, reproduce, modify, distribute, or commercially exploit protected website content without permission.',
            'Misrepresent your identity or provide fraudulent information.',
            'Misuse our name, characters, logos, images, or other intellectual property.',
            'Use our website for unauthorized commercial activities.',
        ] },
        { p: 'We reserve the right to restrict or discontinue access to our website when reasonably necessary to protect our business, visitors, or services.' },
      ],
    },
    {
      n: '4',
      title: 'Intellectual Property and Website Content',
      body: [
        { p: 'All original Ducks ’n Puddles content, including our name, logos, characters, illustrations, artwork, product designs, stories, written materials, photographs, graphics, and other creative elements, is owned by or licensed to Ducks ’n Puddles and protected by applicable intellectual property laws.' },
        { p: 'This includes our original characters, **Chi Chi, Vincey, and Goosey**, along with their associated designs, personalities, stories, and creative representations.' },
        { p: 'You may access and view our website for personal, non-commercial purposes.' },
        { p: 'Without our prior written permission, you may not:' },
        { ul: [
            'Reproduce, distribute, sell, or commercially exploit our original content.',
            'Use our characters, illustrations, or designs to create unauthorized merchandise or derivative works.',
            'Copy or imitate our branding, logos, product artwork, or other protected materials in a manner that infringes our rights.',
            'Use our intellectual property in advertising, promotions, or commercial projects without authorization.',
        ] },
        { p: 'Nothing in these Terms grants ownership of or a license to our intellectual property beyond the limited permission to use our website as described above.' },
        { p: 'Nothing in this section restricts uses permitted by applicable intellectual property law.' },
      ],
    },
    {
      n: '5',
      title: 'Products, Descriptions, and Availability',
      body: [
        { p: 'We make reasonable efforts to provide accurate and helpful information about our products, including their features, materials, specifications, pricing, availability, and intended uses.' },
        { p: 'However, product information may occasionally contain errors, inaccuracies, or omissions.' },
        { p: 'We reserve the right to update or correct product descriptions, specifications, pricing, and availability when necessary, subject to applicable law.' },
        { p: 'Product colors, appearance, and design details may vary slightly from images displayed on our website due to photography, screen settings, manufacturing variations, or product updates.' },
        { p: 'Certain products may be available in limited quantities or may be discontinued without prior notice.' },
        { p: 'We encourage customers to review product descriptions, care instructions, age recommendations, and safety information before purchasing or using our products.' },
      ],
    },
    {
      n: '6',
      title: 'Orders, Payments, and Pricing',
      body: [
        { p: 'When purchasing products through Ducks ’n Puddles, you agree to provide accurate, complete, and current information necessary to process your order.' },
        { p: 'All prices are displayed in U.S. dollars unless otherwise indicated.' },
        { p: 'Applicable taxes, shipping fees, and additional charges will be disclosed during checkout before you complete your purchase.' },
        { p: 'Payments are processed through third-party payment providers. By submitting payment information, you authorize the applicable payment provider to process your transaction.' },
        { p: 'An automated order confirmation acknowledges receipt of your order but does not necessarily constitute final acceptance.' },
        { p: 'We reserve the right to decline, limit, or cancel orders for legitimate reasons, including:' },
        { ul: [
            'Product unavailability.',
            'Pricing or listing errors.',
            'Suspected fraudulent or unauthorized transactions.',
            'Inaccurate or incomplete order information.',
            'Other circumstances that reasonably prevent us from fulfilling an order.',
        ] },
        { p: 'If an order is canceled after payment has been collected, we will issue any refund due in accordance with applicable law and our refund policies.' },
        { p: 'We will make reasonable efforts to notify customers when an order is canceled or requires additional information.' },
      ],
    },
    {
      n: '7',
      title: 'Shipping, Returns, and Refunds',
      body: [
        { p: 'Shipping timelines, delivery estimates, returns, exchanges, and refunds are governed by our applicable Shipping Policy and Return & Refund Policy, which will be made available on our website when purchasing becomes available.' },
        { p: 'Delivery estimates are provided for informational purposes and may be affected by shipping carriers, product availability, weather conditions, or circumstances outside our reasonable control.' },
        { p: 'We will make reasonable efforts to communicate significant fulfillment delays and address customer concerns appropriately.' },
        { p: 'Nothing in these Terms limits any rights or remedies customers may have under applicable consumer protection laws.' },
        { p: 'Customers are encouraged to review our shipping and return policies before completing a purchase.' },
      ],
    },
    {
      n: '8',
      title: 'Future Products, Preorders, and Initiatives',
      body: [
        { p: 'Ducks ’n Puddles is a growing brand, and certain products, collections, stories, services, memberships, and initiatives described on our website may still be in development.' },
        { p: 'Information regarding future products, projected launch dates, upcoming collections, or planned initiatives is provided for general informational purposes and does not guarantee that a particular offering will become available.' },
        { h: 'Preorders' },
        { p: 'From time to time, Ducks ’n Puddles may offer products for preorder before they are ready for immediate shipment.' },
        { p: 'If preorders are offered, we will provide relevant information regarding estimated availability, payment requirements, shipping expectations, and applicable cancellation or refund terms before purchase.' },
        { p: 'Estimated shipment dates may change due to manufacturing, quality assurance, testing, supply chain, or other operational circumstances.' },
        { p: 'If delays occur, we will communicate with affected customers and provide applicable options in accordance with our policies and legal obligations.' },
        { h: 'Crowdfunding and Special Campaigns' },
        { p: 'We may occasionally participate in crowdfunding campaigns or special product launches through third-party platforms.' },
        { p: 'Such campaigns may be subject to additional terms, conditions, timelines, and policies established by the applicable platform.' },
        { p: 'Customers and supporters should review those terms before participating.' },
      ],
    },
    {
      n: '9',
      title: 'User Submissions and Feedback',
      body: [
        { p: 'We love hearing from our community and welcome feedback, suggestions, ideas, stories, and constructive criticism.' },
        { p: 'Whether you’re sharing something you love, an idea for the future, or something you believe we can improve, we value your perspective.' },
        { p: 'By voluntarily submitting feedback or suggestions to Ducks ’n Puddles, you grant us a nonexclusive, royalty-free, worldwide permission to use that feedback for the purpose of evaluating, improving, developing, and promoting our products, services, and customer experience.' },
        { p: 'This permission does not transfer ownership of your original creative work to Ducks ’n Puddles.' },
        { p: 'Please do not submit confidential, proprietary, or sensitive information without a separate written agreement.' },
        { p: 'Customer photographs, testimonials, artwork, stories, or other creative submissions intended for public use may be subject to additional permissions or agreements.' },
        { p: 'We reserve the right to decline or remove submissions that violate applicable laws, infringe intellectual property rights, or are otherwise inappropriate.' },
      ],
    },
    {
      n: '10',
      title: 'Duck Squad Communications',
      body: [
        { p: 'The Duck Squad is part of our growing Ducks ’n Puddles community.' },
        { p: 'By joining the Duck Squad, you may receive communications necessary to administer your membership or provide services you have requested.' },
        { p: 'You may also choose to receive newsletters, product announcements, special offers, stories, and other promotional communications from Ducks ’n Puddles.' },
        { p: 'Where required by applicable law, we will obtain your consent before sending marketing communications.' },
        { p: 'You can unsubscribe from promotional emails at any time using the unsubscribe link included in our emails or by contacting us directly.' },
        { p: 'Unsubscribing from marketing communications will not prevent you from receiving essential messages relating to orders, accounts, memberships, or customer service.' },
        { p: 'For more information about how we collect and use personal information, please review our Privacy Policy.' },
      ],
    },
    {
      n: '11',
      title: 'Memberships and Subscriptions',
      body: [
        { p: 'Ducks ’n Puddles may introduce optional memberships, subscription services, recurring product deliveries, exclusive merchandise, or other Duck Squad benefits in the future.' },
        { p: 'If these offerings become available, they may be subject to additional terms describing:' },
        { ul: [
            'Membership or subscription pricing.',
            'Billing frequency and payment authorization.',
            'Automatic renewal, if applicable.',
            'Cancellation procedures and deadlines.',
            'Membership benefits and eligibility.',
            'Shipping or fulfillment arrangements.',
            'Changes to subscription offerings.',
        ] },
        { p: 'Any applicable recurring billing terms, renewal conditions, and cancellation requirements will be disclosed before enrollment.' },
        { p: 'Customers will be provided with cancellation options and other protections required by applicable law.' },
        { p: 'Participation in future subscription programs will be optional.' },
      ],
    },
    {
      n: '12',
      title: 'Third-Party Links and Services',
      body: [
        { p: 'Our website may contain links to third-party websites, social media platforms, payment processors, shipping providers, or other services operated independently of Ducks ’n Puddles.' },
        { p: 'These links are provided for convenience or to support certain website features and services.' },
        { p: 'We do not control the content, security, policies, or practices of third-party websites.' },
        { p: 'Your use of third-party services may be subject to their own terms and privacy policies.' },
        { p: 'We encourage visitors to review those policies before interacting with external websites or providing personal information.' },
      ],
    },
    {
      n: '13',
      title: 'Website Disclaimer',
      body: [
        { p: 'We make reasonable efforts to ensure that the information provided on our website is accurate, current, and helpful.' },
        { p: 'However, our website and its content are provided on an “as is” and “as available” basis, to the extent permitted by applicable law.' },
        { p: 'We do not guarantee that our website will always be uninterrupted, error-free, secure, or free from technical difficulties.' },
        { p: 'Information on our website may be updated, modified, or removed as our products, services, and business evolve.' },
        { h: 'Product Safety and Use' },
        { p: 'Our products should be used in accordance with their accompanying instructions, age recommendations, care guidelines, and safety warnings.' },
        { p: 'Parents and guardians should provide appropriate supervision based on the child’s age, developmental abilities, and the nature of the product.' },
        { p: 'Nothing in these Terms replaces product-specific safety information or limits any legal rights relating to product safety, product defects, or consumer protection.' },
      ],
    },
    {
      n: '14',
      title: 'Limitation of Liability',
      body: [
        { p: 'To the maximum extent permitted by applicable law, Ducks ’n Puddles and its owners, employees, representatives, and service providers will not be liable for indirect, incidental, special, consequential, or punitive damages arising from the use of, or inability to use, our website or its services.' },
        { p: 'Nothing in these Terms excludes or limits liability that cannot legally be excluded, including applicable consumer protection rights or liability relating to defective products where such limitations are prohibited by law.' },
        { p: 'These limitations apply only to the extent permitted by applicable law.' },
      ],
    },
    {
      n: '15',
      title: 'Changes to These Terms',
      body: [
        { p: 'We may update these Terms of Service periodically to reflect changes in our website, products, services, business operations, or applicable legal requirements.' },
        { p: 'Updated Terms will be posted on this page with a revised “Last Updated” date.' },
        { p: 'Where required by law, we will provide additional notice or obtain consent before material changes take effect.' },
        { p: 'Your continued use of the website after updated Terms become effective constitutes acceptance of those changes to the extent permitted by applicable law.' },
        { p: 'We encourage visitors to review these Terms periodically.' },
      ],
    },
    {
      n: '16',
      title: 'Governing Law',
      body: [
        { p: 'These Terms of Service are governed by the laws of the State of Florida, United States, without regard to conflict-of-law principles, except where applicable consumer protection laws require otherwise.' },
        { p: 'Nothing in these Terms limits any rights or remedies that cannot legally be waived under applicable law.' },
      ],
    },
    {
      n: '17',
      title: 'Contact Us',
      body: [
        { p: 'If you have questions about these Terms of Service, our products, or your experience with Ducks ’n Puddles, we’d be happy to hear from you.' },
        { p: 'We appreciate your trust, support, and interest in being part of the Ducks ’n Puddles community.' },
      ],
    },
  ],
  contact: {
    name: 'Ducks ’n Puddles',
    place: 'South Florida, United States',
    email: '[Add official support email]',
  },
  tagline: 'A Friend for Every Adventure.',
}

export const privacy: LegalDoc = {
  slug: 'privacy',
  eyebrow: 'Privacy',
  title: 'Privacy Policy',
  updated: 'October 7, 2026',
  lede: 'At Ducks ’n Puddles, we value your trust and respect your privacy. Whether you’re exploring our website, shopping for your little ones, joining the Duck Squad, or simply reaching out to say hello, we want you to feel comfortable knowing how your information is handled.',
  intro: [
    { p: 'This Privacy Policy explains what personal information we collect, how we use and protect it, when it may be shared, and the choices available to you.' },
    { p: 'By interacting with our website, you acknowledge the information practices described in this policy.' },
  ],
  sections: [
    {
      n: '1',
      title: 'Information We Collect',
      body: [
        { p: 'Depending on how you interact with Ducks ’n Puddles, we may collect the following types of information:' },
        { h: 'Personal and Contact Information' },
        { ul: [
            'Your name, email address, phone number, and mailing address.',
            'Information you provide when contacting us or submitting inquiries.',
            'Information you voluntarily share through forms, feedback, or other communications.',
        ] },
        { h: 'Orders and Purchases' },
        { ul: [
            'Billing and shipping information.',
            'Products purchased, order history, and transaction details.',
            'Information needed to process purchases, manage orders, coordinate deliveries, and provide customer support.',
        ] },
        { p: 'Payments may be processed through secure third-party payment providers, which handle payment information according to their own privacy and security practices.' },
        { h: 'Duck Squad and Subscription Information' },
        { ul: [
            'Information provided when joining the Duck Squad or subscribing to updates.',
            'Membership preferences, subscription details, and communication preferences, where applicable.',
            'Information necessary to administer memberships, subscriptions, and associated benefits.',
        ] },
        { h: 'Website and Technical Information' },
        { ul: [
            'Browser type, device information, IP address, and general location information derived from technical data.',
            'Pages visited, interactions with our website, and general usage information.',
            'Information collected through cookies and similar technologies.',
        ] },
        { p: 'We aim to collect only the information reasonably necessary to provide our products, services, communications, and website experience.' },
      ],
    },
    {
      n: '2',
      title: 'How We Use Your Information',
      body: [
        { p: 'We may use the information we collect to:' },
        { ul: [
            'Process purchases, manage orders, and coordinate shipping and delivery.',
            'Respond to questions, requests, and customer service inquiries.',
            'Manage Duck Squad memberships, subscriptions, and related communications.',
            'Send newsletters, product announcements, special offers, and updates in accordance with your communication preferences.',
            'Improve our website, products, services, and overall customer experience.',
            'Understand how visitors interact with our website.',
            'Maintain website functionality, security, and fraud prevention.',
            'Fulfill applicable legal and regulatory obligations.',
        ] },
        { p: 'We believe personal information should be handled responsibly and used for legitimate purposes connected to your relationship with Ducks ’n Puddles.' },
      ],
    },
    {
      n: '3',
      title: 'Email Communications',
      body: [
        { p: 'If you join the Duck Squad, subscribe to our newsletter, or otherwise choose to receive marketing communications, we may send you updates about Ducks ’n Puddles, including new products, upcoming collections, stories, community initiatives, and special announcements.' },
        { p: 'You can unsubscribe from marketing emails at any time by selecting the unsubscribe link included in our emails or by contacting us directly.' },
        { p: 'Please note that you may still receive essential communications relating to orders, transactions, account activity, or customer service requests.' },
      ],
    },
    {
      n: '4',
      title: 'How We Share Information',
      body: [
        { p: 'We do not sell personal information for monetary compensation.' },
        { p: 'We may share information with trusted third-party service providers that help us operate our business, including:' },
        { ul: [
            'Website hosting and maintenance providers.',
            'Payment processing services.',
            'Shipping and fulfillment partners.',
            'Email marketing and communication platforms.',
            'Website analytics and technology providers.',
            'Customer service and operational support providers.',
        ] },
        { p: 'These providers may receive information necessary to perform services on our behalf, subject to applicable agreements and legal requirements.' },
        { p: 'We may also disclose information when required by law, in connection with a business transaction, or when reasonably necessary to protect the rights, safety, and security of Ducks ’n Puddles, our customers, or others.' },
        { p: 'Certain advertising and analytics technologies may involve additional disclosures of personal information, as explained in the following section.' },
      ],
    },
    {
      n: '5',
      title: 'Cookies, Analytics, and Similar Technologies',
      body: [
        { p: 'Our website may use cookies and similar technologies to support website functionality, remember preferences, understand visitor activity, and improve the overall experience.' },
        { p: 'Depending on the services enabled on our website, these technologies may also help us understand the effectiveness of marketing and advertising.' },
        { p: 'You may be able to manage or disable certain cookies through your browser settings or any privacy preference tools made available on our website.' },
        { p: 'Please note that disabling certain cookies may affect website functionality.' },
        { p: 'Where required by applicable law, we will provide additional information and choices concerning nonessential cookies, targeted advertising, or other data-sharing practices.' },
      ],
    },
    {
      n: '6',
      title: 'Data Security',
      body: [
        { p: 'We take reasonable administrative, technical, and organizational measures designed to protect personal information from unauthorized access, misuse, alteration, loss, or disclosure.' },
        { p: 'We also seek to work with reputable service providers that maintain appropriate security practices.' },
        { p: 'However, no method of electronic storage or internet transmission can be guaranteed to be completely secure.' },
      ],
    },
    {
      n: '7',
      title: 'Children’s Privacy',
      body: [
        { p: 'Ducks ’n Puddles creates products, characters, and experiences designed to bring comfort, joy, and positive direction to children and families.' },
        { p: 'Although our products are designed for children, our website’s purchasing, registration, subscription, and contact features are intended for use by parents, guardians, and other adults.' },
        { p: 'We do not knowingly request personal information directly from children under the age of 13 without appropriate parental consent.' },
        { p: 'If we become aware that personal information has been collected from a child in a manner that does not comply with applicable law, we will take appropriate steps to address the situation, including deleting the information when required.' },
        { p: 'If you are a parent or guardian and believe your child has provided personal information to us, please contact us so we can review your concern.' },
        { p: 'Protecting the privacy and well-being of children and families is an important part of our commitment to responsible business practices.' },
      ],
    },
    {
      n: '8',
      title: 'Data Retention',
      body: [
        { p: 'We retain personal information for as long as reasonably necessary to fulfill the purposes described in this policy, including providing products and services, maintaining business records, resolving disputes, and meeting legal obligations.' },
        { p: 'The length of time information is retained may vary depending on the type of information, the purpose for which it was collected, and applicable legal requirements.' },
        { p: 'When personal information is no longer needed, we take reasonable steps to securely delete or otherwise appropriately handle it.' },
      ],
    },
    {
      n: '9',
      title: 'Your Privacy Choices and Rights',
      body: [
        { p: 'We believe you should have transparency and appropriate control over your personal information.' },
        { p: 'Depending on applicable law, you may have the right to:' },
        { ul: [
            'Request access to personal information we maintain about you.',
            'Request correction of inaccurate information.',
            'Request deletion of certain personal information.',
            'Unsubscribe from marketing communications.',
            'Manage certain cookie and communication preferences.',
            'Request information about how your personal information is collected, used, or shared.',
            'Exercise additional privacy rights available under applicable state or federal laws.',
        ] },
        { p: 'To submit a privacy-related request, please contact us using the information provided below.' },
        { p: 'We may need to verify your identity before fulfilling certain requests. Some information may need to be retained for legitimate business purposes or to comply with legal requirements.' },
      ],
    },
    {
      n: '10',
      title: 'Third-Party Websites and Services',
      body: [
        { p: 'Our website may contain links to third-party websites, social media platforms, payment processors, or other services that operate independently of Ducks ’n Puddles.' },
        { p: 'These third parties may have their own privacy policies and information practices.' },
        { p: 'We encourage you to review their policies before providing personal information or interacting with their services.' },
      ],
    },
    {
      n: '11',
      title: 'The Ducks ’n Puddles Foundation',
      body: [
        { p: 'As Ducks ’n Puddles grows, we envision expanding our mission through the Ducks ’n Puddles Foundation, with initiatives focused on supporting children, families, and communities.' },
        { p: 'Foundation-related programs, applications, donations, volunteer opportunities, or other activities may involve additional information collection and privacy considerations.' },
        { p: 'Where appropriate, separate or supplemental privacy notices will explain how information collected through Foundation initiatives is handled.' },
      ],
    },
    {
      n: '12',
      title: 'Changes to This Privacy Policy',
      body: [
        { p: 'We may update this Privacy Policy periodically to reflect changes in our website, products, services, business practices, or applicable legal requirements.' },
        { p: 'Any updates will be posted on this page with a revised “Last Updated” date.' },
        { p: 'We encourage visitors to review this policy periodically to stay informed about our privacy practices.' },
      ],
    },
    {
      n: '13',
      title: 'Contact Us',
      body: [
        { p: 'If you have questions, concerns, or requests regarding this Privacy Policy or how your personal information is handled, we’d be happy to hear from you.' },
        { p: 'We appreciate the trust you place in us and are committed to treating your information with care and respect.' },
      ],
    },
  ],
  contact: {
    name: 'Ducks ’n Puddles',
    place: 'South Florida, United States',
    email: '[Add official privacy or support email]',
  },
}
