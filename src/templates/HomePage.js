import React from 'react'
import { graphql } from 'gatsby'

import PostSection from '../components/PostSection'
import Layout from '../components/Layout'
import Card from '../components/Card'

import './HomePage.scss'

// Export Template for use in CMS preview
export const HomePageTemplate = ({ services, posts, body }) => (
  <main className="Home">
    <section className="section">
      <div className="container">
        <h2>Services</h2>
        <div className="Services--Container">
          {services.map((service, i) => {
            const image = {
              src: service.image,
              alt: service.name,
              background: true
            }
            return (
              <Card
                key={i}
                className="Service"
                img={image}
                heading={service.name}
              >
                <p>{service.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
    
  </main>
)

// Export Default HomePage for front-end
const HomePage = ({ data: { page, posts } }) => (
  <Layout meta={page.frontmatter.meta || false}>
    <HomePageTemplate
      {...page}
      {...page.frontmatter}
      body={page.html}
      posts={posts.edges.map(post => ({
        ...post.node,
        ...post.node.frontmatter,
        ...post.node.fields
      }))}
    />
  </Layout>
)

export default HomePage

export const pageQuery = graphql`
  ## Query for HomePage data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query HomePage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      frontmatter {
        title
        services {
          image
          name
          description
        }
      }
    }
    posts: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "posts" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            date
            excerpt
            categories {
              category
            }
            featuredImage
          }
        }
      }
    }
  }
`
