import Link from "next/link";
import { Linkedin } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { name: "LinkedIn", icon: Linkedin, href: "#" },
  ];

  const footerLinks = [
    { title: "Courses", href: "/courses" },
    { title: "Blog", href: "/blog" },
    { title: "About Us", href: "/about" },
    { title: "Contact", href: "/contact" },
    { title: "Privacy Policy", href: "/privacy" },
    { title: "Terms of Service", href: "/terms" },
  ];

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
             <div className="flex items-center space-x-2 mb-4">
               <span className="font-bold text-lg">Knowledge Craft</span>
             </div>
            <p className="text-muted-foreground text-sm">
              Empowering minds through accessible and engaging online education.
            </p>
          </div>
          <div className="md:justify-self-center">
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.slice(0, 4).map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:justify-self-end">
             <h3 className="font-semibold mb-4">Follow Us</h3>
             <div className="flex justify-center md:justify-start space-x-4">
               {socialLinks.map((link) => (
                 <Link key={link.name} href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                   <link.icon className="h-6 w-6" />
                 </Link>
               ))}
             </div>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Knowledge Craft. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
