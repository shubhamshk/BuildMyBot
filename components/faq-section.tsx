"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What do I get after purchasing a premium pack?",
    answer: "Once you purchase a premium pack, you’ll receive access to exclusive premium bots, premium image collections, exclusive content packs, and additional premium-only features depending on your plan."
  },
  {
    question: "Where do I access my bots?",
    answer: "You will receive a private access ID for CharVault: https://www.charvault.online/\nThere you can access: Your respective packs."
  },
  {
    question: "How many bots do I get?",
    answer: "Basic Users:\n• Access to 2 bots\n• Lifetime access to those selected bots only\n\nPremium Users:\n• Access to 10 premium bots\n• 2 new bots added every week\n• Weekly image/content updates"
  },
  {
    question: "Can I customize bots?",
    answer: "Yes. Customization options are available for premium users, including:\n• Personality tweaks\n• Scenario edits\n• Greeting edits\n• Custom styles\n• Special requests"
  },
  {
    question: "What happens if I cancel my subscription?",
    answer: "Once your subscription is canceled or expires:\n• Your premium access will be fully removed\n• Vault access will stop working\n• Premium bot updates and content will no longer be available"
  },
  {
    question: "What is the Ultimate Collection Pack?",
    answer: "The Ultimate Collection Pack gives you:\n• Access to all Characteria packs\n• Special exclusive benefits\n• Future premium additions\n• One-time payment access\n\nIt’s a limited-time deal designed for users who want the complete collection permanently."
  },
  {
    question: "Will new content keep getting added?",
    answer: "Yes. Premium content is updated regularly with:\n• New bots\n• New image collections\n• Special themed packs\n• Improved bot versions\n• Bonus content drops"
  },
  {
    question: "Can I share my access ID?",
    answer: "No. Sharing or leaking private access IDs may result in permanent removal of access without refund."
  },
  {
    question: "What should I do if my access is not working?",
    answer: "Open a support ticket in the Discord server and provide:\n• Your purchase proof\n• Your access ID\n• Your Discord username\n\nSupport will help you as soon as possible."
  },
  {
    question: "Are there any limits on roleplay?",
    answer: "The bots are designed for maximum freedom and immersive interactions with very few restrictions."
  },
  {
    question: "Why are new bots added weekly?",
    answer: "Weekly updates help keep the collection fresh with:\n• Better personalities\n• New characters\n• Improved quality\n• More variety for users"
  },
  {
    question: "Is the premium pack worth keeping active?",
    answer: "Yes. Active premium users continue receiving:\n• New weekly bots\n• Fresh image packs\n• Exclusive updates\n• New premium-only features\n• Access to future drops"
  }
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <section className="py-24 px-6 relative" id="faq">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-white mb-6"
          >
            Characteria Premium <span className="text-amber-500">FAQ</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6 mb-8 text-amber-200"
          >
            <p className="text-sm md:text-base font-medium">
              <strong className="text-amber-400">Important Delivery Information:</strong> We handle delivery manually, so it may take some time to deliver your pack after purchase. We request you to wait for a message from <strong>@bot_dexter</strong> on Discord so he can assist you properly, or email us at <strong>designbyshk@gmail.com</strong>.
            </p>
          </motion.div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-amber-500/30 transition-colors"
            >
              <button 
                onClick={() => toggleFaq(index)}
                className="w-full px-6 py-5 text-left flex justify-between items-center gap-4"
              >
                <span className="font-bold text-lg text-white">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-amber-500 transition-transform ${openIndex === index ? 'rotate-180' : ''}`} />
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-5 pt-0 text-neutral-300">
                  <p className="whitespace-pre-line">{faq.answer}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
