'use client'

import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'
import mermaid from 'mermaid'

const DARK_THEME_VARS = {
    primaryColor: '#3b82f6',
    primaryTextColor: '#f8fafc',
    primaryBorderColor: '#60a5fa',
    lineColor: '#94a3b8',
    secondaryColor: '#1e293b',
    tertiaryColor: '#0f172a',
    background: '#0f172a',
    mainBkg: '#1e293b',
    nodeBorder: '#60a5fa',
    clusterBkg: '#1e293b',
    titleColor: '#f8fafc',
    edgeLabelBackground: '#1e293b',
    nodeTextColor: '#f8fafc',
}

const LIGHT_THEME_VARS = {
    primaryColor: '#dbeafe',
    primaryTextColor: '#1e293b',
    primaryBorderColor: '#3b82f6',
    lineColor: '#64748b',
    secondaryColor: '#f1f5f9',
    tertiaryColor: '#f8fafc',
    background: '#ffffff',
    mainBkg: '#eff6ff',
    nodeBorder: '#3b82f6',
    clusterBkg: '#f8fafc',
    titleColor: '#0f172a',
    edgeLabelBackground: '#ffffff',
    nodeTextColor: '#1e293b',
}

let mermaidIdCounter = 0

export default function MermaidDiagram({ chart }: { chart: string }) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [svg, setSvg] = useState<string>('')
    const [error, setError] = useState<string>('')
    const { resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (!mounted) return

        const isDark = resolvedTheme === 'dark'

        mermaid.initialize({
            startOnLoad: false,
            theme: isDark ? 'dark' : 'default',
            themeVariables: isDark ? DARK_THEME_VARS : LIGHT_THEME_VARS,
            fontFamily: 'ui-sans-serif, system-ui, sans-serif',
            fontSize: 14,
            flowchart: {
                htmlLabels: true,
                curve: 'basis',
                padding: 16,
            },
        })

        const renderChart = async () => {
            try {
                const id = `mermaid-${Date.now()}-${mermaidIdCounter++}`
                const { svg: renderedSvg } = await mermaid.render(id, chart.trim())
                setSvg(renderedSvg)
            } catch (err: any) {
                console.error('Mermaid render error:', err)
                setError(err.message || 'Failed to render diagram')
            }
        }

        renderChart()
    }, [chart, resolvedTheme, mounted])

    if (!mounted) {
        return (
            <div className="my-8 flex justify-center rounded-lg border border-border bg-card/50 p-6">
                <div className="h-32 w-full animate-pulse rounded bg-muted" />
            </div>
        )
    }

    if (error) {
        return (
            <pre className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
                <code>{chart}</code>
            </pre>
        )
    }

    return (
        <div
            ref={containerRef}
            className="my-8 flex justify-center overflow-x-auto rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-card/50 dark:shadow-none"
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    )
}
