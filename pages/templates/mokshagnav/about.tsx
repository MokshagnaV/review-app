import React, { ReactNode, RefObject, useEffect, useRef, useState } from 'react'
import {
  Background,
  Header,
  Footer,
  FadeIn,
  Section,
  Emphasize,
  InFromXAxis,
  AddWidgetSection,
} from '.'
import Image from 'next/image'
import axios from 'axios'
import Link from 'next/link'
import { useInView, motion } from 'framer-motion'

type contributorType = {
  id: number
  username: string
  avatar: string
  profileLink: string
}

type githubAPIData = {
  login: string
  id: string
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: string
  contributions: string
}

const MemberCard = ({
  name,
  role,
  imageSrc,
}: {
  name: string
  role: string
  imageSrc: string
}) => {
  return (
    <div className="group relative w-fit overflow-hidden border-4 border-foreground bg-foreground">
      <Image
        src={imageSrc}
        width={300}
        height={300}
        alt={name}
        className="w-72 transition-all duration-500 group-hover:scale-110"
      />
      <div className="absolute bottom-[2.75rem] left-0 bg-primary px-4 py-2 text-2xl font-bold text-foreground">
        {name}{' '}
      </div>
      <div className="absolute bottom-0 left-0 -translate-x-[100%] bg-foreground px-4 py-2 text-xl font-bold text-primary transition-all duration-500 group-hover:translate-x-0">
        {role}
      </div>
    </div>
  )
}

const Hero = () => {
  return (
    <div className="container flex h-[70vh] flex-col items-center justify-center gap-5 py-24 md:gap-10 md:py-32">
      <FadeIn>
        <h1 className="text-4xl font-bold md:text-5xl xl:text-7xl">About Us</h1>
      </FadeIn>
      <FadeIn delay={2}>
        <p className="max-w-xl text-center text-lg text-slate-500 xl:text-xl">
          Welcome to <Emphasize>Review App</Emphasize>, your solution for
          hassle-free review management on your website. We&apos;re excited to
          tell you a bit more about who we are and why we created this platform.
        </p>
      </FadeIn>
    </div>
  )
}

const Mission = () => {
  return (
    <Section title="Our Story">
      <FadeIn delay={2}>
        <p className="m-auto max-w-2xl pb-14 pt-5 text-center text-2xl font-bold md:text-3xl md:leading-10">
          At <Emphasize>Review App</Emphasize>, we&apos;re on a mission to
          revolutionize the way you manage reviews on your website. We started
          this journey in 2023 with a passion for user feedback and a commitment
          to open source.
        </p>
      </FadeIn>
    </Section>
  )
}

const MeetTheTeam = () => {
  return (
    <Section title="Meet The Team">
      <FadeIn delay={2}>
        <p className="m-auto max-w-2xl pb-14 pt-5 text-center text-2xl font-bold md:text-3xl md:leading-10">
          Our dedicated <Emphasize>team</Emphasize> brings diverse skills and
          backgrounds to the table, united by a shared goal: to simplify{' '}
          <Emphasize>review management</Emphasize> for website owners.
        </p>
      </FadeIn>
      <div className="flex flex-wrap justify-center gap-10 py-10">
        <InFromXAxis direction="left">
          <MemberCard
            name="Hemath"
            role="Frontend Lead"
            imageSrc="https://avatars.githubusercontent.com/u/85151171?v=4"
          />
        </InFromXAxis>
        <InFromXAxis direction="right">
          <MemberCard
            name="Piyush Grag"
            role="Backend Lead"
            imageSrc="https://avatars.githubusercontent.com/u/44976328?v=4"
          />
        </InFromXAxis>
      </div>
    </Section>
  )
}

const OpenSourceCommunity = () => {
  const [contributors, setContributors] = useState<contributorType[]>([])

  const containerVariant = {
    hidden: { opacity: 1, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  }
  const itemVariant = {
    hidden: { y: 100, opacity: 0 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.05 * index, duration: 0.5 },
    }),
  }

  useEffect(() => {
    axios
      .get(
        'https://api.github.com/repos/piyushgarg-dev/review-app/contributors'
      )
      .then((res) => {
        const data = res.data
        const contributors = data.map((d: githubAPIData) => {
          const avatar = d.avatar_url
          const username = d.login
          const profileLink = d.html_url
          const id = d.id
          return { avatar, username, profileLink, id }
        })
        setContributors(contributors)
      })
  }, [])

  return (
    <Section title="Open Source Community">
      <FadeIn delay={2}>
        <p className="m-auto max-w-2xl pb-14 pt-5 text-center text-xl font-bold md:text-2xl md:leading-10">
          <Emphasize>Review App</Emphasize> thrives on collaboration. Our
          open-source community of developers and contributors is what makes
          this project possible. <Emphasize>Join us</Emphasize> and{' '}
          <Emphasize>contribute</Emphasize> to making website reviews better for
          all.
        </p>
      </FadeIn>
      <motion.ul
        className="m-auto flex max-w-6xl flex-wrap justify-center gap-10"
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {contributors.map((contributor, index) => (
          <motion.li key={contributor.id} variants={itemVariant} custom={index}>
            <Link
              href={contributor.profileLink}
              className="flex flex-col items-center justify-center gap-2"
            >
              <div className="overflow-hidden rounded-full bg-violet-700 p-1">
                <Image
                  src={contributor.avatar}
                  width={80}
                  height={80}
                  alt={contributor.username}
                  className="w-20 rounded-full"
                />
              </div>
              <p>{contributor.username}</p>
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  )
}

function About() {
  return (
    <div className="relative overflow-x-hidden">
      <Background />
      <Header />
      {/* The only change from home page 
      TODO: need to create a layout 
      */}
      <main>
        <Hero />
        <Mission />
        <MeetTheTeam />
        <OpenSourceCommunity />
        <AddWidgetSection />
      </main>
      <Footer />
    </div>
  )
}

export default About
