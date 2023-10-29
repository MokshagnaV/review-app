import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  useAnimate,
  useInView,
  motion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { ThemeToggle } from '@/components/ThemeToggle'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  Workflow,
  UserCheck2,
  Wrench,
  SearchCheck,
  AreaChart,
  Scaling,
  MonitorSmartphone,
  Twitter,
  Instagram,
  Linkedin,
  Github,
} from 'lucide-react'

// types for InFromXAxis component
type fadeDirection = 'left' | 'right'

// data
const features = [
  {
    title: 'Easy Integration',
    description:
      'Quickly add a review system to your website without the need for complex backend development.',
    imageSrc: <Workflow />,
  },
  {
    title: 'User-Friendly Interface',
    description:
      'The Review App provides an intuitive interface for users to submit reviews and ratings.',
    imageSrc: <UserCheck2 />,
  },
  {
    title: 'Customization',
    description:
      "Customize the look and feel of the review widget to match your website's design.",
    imageSrc: <Wrench />,
  },
  {
    title: 'Moderation',
    description:
      'Review submissions can be moderated to ensure quality and prevent spam.',
    imageSrc: <SearchCheck />,
  },
  {
    title: 'Analytics',
    description:
      'Gain insights into user feedback with built-in analytics and reporting features.',
    imageSrc: <AreaChart />,
  },
  {
    title: 'Scalable',
    description:
      'Designed to handle a growing number of reviews, making it suitable for websites of all sizes.',
    imageSrc: <Scaling />,
  },
  {
    title: 'Responsive',
    description:
      'Review App is responsive and works seamlessly on various devices and screen sizes.',
    imageSrc: <MonitorSmartphone />,
  },
]

const navLinks = [
  { label: 'Home', href: '/templates/mokshagnav' },
  { label: 'About', href: '/templates/mokshagnav/about' },
  { label: 'Contact', href: '/templates/mokshagnav/contact' },
]

