import React from 'react'
import { graphql } from 'gatsby'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content.js'
import Layout from '../components/Layout.js'
import Card from '../components/Card.js'

import LinkedIn from '../images/social/linkedin.svg'

import './AboutPage.scss'

const SocialIcons = {
  // Facebook,
  // Github,
  LinkedIn
  // Twitter
}

// Export Template for use in CMS preview
export const AboutPageTemplate = ({
  title,
  subtitle,
  featuredImage,
  section1,
  section2
}) => (
  <main>
    <PageHeader
      title={title}
      subtitle={subtitle}
      backgroundImage={featuredImage}
    />
    <section className="section">
      <div className="container">
        <div className="Bio--Container">
          {section1.map((bio, i) => {
            const image = {
              src: bio.image,
              alt: bio.name
            }
            return (
              <Card key={i} className="Bio" img={image} heading={bio.name}>
                <p>{bio.title}</p>
                <div className="Bio--Social">
                  {bio.social.map(profile => {
                    const Icon = SocialIcons[profile.platform]
                    return (
                      <a key={profile.url} href={profile.url}>
                        <Icon className={profile.platform} /> {profile.platform}{' '}
                        Profile
                      </a>
                    )
                  })}
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <Content source={section2} />
      </div>
    </section>
  </main>
)

const AboutPage = ({ data: { page } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <AboutPageTemplate {...page} {...page.frontmatter} body={page.html} />
  </Layout>
)

export default AboutPage

export const pageQuery = graphql`
  query AboutPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      frontmatter {
        title
        template
        subtitle
        featuredImage
        section1 {
          image
          name
          title
          social {
            platform
            url
          }
        }
        section2
      }
    }
  }
`
