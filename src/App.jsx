import React, { useState } from 'react';
import { 
  GraduationCap, 
  CheckCircle2, 
  Users, 
  Briefcase, 
  Phone, 
  Mail, 
  MapPin, 
  Award, 
  Clock, 
  ChevronRight,
  Star, 
  Menu, 
  X,
  ArrowRight,
  Wallet,
  FileText,
  Plus,
  Minus,
  CheckCircle,
  Quote,
  HelpCircle,
  Sparkles,
  Lightbulb
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- COMPOSANTS RÉUTILISABLES ---

const StatCard = ({ value, label }) => (
  <div className="text-center p-8 rounded-3xl shadow-sm border bg-white border-gray-100 h-full flex flex-col justify-center items-center transition-all hover:shadow-md">
    <div className="text-4xl font-black mb-2 text-blue-700 tracking-tight">
      {value}
    </div>
    <div className="font-semibold text-slate-500 text-xs uppercase tracking-wider">
      {label}
    </div>
  </div>
);

const FormationCard = ({ title, description, badge, onClick }) => (
  <motion.div 
    whileHover={{ y: -8 }}
    className="p-8 rounded-[2rem] shadow-lg border flex flex-col h-full bg-white border-gray-50 transition-all cursor-pointer group"
    onClick={onClick}
  >
    <div className="inline-block px-3 py-1 rounded-full text-[10px] font-black mb-6 w-fit uppercase tracking-widest bg-blue-50 text-blue-700">
      {badge || "Diplôme RNCP"}
    </div>
    <h3 className="text-2xl font-bold mb-4 text-slate-900 leading-tight group-hover:text-blue-700 transition-colors">
      {title}
    </h3>
    <p className="leading-relaxed mb-8 flex-grow text-slate-500 text-sm font-medium">
      {description}
    </p>
    <div className="flex items-center font-black text-blue-600 group-hover:text-blue-800 transition-colors text-xs uppercase tracking-widest">
      Découvrir le programme 
      <ChevronRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
    </div>
  </motion.div>
);

const TestimonialCard = ({ name, role, text }) => (
  <div className="p-10 rounded-[2.5rem] border bg-white border-slate-100 shadow-sm h-full flex flex-col">
    <div className="mb-6">
      <Quote className="text-blue-100" size={40} fill="currentColor" />
    </div>
    <p className="text-slate-600 mb-8 text-lg leading-relaxed font-medium flex-grow italic">"{text}"</p>
    <div className="flex items-center gap-4">
      <div>
        <h5 className="font-black text-slate-900 leading-none mb-1">{name}</h5>
        <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">{role}</p>
      </div>
    </div>
  </div>
);

const CourseModal = ({ formation, onClose }) => {
  if (!formation) return null;
  
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
      >
        <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full bg-slate-50 text-slate-400 hover:text-slate-900 transition-all z-10">
          <X size={20} />
        </button>
        
        <div className="p-8 sm:p-12">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black mb-4 uppercase tracking-widest bg-blue-50 text-blue-700">
            {formation.badge}
          </span>
          <h2 className="text-3xl font-black text-slate-900 mb-8">{formation.title}</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <Clock className="text-blue-600 mb-2" size={20} />
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Durée</p>
              <p className="font-bold text-slate-900 text-sm">{formation.details.duration}</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <GraduationCap className="text-blue-600 mb-2" size={20} />
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Niveau</p>
              <p className="font-bold text-slate-900 text-sm">{formation.details.level}</p>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h4 className="flex items-center gap-2 font-black text-slate-900 mb-4 uppercase text-xs tracking-widest">
                <FileText size={16} className="text-blue-600" /> Objectifs
              </h4>
              <ul className="space-y-3">
                {formation.details.objectives.map((obj, i) => (
                  <li key={i} className="flex gap-3 text-slate-600 text-sm font-medium">
                    <CheckCircle className="text-green-500 shrink-0" size={16} />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="flex items-center gap-2 font-black text-slate-900 mb-4 uppercase text-xs tracking-widest">
                <Briefcase size={16} className="text-blue-600" /> Débouchés
              </h4>
              <div className="flex flex-wrap gap-2">
                {formation.details.jobs.map((job, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-[10px] uppercase">
                    {job}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-100">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full py-6 flex justify-between items-center text-left gap-4">
        <span className="text-lg font-bold text-slate-900">{question}</span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-blue-600 text-white' : 'bg-slate-50 text-blue-600'}`}>
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
            <p className="pb-6 text-slate-500 text-sm leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- COMPOSANT PRINCIPAL ---

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedFormation, setSelectedFormation] = useState(null);

  const formations = [
    {
      title: "TP Assistant(e) Ressources Humaines",
      description: "Assurez la gestion administrative du personnel et contribuez au développement des talents (Recrutement, Formation, GPEC).",
      badge: "Niveau 5 (BAC+2)",
      details: {
        duration: "8 mois (6 mois centre + 2 mois stage)",
        level: "Équivalent BAC +2 (RNCP)",
        objectives: [
          "Assurer les missions quotidiennes RH (Gestion administrative, dossiers, embauches)",
          "Préparer et contrôler les variables de paie",
          "Mettre en place une veille juridique et sociale permanente",
          "Gérer le processus de recrutement et le plan de développement des compétences"
        ],
        jobs: ["Assistant(e) RH", "Chargé(e) de recrutement", "Assistant(e) de gestion"]
      }
    },
    {
      title: "TP Assistant(e) de Direction",
      description: "Appuyez les dirigeants dans la gestion de l'organisation. Maîtrisez la communication (FR/EN), l'organisation d'événements et le pilotage de dossiers spécifiques.",
      badge: "Niveau 5 (BAC+2)",
      details: {
        duration: "8 mois (6 mois centre + 2 mois stage)",
        level: "Équivalent BAC +2 (RNCP)",
        objectives: [
          "Assurer les fonctions de support à l'équipe de direction (FR/EN)",
          "Concevoir des outils de pilotage et de gestion",
          "Organiser et suivre les projets et dossiers spécifiques de l'équipe",
          "Coordonner des événements professionnels et actions de communication"
        ],
        jobs: ["Assistant(e) de Direction", "Assistant(e) Manager", "Office Manager"]
      }
    },
    {
      title: "TP Gestionnaire Comptable et Fiscal",
      description: "Responsable de la tenue de la comptabilité et des déclarations fiscales. Activités d'exécution, d'organisation et de conseil.",
      badge: "Niveau 5 (BAC+2)",
      details: {
        duration: "8 mois (dont 2 mois de stage)",
        level: "Équivalent BAC +2 (RNCP)",
        objectives: [
          "Organiser et contrôler la comptabilité générale",
          "Établir les déclarations fiscales annuelles",
          "Réaliser des analyses de gestion et prévisionnels"
        ],
        jobs: ["Comptable unique", "Chef comptable", "Analyste financier"]
      }
    },
    {
      title: "TP Comptable Assistant(e)",
      description: "Recueillez, contrôlez et comptabilisez les documents commerciaux, sociaux et fiscaux nécessaires à la tenue de la comptabilité.",
      badge: "Niveau 4 (BAC)",
      details: {
        duration: "8 mois (dont 2 mois de stage)",
        level: "Équivalent BAC (RNCP)",
        objectives: [
          "Enregistrer les opérations comptables courantes",
          "Préparer les documents de fin d'exercice",
          "Assurer la gestion administrative de la trésorerie"
        ],
        jobs: ["Aide comptable", "Assistant de gestion", "Comptable clients/fournisseurs"]
      }
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 selection:bg-blue-100 font-sans">
      
      <AnimatePresence>
        {selectedFormation && <CourseModal formation={selectedFormation} onClose={() => setSelectedFormation(null)} />}
      </AnimatePresence>

      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 w-full backdrop-blur-xl z-50 border-b border-slate-100 bg-white/80 h-20 flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full flex items-center">
          
          {/* Logo - Colonne gauche */}
          <div className="flex-1 flex items-center">
            {/* Remplacement par l'image du logo */}
            <img 
              src="/Logo_CG_ACADEMY.png" 
              alt="CG ACADEMY" 
              className="h-10 w-auto object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            {/* Fallback caché par défaut */}
            <div className="hidden items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black italic shadow-lg shadow-blue-200">CG</div>
              <span className="font-black text-xl uppercase hidden sm:block tracking-tighter">ACADEMY</span>
            </div>
          </div>

          {/* Menu - Colonne centre */}
          <div className="hidden md:flex items-center justify-center gap-10">
            {['Formations', 'Financement', 'Pourquoi nous', 'Témoignages', 'FAQ'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(' ', '-')}`} 
                className="font-semibold text-gray-600 hover:text-blue-700 transition-colors text-sm uppercase tracking-wide whitespace-nowrap"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Espaceur - Colonne droite */}
          <div className="flex-1 hidden md:flex items-center justify-end">
          </div>

          {/* Mobile Menu button */}
          <div className="md:hidden flex flex-1 justify-end">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-blue-900"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-b border-gray-100 bg-white overflow-hidden absolute top-20 left-0 w-full"
            >
              <div className="px-6 py-8 flex flex-col gap-6">
                {['Formations', 'Financement', 'Pourquoi nous', 'Témoignages', 'FAQ'].map((item) => (
                  <a 
                    key={item} 
                    href={`#${item.toLowerCase().replace(' ', '-')}`} 
                    onClick={() => setIsMenuOpen(false)}
                    className="text-xl font-bold text-gray-700"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-44 pb-32 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          
          <h1 className="text-5xl md:text-8xl font-[1000] leading-[0.9] mb-12 tracking-tight text-slate-900">
            Construisez votre <br />
            <span className="text-blue-600 relative">
              avenir professionnel.
              <span className="absolute -bottom-2 left-0 w-full h-1.5 bg-blue-100/50 rounded-full" />
            </span>
          </h1>

          <p className="text-lg md:text-xl mb-12 text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Formations de 8 mois, <span className="text-slate-900 font-bold">100% finançables</span> et sans prérequis. 
            Un tremplin concret pour votre insertion professionnelle.
          </p>

          <button className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 mx-auto shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all group">
            Découvrir la formation
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* --- FORMATIONS --- */}
      <section id="formations" className="py-24 px-6 bg-slate-50/50 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">Nos Titres Certifiés</h2>
            <p className="text-slate-500 font-medium italic">Accélérez votre avenir avec nos programmes experts.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {formations.map((f, idx) => (
              <FormationCard key={idx} {...f} onClick={() => setSelectedFormation(f)} />
            ))}
          </div>
        </div>
      </section>

      {/* --- MÉTHODE --- */}
      <section id="notre-methode" className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-blue-600 font-black uppercase text-[10px] tracking-widest block mb-4">Notre différence</span>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-none mb-8 tracking-tighter">
              Une méthode orientée <span className="text-blue-600">réussite.</span>
            </h2>
            <p className="text-slate-500 text-lg mb-10 leading-relaxed">Nous privilégions l'aspect pratique et l'immersion professionnelle pour vous rendre opérationnel dès la fin de votre cursus.</p>
            <div className="space-y-4">
              {[
                { icon: <Users size={20} />, text: "Formateurs issus du monde professionnel" },
                { icon: <Briefcase size={20} />, text: "2 mois de stage réel en entreprise" },
                { icon: <Lightbulb size={20} />, text: "Suivi individuel et coaching carrière" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">{item.icon}</div>
                  <span className="font-bold text-slate-700 text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-blue-600 rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl shadow-blue-200">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
            <h4 className="text-3xl font-black mb-6 leading-tight italic">"Il n'est jamais trop tard pour évoluer et atteindre vos objectifs."</h4>
            <div className="flex items-center gap-4">
              <div className="w-12 h-1 bg-white/30 rounded-full" />
              <p className="text-blue-100 font-black uppercase text-[10px] tracking-widest">L'équipe CG Academy</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- TÉMOIGNAGES --- */}
      <section id="témoignages" className="py-24 px-6 bg-slate-50/50 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">Paroles de stagiaires.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard name="Sarah M." role="Comptable Assistante" text="La formation est intensive mais très gratifiante. J'ai particulièrement apprécié les cas pratiques qui nous préparent réellement à la réalité du terrain." />
            <TestimonialCard name="Julien D." role="Gestionnaire RH" text="Passer d'un métier à un autre après 10 ans est un vrai défi. J'ai trouvé ici un cadre rassurant et un apprentissage très concret qui m'ont permis de construire mon nouveau projet professionnel avec confiance." />
            <TestimonialCard name="Amel B." role="Secrétaire Comptable" text="Une ambiance de travail incroyable et des locaux très bien équipés. Les formateurs sont des experts qui connaissent parfaitement le métier." />
          </div>
        </div>
      </section>

      {/* --- FINANCEMENT SECTION --- */}
      <section id="financement" className="py-24 px-6 scroll-mt-20">
        <div className="max-w-5xl mx-auto bg-slate-900 rounded-[4rem] p-12 sm:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full blur-[100px]" />
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter leading-tight">
            Votre formation <br /><span className="text-blue-500 italic">100% financée.</span>
          </h2>
          <p className="text-slate-400 mb-12 max-w-xl mx-auto">Eligible CPF et France Travail. Nous vous accompagnons dans toutes vos démarches administratives.</p>
          <div className="grid sm:grid-cols-2 gap-4 text-left">
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex items-center gap-4">
              <Wallet className="text-blue-500" />
              <div>
                <h5 className="text-white font-bold text-sm">Mon Compte Formation</h5>
                <p className="text-slate-500 text-xs">Utilisez vos droits CPF.</p>
              </div>
            </div>
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex items-center gap-4">
              <Users className="text-blue-500" />
              <div>
                <h5 className="text-white font-bold text-sm">France Travail</h5>
                <p className="text-slate-500 text-xs">Aide Individuelle à la Formation.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- ARGUMENTS & STATS SECTION (Casse Bleue) --- */}
      <section id="pourquoi-nous-stats" className="py-24 px-6 bg-blue-950 text-white rounded-[4rem] mx-4 my-8 relative overflow-hidden scroll-mt-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
          <div>
            <h2 className="text-4xl md:text-[3.5rem] font-black mb-10 leading-tight tracking-tight leading-none">Pourquoi <span className="text-blue-400">CG Academy ?</span></h2>
            <div className="grid gap-10">
              <div className="flex gap-6 items-start">
                 <div className="w-14 h-14 bg-blue-800/50 rounded-2xl flex items-center justify-center shrink-0"><CheckCircle2 className="text-blue-300" /></div>
                 <div>
                    <h4 className="text-xl font-bold mb-2">Diplôme reconnu par l'État</h4>
                    <p className="text-blue-100/70 font-medium">Toutes nos certifications sont enregistrées au RNCP.</p>
                 </div>
              </div>
              <div className="flex gap-6 items-start">
                 <div className="w-14 h-14 bg-blue-800/50 rounded-2xl flex items-center justify-center shrink-0"><Award className="text-blue-300" /></div>
                 <div>
                    <h4 className="text-xl font-bold mb-2">Booster d'employabilité</h4>
                    <p className="text-blue-100/70 font-medium">Compétences métiers recherchées par les entreprises.</p>
                 </div>
              </div>
              <div className="flex gap-6 items-start">
                 <div className="w-14 h-14 bg-blue-800/50 rounded-2xl flex items-center justify-center shrink-0"><Users className="text-blue-300" /></div>
                 <div>
                    <h4 className="text-xl font-bold mb-2">Accessibilité totale</h4>
                    <p className="text-blue-100/70 font-medium">Sans prérequis, ouvert à tous ceux qui veulent évoluer.</p>
                 </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <StatCard value="98%" label="Taux de réussite" />
            <StatCard value="100%" label="Satisfait" />
            <StatCard value="2 mois" label="Stage garanti" />
            <StatCard value="8 mois" label="Diplômé" />
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section id="faq" className="py-24 px-6 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <HelpCircle size={40} className="text-blue-600" />
            </div>
            <h2 className="text-4xl font-black text-blue-950 leading-tight">Questions Fréquentes</h2>
          </div>
          <div className="grid gap-2 border-t border-gray-100">
            <FaqItem 
              question="Comment financer ma formation ?"
              answer="Toutes nos formations peuvent être financées jusqu'à 100% via votre Compte Personnel de Formation (CPF) ou France Travail (AIF)."
            />
            <FaqItem 
              question="Y a-t-il des prérequis pour s'inscrire ?"
              answer="Non, nos formations sont accessibles à tout public motivé sans prérequis de diplôme ou d'expérience en comptabilité. Des tests de positionnement sont effectués avant l'entrée."
            />
            <FaqItem 
              question="Le diplôme est-il reconnu par l'État ?"
              answer="Oui, tous nos titres professionnels sont certifiés RNCP et reconnus par l'État français ainsi que par les recruteurs du secteur privé."
            />
            <FaqItem 
              question="Comment se passe l'intégration ?"
              answer="Une semaine d'accueil est prévue pour présenter les objectifs, l'environnement professionnel et adapter votre parcours de formation à vos besoins."
            />
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-20 px-6 border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-12">
            <div className="space-y-6">
                
                <div className="space-y-4">
                    <h5 className="font-black mb-4 uppercase text-xs tracking-widest text-blue-950">Contact</h5>
                    <div className="flex items-center justify-center gap-3 font-semibold text-gray-700 text-sm">
                        <Phone size={18} className="text-blue-700" />
                        <span>01 84 80 25 86</span>
                    </div>
                    <div className="flex items-center justify-center gap-3 font-semibold text-gray-700 text-sm">
                        <Mail size={18} className="text-blue-700" />
                        <span>contact.ogacademy@gmail.com</span>
                    </div>
                    <div className="flex items-center justify-center gap-3 font-semibold text-gray-700 text-sm">
                        <MapPin size={18} className="text-blue-700" />
                        <span>9/11 rue Georges Enesco, 94000 Créteil</span>
                    </div>
                </div>
            </div>
        </div>
        <div className={`max-w-7xl mx-auto mt-20 pt-10 border-t border-gray-100 flex justify-center text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 text-center leading-relaxed px-4`}>
            © 2026 CG Academy
        </div>
      </footer>
    </div>
  );
}