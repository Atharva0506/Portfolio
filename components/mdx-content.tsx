
import { JSX } from 'react'
import { highlight } from 'sugar-high'
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'

import Counter from '@/components/counter'

function Code({ children, ...props }: any) {
  let codeHTML = highlight(children)
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
}

function Table({ data, ...props }: any) {
  return (
    <div className="overflow-x-auto my-8">
      <table className="min-w-full divide-y divide-border border border-border rounded-lg" {...props} />
    </div>
  )
}

function Thead(props: any) {
  return <thead className="bg-muted" {...props} />
}

function Tbody(props: any) {
  return <tbody className="bg-card divide-y divide-border" {...props} />
}

function Tr(props: any) {
  return <tr className="hover:bg-muted/50 transition-colors" {...props} />
}

function Th(props: any) {
  return (
    <th
      className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
      {...props}
    />
  )
}

function Td(props: any) {
  return (
    <td
      className="px-6 py-4 whitespace-nowrap text-sm text-foreground"
      {...props}
    />
  )
}

const components = {
  code: Code,
  Counter,
  table: Table,
  thead: Thead,
  tbody: Tbody,
  tr: Tr,
  th: Th,
  td: Td,
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
        },
      }}
      components={{ ...components, ...(props.components || {}) }}
    />
  )
}
