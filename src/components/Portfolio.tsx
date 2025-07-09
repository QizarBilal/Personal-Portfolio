import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import freeFireIcon from "@/assets/free-fire-icon.svg";
import designerIcon from "@/assets/designer-icon.svg";
import meta from "@/assets/certificates/meta.jpg";
import oracle from "@/assets/certificates/oracle.jpeg";
import learnsql from "@/assets/certificates/learnsql.jpeg";
import tcs from "@/assets/certificates/tcs.jpeg";
import microsoft from "@/assets/certificates/microsoft.jpeg";
import typing from "@/assets/certificates/typing.jpg";
import profileImage from "@/assets/profile.jpg";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const { scrollYProgress } = useScroll();
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about","experience", "skills", "education", "projects","certifications", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const onSubmit = async (data: ContactFormData) => {
  try {
    const response = await fetch("https://formspree.io/f/xeokbvvv", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        message: data.message,
      }),
    });

    if (response.ok) {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      form.reset();
    } else {
      throw new Error("Form submission failed");
    }
  } catch (error) {
    toast({
      title: "Error sending message",
      description: "There was a problem submitting the form. Please try again later.",
      variant: "destructive",
    });
  }
};

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const slideInRight = {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  return (
    <div className="font-inter">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-effect">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="font-space font-bold text-xl">MQB</div>
            <div className="hidden md:flex space-x-8">
              {["home", "about","experience", "skills", "education", "projects", "certifications","contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`hover:text-shiny-red transition-colors duration-300 capitalize ${
                    activeSection === section ? "text-shiny-red" : ""
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center bg-black relative">
        <motion.div 
          className="text-center z-10"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          <h1 className="font-space text-4xl md:text-6xl lg:text-8xl font-bold mb-4 neon-text">
            Mohammed Qizar Bilal
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl font-light mb-6 text-gray-300">
            Passionate Web Developer
          </p>
          <p className="text-base md:text-lg lg:text-xl mb-8 max-w-2xl mx-auto text-gray-400 px-4">
            Crafting digital experiences with cutting-edge technology and innovative design
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <Button 
              onClick={() => scrollToSection("projects")}
              className="glass-effect px-8 py-4 rounded-full font-semibold hover-glow transition-all duration-300 border border-shiny-red bg-transparent hover:bg-transparent"
            >
              <i className="fas fa-rocket mr-2"></i>View Projects
            </Button>
            <Button 
              onClick={() => scrollToSection("contact")}
              className="bg-shiny-red text-white px-8 py-4 rounded-full font-semibold hover:bg-bright-red transition-colors duration-300"
            >
              <i className="fas fa-envelope mr-2"></i>Get In Touch
            </Button>
          </div>
        </motion.div>
        

      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.h2 
            className="font-space text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            About <span className="text-shiny-red">Me</span>
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              className="relative group"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={slideInRight}
            >
            <div className="w-80 h-80 mx-auto rounded-full overflow-hidden border-2 border-shiny-red shadow-lg hover:shadow-red-600 transition-all duration-300">
            <img 
              src={profileImage} 
              alt="Mohammed Qizar Bilal" 
              className="w-full h-full object-cover"
            />
            </div>
            </motion.div>
            <motion.div 
              className="space-y-6"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <p className="text-lg leading-relaxed text-gray-300">
                Passionate Web Developer with a strong foundation in HTML, CSS, JavaScript, Python, and MySQL. 
                Skilled in building responsive, user-friendly websites and enthusiastic about UI/UX design and problem-solving.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "fas fa-code", color: "text-shiny-red", title: "Frontend", tech: "React, JavaScript, CSS, HTML" },
                  { icon: "fas fa-server", color: "text-bright-red", title: "Backend", tech: "Python, MySQL, MongoDB" },
                  { icon: "fas fa-palette", color: "text-shiny-red", title: "Design", tech: "UI/UX, Figma" },
                  { icon: "fas fa-tools", color: "text-bright-red", title: "Tools", tech: "Git, VSCode" }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="glass-effect p-4 rounded-lg hover-glow"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <i className={`${item.icon} ${item.color} text-2xl mb-2`}></i>
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-sm text-gray-400">{item.tech}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
<section id="experience" className="py-20 px-6 bg-dark-gray">
  <div className="container mx-auto max-w-6xl">
    <motion.h2 
      className="font-space text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={fadeInUp}
    >
      Work <span className="text-shiny-red">Experience</span>
    </motion.h2>
    <div className="grid md:grid-cols-2 gap-12">
    
      {/* Internship 1: AIML - Edunet Foundation */}
      <motion.div 
        className="glass-effect p-8 rounded-xl hover-glow"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeInUp}
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="flex items-center mb-4">
          <i className="fas fa-brain text-shiny-red text-3xl mr-4"></i>
          <div>
            <h3 className="text-xl font-bold text-white">AI & ML Intern</h3>
            <p className="text-gray-400">Edunet Foundation – June 2025 to July 2025</p>
          </div>
        </div>
        <ul className="list-disc list-inside text-gray-300 space-y-2 pl-2">
          <li>Working on an AI/ML project through the IBM SkillsBuild platform.</li>
          <li>Engaged in weekly mentor sessions and completing self-paced learning modules.</li>
          <li>Building project-based solutions to real-world challenges in AI & ML.</li>
        </ul>
      </motion.div>

      {/* Internship 2: Python - ShadowFox */}
      <motion.div 
        className="glass-effect p-8 rounded-xl hover-glow"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={slideInRight}
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="flex items-center mb-4">
          <i className="fas fa-laptop-code text-shiny-red text-3xl mr-4"></i>
          <div>
            <h3 className="text-xl font-bold text-white">Python Developer Intern</h3>
            <p className="text-gray-400">ShadowFox Inc. – Jan 2025 to Feb 2025</p>
          </div>
        </div>
        <ul className="list-disc list-inside text-gray-300 space-y-2 pl-2">
          <li>Built Python automation scripts with integrated APIs.</li>
          <li>Worked on performance optimization and collaborative debugging tasks.</li>
        </ul>
      </motion.div>
    </div>
  </div>
</section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 bg-black">
        <div className="container mx-auto max-w-6xl">
          <motion.h2 
            className="font-space text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            Technical <span className="text-shiny-red">Skills</span>
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { icon: "fab fa-html5", name: "HTML5", color: "text-orange-500" },
              { icon: "fab fa-css3-alt", name: "CSS3", color: "text-blue-500" },
              { icon: "fab fa-js-square", name: "JavaScript", color: "text-yellow-500" },
              { icon: "fab fa-react", name: "React.js", color: "text-cyan-500" },
              { icon: "fas fa-database", name: "MySQL", color: "text-blue-500" },
              { icon: "fab fa-python", name: "Python", color: "text-blue-400" },
              { icon: "fa-brands fa-envira", name: "MongoDB", color: "text-green-500" },
              { icon: "fab fa-figma", name: "Figma", color: "text-pink-500" },
              { icon: "fab fa-git-alt", name: "Git", color: "text-red-500" },
              { icon: "fa-solid fa-keyboard", name: "Typist", color: "text-white-500" }
            ].map((skill, index) => (
              <motion.div 
                key={index}
                className="glass-effect p-6 rounded-xl text-center hover-glow group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.i 
                  className={`${skill.icon} text-4xl ${skill.color} mb-4 block`}
                  whileHover={{ rotateY: 360 }}
                  transition={{ duration: 0.5 }}
                ></motion.i>
                <h4 className="font-semibold">{skill.name}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 px-6 bg-dark-gray">
        <div className="container mx-auto max-w-4xl">
          <motion.h2 
            className="font-space text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            Educational <span className="text-shiny-red">Journey</span>
          </motion.h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-white"></div>
            
            <div className="space-y-16">
              {/* College Education */}
              <motion.div 
                className="flex flex-col md:flex-row items-center"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={slideInRight}
              >
                <div className="md:w-1/2 md:pr-8">
                  <div className="glass-effect p-6 rounded-xl hover-glow">
                    <div className="flex items-center mb-4">
                      <div className="w-4 h-4 bg-shiny-red rounded-full mr-4"></div>
                      <span className="text-sm text-gray-400">Nov 2022 – July 2026</span>
                    </div>
                    <h3 className="font-space text-xl font-bold mb-2">Bachelor of Engineering - CSE</h3>
                    <p className="text-lg font-semibold text-shiny-red mb-2">Priyadarshini Engineering College</p>
                    <p className="text-gray-300">CGPA: <span className="text-bright-red font-bold">8.95</span></p>
                  </div>
                </div>
                <div className="hidden md:block w-8 h-8 bg-white rounded-full border-4 border-shiny-red relative z-10"></div>
                <div className="md:w-1/2"></div>
              </motion.div>
              
              {/* School Education */}
              <motion.div 
                className="flex flex-col md:flex-row items-center"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <div className="md:w-1/2"></div>
                <div className="hidden md:block w-8 h-8 bg-white rounded-full border-4 border-bright-red relative z-10"></div>
                <div className="md:w-1/2 md:pl-8">
                  <div className="glass-effect p-6 rounded-xl hover-glow">
                    <div className="flex items-center mb-4">
                      <div className="w-4 h-4 bg-bright-red rounded-full mr-4"></div>
                      <span className="text-sm text-gray-400">June 2020 – April 2022</span>
                    </div>
                    <h3 className="font-space text-xl font-bold mb-2">Higher Secondary Certificate</h3>
                    <p className="text-lg font-semibold text-bright-red mb-2">Al-Ameen Matric. Hr. Sec. School</p>
                    <p className="text-gray-300">Percentage: <span className="text-shiny-red font-bold">83%</span></p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-black">
        <div className="container mx-auto max-w-6xl">
          <motion.h2 
            className="font-space text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            Featured <span className="text-shiny-red">Projects</span>
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Project 1: FreeFireXperTrade */}
            <motion.div 
              className="glass-effect rounded-2xl overflow-hidden hover-glow group"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="h-48 bg-gradient-to-br from-gray-800 to-black p-6 flex items-center justify-center">
                <img src={freeFireIcon} alt="Free Fire Game" className="w-20 h-20" />
              </div>
              <div className="p-6">
                <h3 className="font-space text-2xl font-bold mb-3">FreeFireXperTrade</h3>
                <p className="text-gray-300 mb-4">
                  A comprehensive Free Fire gaming platform featuring black & gold theme design, 
                  built with modern web technologies for optimal user experience.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["HTML", "CSS", "JavaScript", "PHP"].map((tech, index) => (
                    <span key={index} className="px-3 py-1 rounded-full text-sm bg-gray-700 text-white border border-gray-600">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a href="https://github.com/QizarBilal/FreeFireXperTrade" target="_blank" rel="noopener noreferrer">
  <Button variant="secondary" size="sm" className="bg-gray-800 hover:bg-gray-700">
    <i className="fab fa-github mr-2"></i>GitHub
  </Button>
</a>
<a href="https://ffxpertrade.netlify.app" target="_blank" rel="noopener noreferrer">
  <Button size="sm" className="bg-shiny-red text-white hover:bg-bright-red">
    <i className="fas fa-external-link-alt mr-2"></i>Live Demo
  </Button>
</a>
                </div>
              </div>
            </motion.div>

            {/* Project 2: Client Portfolio */}
            <motion.div 
              className="glass-effect rounded-2xl overflow-hidden hover-glow group"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={slideInRight}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="h-48 bg-gradient-to-br from-gray-700 to-black p-6 flex items-center justify-center">
                <img src={designerIcon} alt="Web Design" className="w-20 h-20" />
              </div>
              <div className="p-6">
                <h3 className="font-space text-2xl font-bold mb-3">Professional Portfolio Website</h3>
                <p className="text-gray-300 mb-4">
                  A responsive and modern portfolio website built with React.js, 
                  showcasing clean design principles and smooth user interactions.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["React.js", "Tailwind CSS", "JavaScript"].map((tech, index) => (
                    <span key={index} className="px-3 py-1 rounded-full text-sm bg-gray-700 text-white border border-gray-600">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a href="https://github.com/QizarBilal/Portfolio" target="_blank" rel="noopener noreferrer">
  <Button variant="secondary" size="sm" className="bg-gray-800 hover:bg-gray-700">
    <i className="fab fa-github mr-2"></i>GitHub
  </Button>
</a>
<a href="https://qizarbilal.netlify.app" target="_blank" rel="noopener noreferrer">
  <Button size="sm" className="bg-shiny-red text-white hover:bg-bright-red">
    <i className="fas fa-external-link-alt mr-2"></i>Live Demo
  </Button>
</a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
<section id="certifications" className="py-20 px-6 bg-dark-gray relative z-10">
  <div className="container mx-auto max-w-6xl">
    <motion.h2 
      className="font-space text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={fadeInUp}
    >
      Certifications & <span className="text-shiny-red">Achievements</span>
    </motion.h2>

    <div className="grid md:grid-cols-2 gap-12">
      {[
        {
          title: "Introduction to Front-End Development",
          issuer: "Meta via Coursera – July 2025",
          description: "Covered HTML, CSS, JS fundamentals and front-end UI structure concepts.",
          img: meta,
        },
        {
          title: "Oracle Cloud Infrastructure 2023 Foundations",
          issuer: "Oracle – April 2024",
          description: "Recognized by Oracle for foundational knowledge in AI and cloud infrastructure.",
          img: oracle,
        },
        {
          title: "SQL Competency Certificate",
          issuer: "LearnSQL – April 2024",
          description: "Certified for solving advanced SQL queries, joins, reports, and functions.",
          img: learnsql,
        },
        {
          title: "Career Edge – Young Professional",
          issuer: "TCS iON – May 2024",
          description: "Trained in soft skills, resume writing, business etiquette, and foundational AI.",
          img: tcs,
        },
        {
          title: "Asia AI Odyssey Challenge",
          issuer: "Microsoft – May 2024",
          description: "Participated and completed hands-on AI activities via Microsoft Learn.",
          img: microsoft,
        },
        {
          title: "Senior Grade Typewriting (English)",
          issuer: "Govt. of Tamil Nadu – Feb 2022",
          description: "Achieved 1st Class in English Typewriting with 45 WPM speed.",
          img: typing,
        },
      ].map((cert, index) => (
        <motion.div
          key={index}
          className="glass-effect p-6 rounded-xl hover-glow cursor-pointer"
          variants={index % 2 === 0 ? fadeInUp : slideInRight}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          whileHover={{ scale: 1.03 }}
          onClick={() => setSelectedImage(cert.img)}
        >
          <h3 className="text-xl font-bold text-white mb-2">{cert.title}</h3>
          <p className="text-sm text-gray-400 mb-2">Issued by {cert.issuer}</p>
          <p className="text-gray-300">{cert.description}</p>
        </motion.div>
      ))}
    </div>
  </div>

  {/* Modal Popup */}
  {selectedImage && (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="relative max-w-3xl w-full mx-4">
        <button
          className="absolute top-4 right-4 text-white text-2xl z-10 hover:text-shiny-red"
          onClick={() => setSelectedImage(null)}
        >
          &times;
        </button>
        <img
          src={selectedImage}
          alt="Certificate"
          className="w-full max-h-[90vh] object-contain rounded-xl shadow-lg border border-shiny-red"
        />
      </div>
    </div>
  )}
</section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-black">
        <div className="container mx-auto max-w-4xl">
          <motion.h2 
            className="font-space text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            Get In <span className="text-shiny-red">Touch</span>
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div 
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={slideInRight}
            >
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input 
                            placeholder="Your Name" 
                            {...field} 
                            className="bg-transparent border-gray-600 focus:border-shiny-red"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input 
                            type="email"
                            placeholder="Your Email" 
                            {...field} 
                            className="bg-transparent border-gray-600 focus:border-shiny-red"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea 
                            placeholder="Your Message" 
                            rows={5}
                            {...field} 
                            className="bg-transparent border-gray-600 focus:border-shiny-red resize-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-shiny-red text-white py-3 font-semibold hover:bg-bright-red shimmer-effect"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? "Sending..." : "Send Message"} 
                    <i className="fas fa-paper-plane ml-2"></i>
                  </Button>
                </form>
              </Form>
            </motion.div>

            {/* Contact Info */}
            <motion.div 
              className="space-y-6"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              {[
  { icon: "fas fa-envelope", color: "text-shiny-red", title: "Email", info: "bilalqizar@gmail.com" },
  { icon: "fas fa-phone", color: "text-bright-red", title: "Phone", info: "+91 8925426680" },
  { icon: "fas fa-map-marker-alt", color: "text-shiny-red", title: "Location", info: "Tirupathur, Tamil Nadu, India" }
].map((contact, index) => (
  <motion.div 
  key={index}
  className="glass-effect p-6 rounded-xl hover-glow"
  whileHover={{ scale: 1.02 }}
  transition={{ type: "spring", stiffness: 300 }}
>
  <div className="flex items-center">
    <i className={`${contact.icon} ${contact.color} text-2xl mr-4`}></i>
    <div>
      <h4 className="font-semibold">{contact.title}</h4>
      <p className="text-gray-300">{contact.info}</p>
    </div>
  </div>
</motion.div>
))}
              {/* Social Links */}
              <div className="flex space-x-4 pt-6">
  {/* LinkedIn */}
  <motion.a 
    href="https://linkedin.com/in/mohammed-qizar-bilal" 
    target="_blank"
    rel="noopener noreferrer"
    className="glass-effect p-4 rounded-lg hover-glow text-2xl"
    whileHover={{ scale: 1.1, rotate: 5 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <i className="fab fa-linkedin"></i>
  </motion.a>

  {/* GitHub */}
  <motion.a 
    href="https://github.com/QizarBilal" 
    target="_blank"
    rel="noopener noreferrer"
    className="glass-effect p-4 rounded-lg hover-glow text-2xl"
    whileHover={{ scale: 1.1, rotate: -5 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <i className="fab fa-github"></i>
  </motion.a>

  {/* Download Resume */}
  <motion.a
  href="/resume.pdf"
  target="_blank"
  rel="noopener noreferrer"
  className="glass-effect px-4 py-2 rounded-lg text-white font-medium text-sm bg-shiny-red hover:bg-bright-red transition-all duration-200"
  whileHover={{ scale: 1.05 }}
  transition={{ type: "spring", stiffness: 300 }}
>
  <i className="fas fa-file-pdf mr-2 mt-4"></i>View Resume
</motion.a>
</div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-dark-gray border-t border-gray-800">
        <div className="container mx-auto text-center">
          <div className="mb-8">
            <div className="flex justify-center space-x-8 mb-6 flex-wrap">
              {["home", "about","experience", "skills", "education","projects","certifications", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="text-gray-400 hover:text-shiny-red transition-colors capitalize"
                >
                  {section}
                </button>
              ))}
            </div>
            <div className="flex justify-center space-x-6">
              <motion.a 
                href="https://linkedin.com/in/mohammed-qizar-bilal" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-gray-400 hover:text-shiny-red transition-colors hover-glow"
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <i className="fab fa-linkedin"></i>
              </motion.a>
              <motion.a 
                href="https://github.com/QizarBilal" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-gray-400 hover:text-shiny-red transition-colors hover-glow"
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <i className="fab fa-github"></i>
              </motion.a>
            </div>
          </div>
          <p className="text-gray-400">
            © 2025 <span className="text-shiny-red font-semibold">Mohammed Qizar Bilal</span>. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
