import { useI18n } from "../../lib/i18n";
import CardNav from "../CardNav";
import logo from "../../assets/Group 2.png";

export default function Navbar() {
  const { t } = useI18n();

  const items = [
    {
      label: t.navAbout,
      textColor: "#fff",
      links: [
        { label: "Company", ariaLabel: "About Company", href: "/about" },
        { label: "Careers", ariaLabel: "About Careers", href: "/about" },
      ],
    },
    {
      label: t.navProjects,
      textColor: "#fff",
      links: [
        { label: "Featuamber", ariaLabel: "Featuamber Projects", href: "/projects" },
        { label: "Case Studies", ariaLabel: "Project Case Studies", href: "/projects" },
      ],
    },
    {
      label: t.navContact,
      textColor: "#fff",
      links: [
        { label: "Email", ariaLabel: "Email us", href: "/contact" },
        { label: "Twitter", ariaLabel: "Twitter", href: "/contact" },
        { label: "LinkedIn", ariaLabel: "LinkedIn", href: "/contact" },
      ],
    },
  ];

  return (
    <nav className="fixed -top-2 left-0 w-full z-50">
      <CardNav
        logo={logo}
        logoAlt="Company Logo"
        items={items}
        baseColor="#fff"
        menuColor="#000"
        buttonBgColor="#111"
        buttonTextColor="#fff"
        ease="power3.out"
      />
    </nav>
  );
}
