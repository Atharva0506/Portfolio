import { JSX, Children, isValidElement } from 'react'
import { highlight } from 'sugar-high'
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'

import Counter from '@/components/counter'
import MermaidDiagram from '@/components/mermaid-diagram'

function Code({ children, ...props }: any) {
  const code =
    typeof children === 'string' ? children.replace(/\r\n/g, '\n') : children
  let codeHTML = highlight(code)
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
}

function Pre({ children, ...props }: any) {
  const child = Children.only(children)
  if (isValidElement(child)) {
    const childProps = child.props as any
    const className = childProps?.className || ''
    if (className.includes('language-mermaid')) {
      const chart = childProps?.children || ''
      return <MermaidDiagram chart={String(chart)} />
    }
  }
  return <pre {...props}>{children}</pre>
}

function Table({ data, ...props }: any) {
  return (
    <div className='my-8 overflow-x-auto'>
      <table
        className='min-w-full divide-y divide-border rounded-lg border border-border'
        {...props}
      />
    </div>
  )
}

function Thead(props: any) {
  return <thead className='bg-muted' {...props} />
}

function Tbody(props: any) {
  return <tbody className='divide-y divide-border bg-card' {...props} />
}

function Tr(props: any) {
  return <tr className='transition-colors hover:bg-muted/50' {...props} />
}

function Th(props: any) {
  return (
    <th
      className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground'
      {...props}
    />
  )
}

function Td(props: any) {
  return (
    <td
      className='whitespace-nowrap px-6 py-4 text-sm text-foreground'
      {...props}
    />
  )
}

const components = {
  code: Code,
  pre: Pre,
  Counter,
  table: Table,
  thead: Thead,
  tbody: Tbody,
  tr: Tr,
  th: Th,
  td: Td
}

export default function MDXContent(
  props: JSX.IntrinsicAttributes & MDXRemoteProps
) {
  return (
    <MDXRemote
      {...props}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeSlug]
        }
      }}
      components={{ ...components, ...(props.components || {}) }}
    />
  )
}
