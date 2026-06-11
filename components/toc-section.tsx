"use client";

import { motion } from "framer-motion";

export function TocSection() {
  return (
    <section className="py-24 px-6 relative" id="toc">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-white mb-6"
          >
            Terms and <span className="text-amber-500">Conditions</span>
          </motion.h2>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 text-neutral-300 space-y-8"
        >
          <div>
            <h3 className="text-xl font-bold text-white mb-3">1. Introduction</h3>
            <p className="leading-relaxed">Welcome to Characteria. By accessing and using our website, you accept and agree to be bound by the terms and provisions of this agreement.</p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-3">2. Digital Products & Services</h3>
            <p className="leading-relaxed">Characteria provides digital content including AI bot configurations, images, and related assets. Upon purchasing a premium pack, you are granted access to the specified digital goods.</p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-white mb-3">3. Delivery Policy</h3>
            <p className="leading-relaxed">We handle delivery manually for many of our premium packs to ensure quality and personalization. Please note that it may take some time to deliver your pack after purchase. We request you to wait for a message from <strong className="text-amber-400">@bot_dexter</strong> on Discord so he can assist you properly, or email us at <strong className="text-amber-400">designbyshk@gmail.com</strong>.</p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-3">4. Refund Policy</h3>
            <p className="leading-relaxed">Due to the digital nature of our products, all sales are final. However, if you experience technical issues accessing your purchased content, please reach out to our support team.</p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-3">5. Usage Restrictions</h3>
            <p className="leading-relaxed">You may not share, leak, or redistribute your private access IDs or the digital content provided to you. Violation of this rule may result in permanent removal of access without refund.</p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-3">6. User Content</h3>
            <p className="leading-relaxed">When requesting custom bots or images, you agree that your requests will comply with our content guidelines. We reserve the right to refuse requests that violate our policies.</p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-3">7. Contact Information</h3>
            <p className="leading-relaxed">If you have any questions or concerns regarding these Terms and Conditions, please contact us at designbyshk@gmail.com or via our Discord server.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
