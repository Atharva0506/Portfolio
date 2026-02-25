'use client'

import { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'

mermaid.initialize({
    startOnLoad: false,
    theme: 'dark',
    themeVariables: {
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
    },
    fontFamily: 'ui-sans-serif, system-ui, sans-serif',
    fontSize: 14,
    flowchart: {
        htmlLabels: true,
        curve: 'basis',
        padding: 16,
    },
})

let mermaidIdCounter = 0

export default function MermaidDiagram({ chart }: { chart: string }) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [svg, setSvg] = useState<string>('')
    const [error, setError] = useState<string>('')

    useEffect(() => {
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
    }, [chart])

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
            className="my-8 flex justify-center overflow-x-auto rounded-lg border border-border bg-card/50 p-6"
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    )
}