const footerLinks = [
  { label: 'Home', href: '/templates/mokshagnav/' },
  { label: 'About', href: 'templates/mokshagnav/about' },
  { label: 'Contact Us', href: 'templates/mokshagnav/contact' },
  { label: 'Terms', href: '/terms' },
  { label: 'Refund Policy', href: '/refund-policy' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
]

const socials = [
  { icon: <Twitter />, href: 'https://twitter.com/review-app' },
  { icon: <Instagram />, href: 'https://instagram.com/review-app' },
  { icon: <Linkedin />, href: 'https://linkedin.com/review-app' },
  { icon: <Github />, href: 'https://github.com/piyushgarg-dev/review-app' },
]

const howItWorks = [
  {
    title: 'Create an Application',
    description:
      'Sign up and create a review application for your website on Review App.',
    imageSrc: '/mokshagnav/landing-page/images/review-dashboard-dark.png',
  },
  {
    title: 'Customize Widget',
    description:
      "Customize the review widget's appearance to match your website's branding.",
    imageSrc: '/mokshagnav/landing-page/images/review-form-dark.png',
  },
  {
    title: 'Integration',
    description:
      "Integrate the provided code snippet into your website's pages where you want the review widget to appear.",
    imageSrc: '/mokshagnav/landing-page/images/review-form-light.png',
  },
  {
    title: 'Gather Reviews',
    description:
      'Users visiting your website can easily submit reviews and ratings through the widget.',
    imageSrc: '/mokshagnav/landing-page/images/review-form-light.png',
  },
  {
    title: 'Moderate Reviews',
    description:
      'Review submissions can be moderated through the Review App dashboard.',
    imageSrc: '/mokshagnav/landing-page/images/review-form-light.png',
  },
  {
    title: 'Analytics and Insights',
    description:
      'Gain valuable insights from user reviews with built-in analytics and reporting.',
    imageSrc: '/mokshagnav/landing-page/images/review-form-light.png',
  },
]

// Types for some components
interface SectionHeadBadgeType {
  title: string
  className?: string
}
interface FeatureCardType {
  title: string
  description: string
  imageSrc: JSX.Element
  className?: string
}
interface WorkStepType {
  step: number
  title: string
  description: string
  imageSrc: string
  className?: string
}

// Framer motion Animation HOC
function FadeIn({
  children,
  delay,
  className,
}: {
  children: React.JSX.Element
  delay?: number
  className?: string
}) {
  const fadeInAnimationVariant = {
    initial: {
      opacity: 0,
      y: 100,
    },
    animate: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.05 * index, duration: 0.5 },
    }),
  }

  return (
    <motion.div
      variants={fadeInAnimationVariant}
      initial="initial"
      whileInView="animate"
      viewport={{
        once: true,
      }}
      custom={delay}
      className={className}
    >
      {children}
    </motion.div>
  )
}
// Framer motion Animation HOC
function InFromXAxis({
  children,
  direction,
  delay,
  className,
}: {
  children: React.JSX.Element
  direction: fadeDirection
  delay?: number
  className?: string
}) {
  const fadeInLeftAnimationVariant = {
    initial: {
      opacity: 0,
      x: -100,
    },
    animate: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.05 * index, duration: 0.5 },
    }),
  }

  const fadeInRightAnimationVariant = {
    initial: {
      opacity: 0,
      x: 100,
    },
    animate: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.05 * index, duration: 0.5 },
    }),
  }

  return (
    <motion.div
      variants={
        direction === 'left'
          ? fadeInLeftAnimationVariant
          : fadeInRightAnimationVariant
      }
      initial="initial"
      whileInView="animate"
      viewport={{
        once: true,
      }}
      custom={delay}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Icon component
function MenuIcon({
  status,
  setStatus,
}: {
  status: boolean
  setStatus: React.Dispatch<React.SetStateAction<boolean>>
}) {
  return (
    <div
      className="relative rounded-full bg-primary p-5"
      onClick={() =>
        setStatus((prev: boolean) => {
          return !prev
        })
      }
    >
      <span
        className={`${
          status ? 'translate-y-[0.5rem] rotate-45' : ''
        } absolute left-2 top-[0.625rem] h-1 w-6 rounded-full bg-background transition-all duration-500`}
      ></span>
      <span
        className={`${
          status ? 'w-0' : 'w-6'
        } absolute left-2 top-[1.125rem] h-1 rounded-full bg-background transition-all duration-500`}
      ></span>
      <span
        className={`${
          status ? '-translate-y-[0.5rem] -rotate-45' : ''
        } absolute left-2 top-[1.625rem] h-1 w-6 rounded-full bg-background transition-all duration-500`}
      ></span>
    </div>
  )
}

// ------------------------ Reused components -------------------------------------
const GetStartedButton = () => {
  return (
    <button className="before:content[''] after:content[''] group group relative flex h-14 w-56 origin-left overflow-hidden rounded-lg border bg-neutral-100 p-3 text-left text-base font-bold underline underline-offset-2 duration-500 before:absolute before:right-1 before:top-1 before:z-10  before:h-12 before:w-12 before:rounded-full before:bg-violet-500 before:blur-lg before:duration-500 after:absolute after:right-8 after:top-3 after:z-10 after:h-20 after:w-20 after:rounded-full after:bg-primary  after:blur-lg  after:duration-500 hover:border-primary hover:bg-background hover:text-primary hover:underline hover:decoration-2 hover:underline-offset-4 hover:duration-500 hover:before:-bottom-8 hover:before:right-12 hover:before:blur  hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] hover:after:-right-8 group-hover:before:duration-500 group-hover:after:duration-500 dark:bg-slate-900  dark:text-gray-50 hover:dark:bg-background md:h-16 md:w-64 ">
      Get Started{' '}
      <ArrowRight className="z-10 ml-5 -translate-x-4 transition-all duration-500 group-hover:translate-x-0 dark:text-white" />
    </button>
  )
}

const Emphasize = ({ children }: { children: string }) => {
  return <span className="font-bold capitalize text-primary">{children}</span>
}

const SectionHeadBadge = ({ title, className }: SectionHeadBadgeType) => {
  return (
    <div className={`flex justify-center ${className}`}>
      <div className="group flex justify-center">
        <div className="group relative -z-10 m-auto overflow-hidden rounded-full bg-background p-[1px] text-xl font-bold">
          <h2 className="z-10 max-w-[12.5rem] rounded-full bg-background px-6 py-2 text-center">
            {title}
          </h2>
          <div
            className="absolute -left-1 -top-1 -z-20 h-40 w-52 bg-gradient-to-r from-violet-200 via-violet-400 to-violet-600
      px-6 py-2 transition-all duration-500 group-hover:rotate-180 group-hover:bg-red-800"
          ></div>
        </div>
      </div>
    </div>
  )
}

// Used to create each section in page
const Section = ({
  children,
  title,
}: {
  children: React.ReactNode
  title: string
}) => {
  return (
    <section className="container py-10">
      <FadeIn>
        <SectionHeadBadge title={title} className="mb-5" />
      </FadeIn>
      {children}
    </section>
  )
}

// --------------------------- sections of page ------------------------------------
const Header = () => {
  const router = useRouter()
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, {
    margin: '100px 0px 0px 0px',
  })
  const [headerScope, animate] = useAnimate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // handles animation of the header changing to small header on scroll down
  useEffect(() => {
    if (!headerInView) {
      animate(headerScope.current, {
        width: 'fit-content',
        borderRadius: '999px',
        margin: '20px',
        padding: '5px',
      })
    } else {
      animate(headerScope.current, {
        width: '1440px',
        borderRadius: '0px',
        margin: '0px',
        padding: '20px',
      })
    }
  }, [headerInView, animate, headerScope])

  return (
    <header
      ref={headerRef}
      className="relative m-auto max-md:mb-10 max-md:flex max-md:w-full 
       max-md:justify-between max-md:bg-slate-300 max-md:bg-opacity-80 max-md:p-5 max-md:backdrop-blur max-md:dark:bg-slate-900  max-md:dark:bg-opacity-80"
    >
      <div className="flex justify-center md:mb-28">
        <Link href="/" className="left-5 top-5 z-30 md:absolute md:top-4">
          <div className="flex items-center gap-4 ">
            <Image
              src="/mokshagnav/landing-page/images/review-app-logo.png"
              width={60}
              height={60}
              alt="logo"
              className="w-14 max-md:h-10 max-md:w-10 "
            />
            <p className="text-2xl font-bold md:text-3xl ">Review App</p>
          </div>
        </Link>
        {/* Nav links */}
        <nav className="fixed z-20 flex w-full justify-center max-md:hidden">
          <motion.div
            ref={headerScope}
            className="flex items-center justify-center gap-4 bg-slate-300 bg-opacity-80 p-5 backdrop-blur  dark:bg-slate-900 dark:bg-opacity-80"
          >
            {navLinks.map((nav) => (
              <Link
                href={nav.href}
                key={nav.label}
                className={`whitespace-nowrap rounded-full px-8 py-3 ${
                  router.pathname === nav.href
                    ? 'bg-white dark:bg-slate-700'
                    : ''
                }`}
              >
                {nav.label}
              </Link>
            ))}
          </motion.div>
        </nav>
        {/* Right side buttons */}
        <div className="absolute right-5 top-6 z-20 flex items-center gap-5 max-md:hidden">
          <Link href="/login">
            <Button className="rounded-full" variant="ghost">
              Log in
            </Button>
          </Link>
          <Link href="signup">
            <Button className="rounded-full" size="lg">
              Get Started
            </Button>
          </Link>
          <ThemeToggle />
        </div>
      </div>

      {/* For Smaller Devices */}
      <button className="z-20 md:hidden">
        <MenuIcon status={isMenuOpen} setStatus={setIsMenuOpen} />
      </button>
      <div
        className={`absolute left-0 top-0 flex w-full flex-col items-center justify-center gap-4 bg-slate-300 bg-opacity-80 p-5 pt-20 backdrop-blur dark:bg-slate-900 dark:bg-opacity-80 ${
          isMenuOpen ? 'translate-y-0' : '-translate-y-full'
        } z-10 transition-all duration-500`}
      >
        <Button className="w-full font-bold" variant="outline" size="lg">
          Sign Up
        </Button>
        <Button className="w-full font-bold" variant="outline" size="lg">
          Login
        </Button>
        <ul className="w-full ">
          {navLinks.map((nav) => (
            <li key={nav.label} className="w-full p-2 text-left">
              <Link href={nav.href}>{nav.label}</Link>
            </li>
          ))}
        </ul>
        <div className="flex w-full justify-start">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

const Hero = () => {
  const imageRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ['0 1', '0.5 0.5'],
  })
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const y = useTransform(scrollYProgress, [0, 1], [100, 0])

  return (
    <div
      ref={imageRef}
      className="container flex flex-col items-center justify-center gap-5 py-24 md:gap-10 md:py-32"
    >
      <FadeIn>
        <h1 className="text-4xl font-bold md:text-5xl xl:text-7xl">
          Review App
        </h1>
      </FadeIn>
      <FadeIn delay={2}>
        <p className="max-w-xl text-center text-lg text-slate-500 xl:text-xl">
          Helps to gather valuable <Emphasize>feedback</Emphasize> and{' '}
          <Emphasize>reviews</Emphasize> from your website&apos;s users
        </p>
      </FadeIn>
      <FadeIn
        className="my-10 flex flex-wrap justify-center gap-4 md:gap-6"
        delay={3}
      >
        <>
          <GetStartedButton />
          <button className="ude ease h-14 w-40 rounded-lg border bg-neutral-100  underline underline-offset-2 transition-all duration-500 hover:border-primary hover:bg-background hover:decoration-2 hover:underline-offset-4 dark:bg-slate-900 hover:dark:bg-background md:h-16 md:w-48">
            Book Demo
          </button>
        </>
      </FadeIn>
      <motion.div style={{ y, opacity }}>
        <Image
          src="/mokshagnav/landing-page/images/review-form-dark.png"
          alt="form edit page"
          width={1000}
          height={1000}
          className="rounded-xl shadow-xl shadow-slate-800 transition-all duration-500 sm:hover:scale-105 sm:hover:shadow-2xl sm:hover:shadow-slate-900"
        />
      </motion.div>
    </div>
  )
}
// -------------------------- reused component for featureSection only ------------------
const FeatureCard = ({
  title,
  description,
  className,
  imageSrc,
}: FeatureCardType) => {
  return (
    <div
      className={`group relative max-w-sm overflow-hidden rounded-xl border p-[0.063rem] ${className}`}
    >
      <div className="flex h-full w-full flex-col justify-around rounded-xl bg-background p-8">
        <div className="flex flex-col items-center">
          <div className="text-primary">{imageSrc}</div>
          <h3 className="mb-4 text-center text-xl font-bold">{title}</h3>
        </div>
        <p className="text-center opacity-70">{description}</p>
      </div>
      <div className="absolute top-10 -z-10 h-[40%] w-[150%] -rotate-45 bg-slate-700 blur-2xl transition-all duration-500 group-hover:rotate-45 dark:bg-slate-300"></div>
    </div>
  )
}

