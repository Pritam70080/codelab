import React from 'react'
import { CodeXml, HeartIcon, Github, Linkedin, X, Twitter, MapPin, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

const Footer = () => {
  const navItems = [
    {
      id: 1,
      path: "/",
      label: "Home"
    },
    {
      id: 2,
      path: "/problems",
      label: "Problems"
    },
    {
      id: 3,
      path: "/sheets",
      label: "Sheets"
    },
    {
      id: 4,
      path: "/pricing",
      label: "Pricing"
    }
  ]
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeIn" } }}
      viewport={{ once: true, amount: 0.4 }}
      className="">
      <hr style={{ opacity: 0.2 }} />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 mt-4 gap-5 md:gap-30 px-4">
        <div>
          <Link to="/">
            <div className="flex gap-2 items-center ">
              <span><CodeXml className="size-10 text-primary" />
              </span>
              <span className="text-2xl font-bold font-mono">CodeLab</span>
            </div>
          </Link>
          <p className="md:text-lg mt-4 text-justify">Learn, practice, and master coding with <span className="text-primary">structured sheets</span> and <span className="text-primary">real-world problems</span> — all in one place.</p>
          <div className="flex items-center gap-4 mt-4">
            <a href="" target="_blank" className="hover:text-primary" ><Github /></a>
            <a href="" target="_blank" className="hover:text-primary"><Linkedin /></a>
            <a href="" target="_blank" className="hover:text-primary"><Twitter /></a>
          </div>
        </div>
        <div >
          <h4 className="italic font-semibold mb-1 md:mb-5">Quick Links</h4>
          <ul className="px-2">
            {navItems.map(({ id, path, label }) => {
              return <li key={id}><Link to={path} className="hover:text-primary">{label}</Link></li>
            })}
          </ul>
        </div>
        <div>
          <h4 className="italic font-semibold mb-1 md:mb-5">Contact</h4>

          <ul className="px-2 space-y-3 text-sm md:text-base">
            <li className="flex items-center gap-2">
              <Mail className="size-4 text-primary" />
              <a
                href="mailto:support@codelab.dev"
                className="hover:text-primary"
              >
                support@codelab.dev
              </a>
            </li>

            <li className="flex items-center gap-2">
              <Phone className="size-4 text-primary" />
              <span>+91 9XXXXXXXXX</span>
            </li>

            <li className="flex items-center gap-2">
              <MapPin className="size-4 text-primary" />
              <span>Bhubaneswar, Odisha, India</span>
            </li>
          </ul>
        </div>

      </div>
      <div className="text-right my-4 text-sm px-4">
        <div> Made with{" "}
          <HeartIcon className="animate-pulse text-rose-400 inline size-5 -translate-y-0.5" /> by Pritam for Coders</div>
        <p>&copy; 2026 CodeLab. All rights reserved.</p>
      </div>
    </motion.footer>
  )
}

export default Footer