// src/pages/About.tsx
import React from "react";
import { Container, Typography, Box, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { keyframes } from '@mui/system';

// Animation for fade-in
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Animation for accordion
const accordionExpand = keyframes`
  from {
    opacity: 0;
    transform: scaleY(0);
  }
  to {
    opacity: 1;
    transform: scaleY(1);
  }
`;

const About: React.FC = () => {
  return (
    <Container sx={{ backgroundColor: "#F0F8FF", borderRadius: "8px", padding: "20px", mt: 4 }}>
      <Box sx={{ py: 4, animation: `${fadeIn} 1s ease-in-out` }}>
        <Typography variant="h2" component="h1" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to our online gaming platform! We specialize in providing a thrilling and secure environment for players to enjoy various Satta-style games. Our mission is to create an engaging experience where luck, strategy, and community come together.
        </Typography>
        <Typography variant="body1" paragraph>
          At our core, we believe in transparency and fairness. Each game is designed with state-of-the-art technology to ensure a fair chance for all players. We prioritize your security, offering robust measures to protect your data and transactions.
        </Typography>
        <Typography variant="body1" paragraph>
          Our vision is to be the leading online destination for Satta games, where players can connect, compete, and celebrate their wins. We value community and strive to foster a positive environment for both new and experienced players.
        </Typography>
        <Typography variant="body1" paragraph>
          Join us on this exciting journey! Whether you're here to play for fun or test your skills, our platform offers a variety of games to suit your preferences. Get ready to dive into the action, make new friends, and experience the thrill of Satta gaming like never before!
        </Typography>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          How to Play Satta Live
        </Typography>
        <Typography variant="body1" paragraph>
          Playing Satta live is easy and exciting! Here’s a simple guide to get you started:
        </Typography>
        <Typography variant="body1" paragraph>
          1. <strong>Register:</strong> Create an account on our platform to access all the games.
        </Typography>
        <Typography variant="body1" paragraph>
          2. <strong>Select a Game:</strong> Choose from a variety of Satta games available. Each game has its own unique rules and formats.
        </Typography>
        <Typography variant="body1" paragraph>
          3. <strong>Place Your Bets:</strong> Enter your bet amount and select your numbers. Make sure to review your selections before confirming.
        </Typography>
        <Typography variant="body1" paragraph>
          4. <strong>Live Results:</strong> Watch the results live! Our platform provides real-time updates, ensuring you never miss a moment.
        </Typography>
        <Typography variant="body1" paragraph>
          5. <strong>Claim Your Winnings:</strong> If you're lucky, claim your winnings directly from your account!
        </Typography>
        <Typography variant="body1" paragraph>
          To maximize your chances of winning, consider betting strategies like <strong>1*95</strong>, which can help you effectively manage your bets and potentially increase your returns. Additionally, understanding the odds and statistics of previous games can provide valuable insights.
        </Typography>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          More Information
        </Typography>
        <Typography variant="body1" paragraph>
          We are committed to providing you with the best gaming experience. Our platform is designed for both beginners and seasoned players. We offer comprehensive tutorials, game guides, and tips to help you navigate the world of Satta games successfully.
        </Typography>
        <Typography variant="body1" paragraph>
          Additionally, we host regular events and promotions, giving players more chances to win and engage with the community. Keep an eye on our announcements to participate and take advantage of exclusive offers.
        </Typography>
        <Typography variant="body1" paragraph>
          Our customer support team is available 24/7 to assist you with any queries or issues you may encounter. Your satisfaction is our priority!
        </Typography>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          Fast Results, Anytime!
        </Typography>
        <Typography variant="body1" paragraph>
          We pride ourselves on providing fast and accurate results. Our live streaming ensures you receive updates immediately after each game, so you can celebrate your wins without delay!
        </Typography>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          FAQs (Frequently Asked Questions)
        </Typography>

        {/* Accordion for FAQs with animations */}
        {[
          { question: "What is Satta?", answer: "Satta is a popular betting game where players bet on numbers. The game relies heavily on luck, making it an exciting experience for participants." },
          { question: "Is it safe to play on your platform?", answer: "Yes! We prioritize the security of our players by employing advanced encryption and security measures to protect your personal and financial information." },
          { question: "How can I withdraw my winnings?", answer: "You can withdraw your winnings through the withdrawal section in your account. We offer multiple payment methods for your convenience." },
          { question: "What should I do if I encounter issues?", answer: "If you face any issues, please reach out to our customer support team through the contact section on our website. We’re here to help!" },
          { question: "Can I play on my mobile device?", answer: "Absolutely! Our platform is optimized for mobile devices, allowing you to enjoy Satta games on the go." },
          { question: "What are the age restrictions for playing?", answer: "Players must be at least 18 years old to participate in any of our games. Please play responsibly." },
          { question: "How often are new games added?", answer: "We frequently update our game offerings to provide fresh and exciting options for our players. Be sure to check back often!" },
        ].map((faq, index) => (
          <Accordion key={index} sx={{ mb: 1, animation: `${accordionExpand} 0.5s ease-in-out` }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          हमारे मूल मूल्य
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>ईमानदारी:</strong> हम ईमानदारी से काम करते हैं और अपने सभी कामों में उच्च नैतिक मानकों का पालन करते हैं।
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>नवाचार:</strong> हम अपने प्लेटफार्म और खेलों को निरंतर बेहतर बनाते हैं ताकि हमारे खिलाड़ियों के लिए सर्वोत्तम अनुभव प्रदान कर सकें।
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>समुदाय:</strong> हम एक स्वागतयोग्य वातावरण को बढ़ावा देते हैं जहां खिलाड़ी जुड़ सकते हैं, साझा कर सकते हैं, और एक साथ बढ़ सकते हैं।
        </Typography>
      </Box>
    </Container>
  );
};

export default About;
