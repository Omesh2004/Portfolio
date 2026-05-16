import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Instagram } from "lucide-react";

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/Omesh2004",
    color: "#c8a97e"
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/omesh-mehta-551080298/",
    color: "#a0b4c8"
  },
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://www.instagram.com/mehta.omesh/",
    color: "#b0a0c0"
  }
];

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "omesh_2301cb32@iitp.ac.in",
    color: "#c8a97e"
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 9432279870",
    color: "#a0b4c8"
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Kolkata, West Bengal, India",
    color: "#b0a0c0"
  }
];

const Contact = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 relative z-10 overflow-hidden">
      <h2 className="section-heading">
        <span className="text-[#c8a97e] font-mono text-2xl mr-2">05.</span> Contact
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="glass-card"
      >
        {/* Content */}
        <div className="p-2 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
            >
              <Card className="p-8 bg-white/[0.03] border-white/10 h-full flex flex-col" style={{ transition: 'background 0.3s ease, border-color 0.3s ease' }}>
                <h3 className="text-2xl font-bold text-[#d4b896] mb-8">Get in Touch</h3>
                <div className="space-y-6 flex-grow flex flex-col justify-center">
                  {contactInfo.map((info) => (
                    <div key={info.label} className="flex items-center gap-6 group">
                      <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10" style={{ transition: 'background 0.3s ease' }}>
                        <info.icon className="w-6 h-6" style={{ color: info.color }} />
                      </div>
                      <div>
                        <p className="text-sm text-white/40 mb-1">{info.label}</p>
                        <p className="text-white/70 font-medium tracking-wide">{info.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
            >
              <Card className="p-8 bg-white/[0.03] border-white/10 h-full flex flex-col" style={{ transition: 'background 0.3s ease, border-color 0.3s ease' }}>
                <h3 className="text-2xl font-bold text-[#d4b896] mb-8">Connect with Me</h3>
                <div className="grid grid-cols-1 gap-4 flex-grow flex flex-col justify-center">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 bg-white/[0.03] rounded-xl border border-white/10 group"
                      style={{ transition: 'background 0.3s ease, border-color 0.3s ease, transform 0.3s ease' }}
                    >
                      <div className="p-2 rounded-lg bg-white/[0.04] border border-white/5">
                        <link.icon className="w-5 h-5" style={{ color: link.color }} />
                      </div>
                      <span className="text-white/60 font-medium" style={{ transition: 'color 0.3s ease' }}>{link.name}</span>
                      <span className="ml-auto opacity-0 group-hover:opacity-100 text-[#c8a97e]/50" style={{ transition: 'opacity 0.3s ease' }}>→</span>
                    </a>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