const FeaturesSection = () => {
  return (
    <Section title="Features">
      <FadeIn delay={2}>
        <p className="m-auto max-w-xl pb-14 pt-5 text-center text-4xl font-bold md:text-5xl">
          Make the <Emphasize>Review</Emphasize> taking process easier
        </p>
      </FadeIn>
      <div>
        <ul className="flex w-full flex-wrap items-stretch justify-center gap-10 py-10">
          {features.map((feature, index) => (
            <FadeIn
              key={index}
              className="h-xl flex w-full flex-grow justify-center sm:w-[50%] md:w-[30%] xl:w-[20%]"
              delay={index}
            >
              <FeatureCard
                title={feature.title}
                description={feature.description}
                imageSrc={feature.imageSrc}
                className="h-full"
              />
            </FadeIn>
          ))}
        </ul>
      </div>
    </Section>
  )
}
// -------------------------- reused component for WorkingSection only ------------------
const WorkStep = ({
  step,
  title,
  description,
  className,
  imageSrc,
}: WorkStepType) => {
  return (
    <div
      className={`relative h-full max-h-[25rem] overflow-hidden rounded-xl ${className}`}
    >
      <span className="absolute left-2 top-2 flex aspect-square h-7 w-7 items-center justify-center rounded-full border-2 border-slate-900  font-bold text-slate-900 md:h-10 md:w-10">
        {step}
      </span>
      <div className="absolute -left-[7%] -top-[5%] h-20 w-20 bg-violet-900 blur-3xl"></div>

      <div className="overflow-hidden bg-slate-300 pb-4 pl-10 pr-4 pt-10 xl:h-[70%]">
        <Image
          className="w-full rounded-xl"
          src={imageSrc}
          width={1000}
          height={1000}
          alt={title}
        />
      </div>
      <div className="w-full bg-slate-900 p-5 text-slate-100 xl:h-[30%]">
        <div className="flex w-full items-center gap-5 bg-opacity-70 text-xl font-bold backdrop-blur-xl md:text-2xl">
          <h3>{title}</h3>
        </div>
        <p className="md:text-normal text-sm">{description}</p>
      </div>
    </div>
  )
}

