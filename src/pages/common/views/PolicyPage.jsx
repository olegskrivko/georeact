import { useRef } from 'react';

import { Box, Container, Grid, Link, Stack, Typography } from '@mui/material';

const PolicyPage = () => {
  const paragraphRefs = useRef([]);

  const scrollToParagraph = (index) => {
    if (paragraphRefs.current[index]) {
      paragraphRefs.current[index].scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const sectionTitles = [
    'Privacy Policy',
    'Cookie Policy',
    'Terms of Service',
    'Data Protection Policy',
    'Disclaimer',
    'Community Guidelines',
  ];

  return (
    <Container maxWidth="lg" disableGutters>
      <Typography
        variant="h4"
        align="center"
        sx={{
          mb: 5,
          fontWeight: 800,
          background: 'linear-gradient(60deg, #16477c 0%, #00b5ad 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Privacy Policy, Cookie Policy, and Terms of Service
      </Typography>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, color: '#16477c' }}>
          Contents
        </Typography>
        <Stack spacing={1} mt={1}>
          {sectionTitles.map((title, i) => (
            <Typography key={i} variant="body1">
              <Link
                component="button"
                onClick={() => scrollToParagraph(i)}
                sx={{
                  textDecoration: 'none',
                  color: '#1976d2',
                  '&:visited': { color: '#1976d2' },
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                {i + 1}. {title}
              </Link>
            </Typography>
          ))}
        </Stack>
      </Box>

      {/* Privacy Policy Section */}
      <Box id="privacy-policy" ref={(el) => (paragraphRefs.current[0] = el)} sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, color: '#16477c' }}>
          1. Privacy Policy
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ mb: 3 }}>
              <Typography paragraph sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                We ("we", "us" or "our") operate the web application (hereinafter "the Application"). This Privacy
                Policy describes our practices regarding the collection, use, and disclosure of personal information
                provided by users of the Application.
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Information We Collect
              </Typography>
              <Typography paragraph sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                Personal Information: We may collect personal information such as name, surname, email address, phone
                number, saved locations, pet data, country, and preferred language.
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                How We Use Your Information
              </Typography>
              <Typography paragraph sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                We use the collected information to provide and improve our services, including facilitating pet
                returns, personalizing user experience, and communicating with users. Your personal information may be
                used to respond to requests, provide technical support, and send notifications related to the
                Application.
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Data Security
              </Typography>
              <Typography paragraph sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                We implement appropriate security measures to protect your personal information from unauthorized
                access, disclosure, alteration, or destruction. User passwords are encrypted to ensure security.
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Data Retention and Deletion
              </Typography>
              <Typography paragraph sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                Users have the right to access, update, or delete their personal information stored in the Application.
                Upon request, we will delete user data, including personal information, messages, and other related
                data.
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Disclosure of Information to Third Parties
              </Typography>
              <Typography paragraph sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                We do not sell, transfer, or share your personal information with third parties without your consent,
                except as required by law or to facilitate services provided by the Application.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Cookie Policy Section */}
      <Box id="privacy-policy" ref={(el) => (paragraphRefs.current[1] = el)} sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, color: '#16477c' }}>
          2. Cookie Policy
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ mb: 3 }}>
              <Typography paragraph sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                This Cookie Policy explains how we use cookies and similar tracking technologies on our website and
                mobile application (collectively referred to as "the Application").
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                What are cookies?
              </Typography>
              <Typography paragraph sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                Cookies are small text files that are stored on your device when you visit a website or use a mobile
                application. They allow the website or application to remember your actions and settings over time.
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                How We Use Cookies
              </Typography>
              <Typography paragraph sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                We use cookies and similar tracking technologies for the following purposes:
              </Typography>
              <ul>
                <li>
                  <Typography sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                    Necessary cookies - These cookies are essential for the operation of the Application and to provide
                    basic functionality.
                  </Typography>
                </li>
                <li>
                  <Typography sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                    Performance and analytics cookies - These cookies help us analyze how users interact with the
                    Application, allowing us to improve its performance and user experience.
                  </Typography>
                </li>
                <li>
                  <Typography sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                    Functionality cookies - These cookies enable certain features of the Application, such as
                    personalization and language settings.
                  </Typography>
                </li>
                <li>
                  <Typography sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                    Advertising cookies - We may use third-party advertising cookies to display personalized ads based
                    on your browsing behavior.
                  </Typography>
                </li>
              </ul>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Your Choices Regarding Cookies
              </Typography>
              <Typography paragraph sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                You have the option to accept or reject cookies. Most browsers automatically accept cookies, but you can
                usually change your browser settings to reject cookies if you prefer. However, this may prevent you from
                accessing certain features of the Application.
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Third-Party Cookies
              </Typography>
              <Typography paragraph sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                We may allow third-party service providers to place cookies on the Application to provide us with
                analytical and advertising services. These cookies are subject to the relevant third-party service
                providers' privacy policies.
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Updates to This Policy
              </Typography>
              <Typography paragraph sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                We may periodically update this Privacy Policy and Cookie Policy to reflect changes in our practices or
                legal requirements. We encourage you to review this policy regularly for any changes.
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Contact Us
              </Typography>
              <Typography paragraph sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                If you have any questions or concerns about this Privacy Policy, Cookie Policy, or our data practices,
                please contact us using the contact information provided on our contact page.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Terms of Service Section */}
      <Box id="terms-of-service" ref={(el) => (paragraphRefs.current[2] = el)} sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, color: '#16477c' }}>
          3. Terms of Service
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography paragraph>
              These Terms of Service ("Terms") govern your use of the Application ("Application"), operated by our team
              ("we", "us" or "our").
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: 500, mt: 3 }}>
              Acceptance of Terms
            </Typography>
            <Typography paragraph>
              By accessing or using the Application, you agree to be bound by these Terms. If you do not agree to any
              part of these Terms, you do not have permission to use the Application.
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: 500, mt: 3 }}>
              Changes to Terms
            </Typography>
            <Typography paragraph>
              We reserve the right to update or modify these Terms at any time without prior notice. Changes take effect
              immediately upon posting on the Application. Continuing to use the Application after changes means you
              agree to the modified Terms.
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: 500, mt: 3 }}>
              Disclaimer of Warranties
            </Typography>
            <Typography paragraph>
              The Application and its content are provided "as is" and "as available". We do not guarantee the accuracy,
              completeness, reliability, or availability of the Application or its content. We disclaim any liability
              for any errors or omissions in the content or for any damages or losses arising from the use of the
              Application or reliance on its content.
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: 500, mt: 3 }}>
              User Responsibility and Security
            </Typography>
            <Typography paragraph>
              Users are responsible for their account access data, including passwords, confidentiality, and security.
              We recommend users create strong, unique passwords and avoid using the same password for multiple
              accounts.
            </Typography>
            <Typography paragraph>
              Although we implement security measures to protect user data, including password encryption, we cannot
              guarantee the absolute security of user information. Users are aware and agree to the risks associated
              with information transfer over the internet and use of direct communication services.
            </Typography>
            <Typography paragraph>
              In the event of a security breach or unauthorized access to user accounts, we will immediately notify
              affected users and take appropriate measures to mitigate the consequences. However, we disclaim any
              liability for any damages or losses arising from unauthorized access to user accounts, including, but not
              limited to, data breaches or unauthorized access to account data.
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: 500, mt: 3 }}>
              Intellectual Property Rights
            </Typography>
            <Typography paragraph>
              The content and materials of the Application, including but not limited to text, images, logos, and
              products, are owned by us or are licensed and are protected by intellectual property laws. You may not
              use, reproduce, or distribute any content from the Application without our prior written consent.
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: 500, mt: 3 }}>
              User Behavior
            </Typography>
            <Typography paragraph>
              Users agree not to engage in any actions that may disrupt or interfere with the Application or its service
              operations. Prohibited actions include malicious behavior, spam posting, unauthorized access, or improper
              conduct.
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: 500, mt: 3 }}>
              Account Termination
            </Typography>
            <Typography paragraph>
              We reserve the right to terminate or suspend user accounts at our discretion for any reason, including but
              not limited to Terms violation or Application malicious use.
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: 500, mt: 3 }}>
              Cooperation
            </Typography>
            <Typography paragraph>
              Users agree to cooperate and protect us from any claims, damages, or losses arising from the use of the
              Application or these Terms.
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: 500, mt: 3 }}>
              Governing Law
            </Typography>
            <Typography paragraph>
              These Terms are governed and interpreted in accordance with the laws of Latvia, without regard to the
              principles of conflict of laws.
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: 500, mt: 3 }}>
              Contact Us
            </Typography>
            <Typography paragraph>
              If you have any questions or concerns about these Terms, please contact us using the contact information
              provided on our contact page.
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Data Protection Policy Section */}
      <Box id="data-protection-policy" ref={(el) => (paragraphRefs.current[3] = el)} sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, color: '#16477c' }}>
          4. Data Protection Policy
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ mb: 3 }}>
              <Typography paragraph sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                This Data Protection Policy explains how we protect user personal information collected through our
                website and mobile application (collectively referred to as "the Application").
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 500 }}>
                Information We Collect
              </Typography>
              <Typography paragraph sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                We may collect personal information from users, including but not limited to:
              </Typography>
              <ul>
                <li>Username</li>
                <li>First Name</li>
                <li>Last Name</li>
                <li>Email Address</li>
                <li>Phone Number</li>
                <li>Country Code</li>
                <li>Address (City, Country)</li>
                <li>Language</li>
                <li>State</li>
                <li>Password (stored in encrypted format)</li>
                <li>Saved Notifications</li>
                <li>Pet Data</li>
                <li>Comments</li>
                <li>Default Location (Geographic Coordinates)</li>
                <li>Application Appearance (Light or Dark Mode)</li>
                <li>User Role (User or Administrator)</li>
                <li>Notification Settings</li>
                <li>Subscription Status</li>
                <li>Verification and Recovery Tokens</li>
              </ul>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 500 }}>
                How We Use Your Information
              </Typography>
              <Typography paragraph sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                We use the collected information to:
              </Typography>
              <ul>
                <li>Provide and improve our services,</li>
                <li>Personalize user experience,</li>
                <li>Respond to requests and provide support,</li>
                <li>Fulfill legal obligations.</li>
              </ul>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 500 }}>
                Data Security
              </Typography>
              <Typography paragraph sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                We implement security measures to protect your information from unauthorized access, disclosure, or
                alteration. Passwords are encrypted and stored securely.
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 500 }}>
                Data Retention and Deletion
              </Typography>
              <Typography paragraph sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                Users can request their information to be updated or deleted at any time. Upon request, data is
                permanently deleted.
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 500 }}>
                Disclosure to Third Parties
              </Typography>
              <Typography paragraph sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                We do not disclose personal information to third parties without your consent, except as required by law
                or to facilitate services provided by the Application.
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 500 }}>
                Compliance with Laws
              </Typography>
              <Typography paragraph sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                We comply with the General Data Protection Regulation (GDPR), CCPA, and other applicable laws and
                regulations.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Disclaimer Section */}
      <Box id="disclaimer" ref={(el) => (paragraphRefs.current[4] = el)} sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, color: '#16477c' }}>
          5. Disclaimer
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography paragraph>
              Information provided on the Application is intended for general informational purposes only. Although we
              strive to maintain information accurate and precise, we do not guarantee any warranties, express or
              implied, regarding the Application or its content, products, services, or related graphics.
            </Typography>

            <Typography paragraph>
              Any reliance on such information is at your own risk. We disclaim any liability for any damages or losses
              arising from or related to the use of the Application or its content.
            </Typography>

            <Typography paragraph>
              Through the Application, you may create links to other websites that are not under our control. We do not
              control the nature, content, or availability of these websites. Linking to such websites does not imply
              endorsement or support of the views expressed in them.
            </Typography>

            <Typography paragraph>
              We strive to ensure the Application operates without interruption. However, we disclaim any liability for
              the Application's temporary unavailability due to technical issues, which are beyond our control.
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Community Guidelines Section */}
      <Box id="community-guidelines" ref={(el) => (paragraphRefs.current[5] = el)} sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, color: '#16477c' }}>
          6. Community Guidelines
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography paragraph sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
              Welcome to the community! To ensure a positive and enjoyable experience for all users, we have created the
              following rules for participation:
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 500 }}>
                Be Respectful
              </Typography>
              <Typography paragraph sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                Show respect, empathy, and kindness towards other community members. Avoid offensive language,
                harassment, discrimination, and personal attacks. Remember that different opinions and perspectives are
                welcome, but malicious or offensive comments will not be tolerated.
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 500 }}>
                Be Constructive
              </Typography>
              <Typography paragraph sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                Share constructive feedback and contribute meaningful input in discussions. Avoid spam, trolling, and
                inappropriate content posting. Focus on building supportive and educational environments where everyone
                can learn and grow.
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 500 }}>
                Be Respectful of Privacy
              </Typography>
              <Typography paragraph sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                Protect others' privacy and do not disclose personal or sensitive information without consent. Respect
                user confidentiality and avoid discussing personal or sensitive topics in public forums.
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 500 }}>
                Follow Application Rules
              </Typography>
              <Typography paragraph sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                Follow platform rules, privacy policy, and other rules. Report Application administrators for any
                violations or improper conduct, so they can be addressed and taken appropriate actions.
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 500 }}>
                Be Responsible
              </Typography>
              <Typography paragraph sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                Take responsibility for your actions and contributions in the community. Help maintain a positive and
                welcoming atmosphere by adhering to these rules and encouraging others to do the same.
              </Typography>
            </Box>

            <Typography paragraph sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
              By participating in this community, you agree to adhere to these rules and contribute to creating a safe,
              inclusive, and supportive environment for all members. Thank you for your cooperation and commitment to
              contribute to the community's development!
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default PolicyPage;
