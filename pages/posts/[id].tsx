import Layout from '../../components/layout'
import { getAllPostIds, getPostDataContent } from '../../lib/posts'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {coldarkDark} from 'react-syntax-highlighter/dist/cjs/styles/prism'
import utilStyles from '../../styles/utils.module.css'

export default function Post({ postData }) {

  return (
    <Layout home={undefined}>
      <article className={utilStyles['markdown-body']}>
        <ReactMarkdown children={postData.contentHtml} rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]} 
          components={{
            code({node, inline, className, children, ...props}) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, '')}
                  style={coldarkDark}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            }
          }}
        />
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostDataContent({ id: params.id })
  return {
    props: {
      postData
    }
  }
}