const WorkingSection = () => {
  return (
    <Section title="How it Works ❔">
      <FadeIn delay={2}>
        <p className="m-auto max-w-xl pb-14 pt-5 text-center text-4xl font-bold md:text-5xl">
          You can start getting <Emphasize>review</Emphasize> of your app in few
          steps
        </p>
      </FadeIn>
      <div className="grid-roe grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-6">
        {/* {howItWorks.map((step, index) => (
          <WorkStep
            key={index}
            step={index + 1}
            title={step.title}
            description={step.description}
            imageSrc={step.imageSrc}
          />
        ))} */}
        <InFromXAxis direction="left" className="xl:col-span-4">
          <WorkStep
            step={1}
            title={howItWorks[0].title}
            description={howItWorks[0].description}
            imageSrc={howItWorks[0].imageSrc}
          />
        </InFromXAxis>
        <InFromXAxis direction="right" className="xl:col-span-2" delay={2}>
          <WorkStep
            step={2}
            title={howItWorks[1].title}
            description={howItWorks[1].description}
            imageSrc={howItWorks[1].imageSrc}
          />
        </InFromXAxis>
        <InFromXAxis direction="left" className="xl:col-span-2" delay={3}>
          <WorkStep
            step={3}
            title={howItWorks[2].title}
            description={howItWorks[2].description}
            imageSrc={howItWorks[2].imageSrc}
          />
        </InFromXAxis>
        <InFromXAxis direction="right" className="xl:col-span-4" delay={4}>
          <WorkStep
            step={4}
            title={howItWorks[3].title}
            description={howItWorks[3].description}
            imageSrc={howItWorks[3].imageSrc}
          />
        </InFromXAxis>
        <InFromXAxis direction="left" className="xl:col-span-3" delay={5}>
          <WorkStep
            step={5}
            title={howItWorks[4].title}
            description={howItWorks[4].description}
            imageSrc={howItWorks[4].imageSrc}
          />
        </InFromXAxis>
        <InFromXAxis direction="right" className="xl:col-span-3" delay={6}>
          <WorkStep
            step={6}
            title={howItWorks[5].title}
            description={howItWorks[5].description}
            imageSrc={howItWorks[5].imageSrc}
          />
        </InFromXAxis>
      </div>
    </Section>
  )
}

