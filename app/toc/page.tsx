"use client";

import { motion } from "framer-motion";
import { ResponsiveNavbar } from "@/components/responsive-navbar";

export default function TOCPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ResponsiveNavbar scrolled={true} />

      <main className="pt-32 pb-24 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-white mb-8"
          >
            Terms and <span className="text-amber-500">Conditions</span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="prose prose-invert prose-amber max-w-none text-neutral-300"
          >
            <h2>1. Introduction</h2>
            <p>Welcome to Characteria. By accessing and using our website, you accept and agree to be bound by the terms and provisions of this agreement.</p>

            <h2>2. Digital Products & Services</h2>
            <p>Characteria provides digital content including AI bot configurations, images, and related assets. Upon purchasing a premium pack, you are granted access to the specified digital goods.</p>
            
            <h2>3. Delivery Policy</h2>
            <p>We handle delivery manually for many of our premium packs to ensure quality and personalization. Please note that it may take some time to deliver your pack after purchase. We request you to wait for a message from <strong>@bot_dexter</strong> on Discord so he can assist you properly, or email us at <strong>designbyshk@gmail.com</strong>.</p>

            <h2>4. Refund Policy</h2>
            <p>Due to the digital nature of our products, all sales are final. However, if you experience technical issues accessing your purchased content, please reach out to our support team.</p>

            <h2>5. Usage Restrictions</h2>
            <p>You may not share, leak, or redistribute your private access IDs or the digital content provided to you. Violation of this rule may result in permanent removal of access without refund.</p>

            <h2>6. User Content</h2>
            <p>When requesting custom bots or images, you agree that your requests will comply with our content guidelines. We reserve the right to refuse requests that violate our policies.</p>

            <h2>7. Contact Information</h2>
            <p>If you have any questions or concerns regarding these Terms and Conditions, please contact us at designbyshk@gmail.com or via our Discord server.</p>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