const AddWidgetSection = () => {
  return (
    <section className="container py-20">
      <FadeIn>
        <h2 className="m-auto my-5 max-w-xl pb-14 pt-5 text-center text-4xl font-bold md:text-5xl">
          Add <Emphasize>review</Emphasize> widget in your app right now!
        </h2>
      </FadeIn>
      <FadeIn delay={2} className="m-auto flex justify-center">
        <GetStartedButton />
      </FadeIn>
    </section>
  )
}

const Footer = () => {
  return (
    <section className="w-full border-t-2 border-dashed bg-slate-300 py-10 dark:bg-slate-900">
      <div className="flex flex-col gap-10">
        <div className="flex justify-center gap-5 text-slate-500">
          {socials.map((social, index) => (
            <FadeIn key={index} delay={index}>
              <Link
                href={social.href}
                className=" hover:text-slate-900 dark:hover:text-slate-100"
              >
                {social.icon}
              </Link>
            </FadeIn>
          ))}
        </div>
        <div>
          <ul className="item-center flex flex-col justify-center gap-5 text-slate-500 sm:flex-row">
            {footerLinks.map((footerLink, index) => (
              <FadeIn key={footerLink.label} delay={index}>
                <li className="text-center transition-all hover:text-slate-900 dark:hover:text-slate-100">
                  <Link href={footerLink.href}>{footerLink.label}</Link>
                </li>
              </FadeIn>
            ))}
          </ul>
        </div>
        <div className="flex justify-center text-slate-500">
          © 2023 Review App. All rights reserved{' '}
        </div>
      </div>
    </section>
  )
}

const Main = () => {
  return (
    <main className=" m-auto max-w-7xl">
      <Hero />
      <FeaturesSection />
      <WorkingSection />
      <AddWidgetSection />
    </main>
  )
}

const Background = () => {
  const { scrollYProgress } = useScroll()

  const x = useTransform(scrollYProgress, [0, 0.4, 1], [0, 500, 0])
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0, -200])

  return (
    <motion.div className="fixed -z-50" style={{ x, y }}>
      <motion.div
        className="absolute left-10 top-52  
      -z-30 h-[17vw] w-[20vw] rounded-full bg-rose-400 opacity-80 blur-2xl dark:bg-rose-950"
        animate={{
          scale: [1, 1.1, 1.1, 1],
          opacity: [0.8, 0.7, 0.5, 0.8],
          y: [0, -20, -10, 0],
          x: ['0%', '20%', '30%', '0%'],
        }}
        transition={{
          ease: 'easeInOut',
          duration: 5,
          repeat: Infinity,
        }}
      ></motion.div>
      <motion.div
        className="absolute left-10 top-52  
      -z-30 h-[20vw] w-[26vw] rounded-full bg-violet-400 opacity-80 blur-2xl dark:bg-violet-950"
        animate={{
          scale: [1.2, 1, 1, 1.2],
          opacity: [0.8, 0.7, 0.5, 0.8],
          y: [0, 20, 50, 0],
          x: ['0%', '20%', '30%', '0%'],
        }}
        transition={{
          ease: 'easeInOut',
          duration: 5,
          repeat: Infinity,
        }}
      ></motion.div>
      <motion.div
        className="absolute left-16 top-52  
      -z-30 h-[8vw] w-[10vw] rounded-full bg-violet-50 opacity-80 blur-2xl dark:bg-violet-600"
        animate={{
          scale: [1.2, 2, 2, 1.2],
          opacity: [0.8, 0.7, 0.7, 0.8],
          y: [0, 20, 50, 0],
          x: ['0%', '30%', '80%', '0%'],
        }}
        transition={{
          ease: 'easeInOut',
          duration: 5,
          repeat: Infinity,
        }}
      ></motion.div>
    </motion.div>
  )
}

function index() {
  return (
    <div className="relative overflow-x-hidden">
      <Background />
      <Header />
      <Main />
      <Footer />
    </div>
  )
}

export default index

export {
  Background,
  Header,
  Footer,
  FadeIn,
  Section,
  Emphasize,
  InFromXAxis,
  AddWidgetSection,
}
