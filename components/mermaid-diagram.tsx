'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useTheme } from 'next-themes'
import mermaid from 'mermaid'
import { Download, Maximize2, Copy, Check, X } from 'lucide-react'

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

    // Action UI states
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [isCopied, setIsCopied] = useState(false)
    const [isDownloading, setIsDownloading] = useState(false)

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

    // Convert SVG string to high-res PNG Blob via Canvas natively, without external libraries
    const getCanvasBlob = useCallback(async (): Promise<Blob> => {
        return new Promise((resolve, reject) => {
            try {
                const parser = new DOMParser()
                const doc = parser.parseFromString(svg, 'image/svg+xml')
                const svgElement = doc.documentElement

                // Ensure xmlns is present
                if (!svgElement.getAttribute('xmlns')) {
                    svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
                }

                // Determine base width and height to render onto canvas
                let width = 800
                let height = 600
                const viewBox = svgElement.getAttribute('viewBox')
                
                if (viewBox) {
                    const parts = viewBox.split(' ')
                    width = parseFloat(parts[2]) || width
                    height = parseFloat(parts[3]) || height
                } else if (svgElement.getAttribute('width')) {
                    const wStr = svgElement.getAttribute('width') || ''
                    const hStr = svgElement.getAttribute('height') || ''
                    if (!wStr.includes('%')) width = parseFloat(wStr) || width
                    if (!hStr.includes('%')) height = parseFloat(hStr) || height
                }

                // Override SVG with fixed pixel dimensions so canvas draws it safely
                svgElement.setAttribute('width', `${width}px`)
                svgElement.setAttribute('height', `${height}px`)

                // Convert adjusted SVG back to string
                const serializer = new XMLSerializer()
                const finalSvgString = serializer.serializeToString(svgElement)

                const canvas = document.createElement('canvas')
                const ctx = canvas.getContext('2d')
                if (!ctx) {
                    reject(new Error('Failed to get 2D context'))
                    return
                }

                // High resolution multiplier for crisp image
                const scale = 3
                canvas.width = width * scale
                canvas.height = height * scale
                
                // Draw background
                ctx.fillStyle = resolvedTheme === 'dark' ? '#0f172a' : '#ffffff'
                ctx.fillRect(0, 0, canvas.width, canvas.height)
                
                const img = new Image()
                
                img.onload = () => {
                    ctx.scale(scale, scale)
                    ctx.drawImage(img, 0, 0, width, height)
                    canvas.toBlob((blob) => {
                        if (blob) resolve(blob)
                        else reject(new Error('Failed to create Blob from Canvas'))
                    }, 'image/png', 1.0)
                }

                img.onerror = (e) => {
                    console.error('Image logic error:', e)
                    reject(new Error('Failed to load SVG into Image'))
                }

                // Data URI is safest format for creating an Image from SVG in most browsers (better than Object URL)
                img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(finalSvgString)
            } catch (e) {
                reject(e)
            }
        })
    }, [svg, resolvedTheme])

    const handleCopyImage = async () => {
        if (!svg) return
        try {
            const blobPromise = getCanvasBlob()
            const blob = await blobPromise
            
            const clipboardItem = new ClipboardItem({ 'image/png': blob })
            await navigator.clipboard.write([clipboardItem])
            
            setIsCopied(true)
            setTimeout(() => setIsCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy PNG to clipboard', err)
            // As requested: fail silently rather than copying the text code block.
        }
    }

    const handleDownloadPng = async () => {
        if (!svg || isDownloading) return
        setIsDownloading(true)
        try {
            const blob = await getCanvasBlob()
            const url = URL.createObjectURL(blob)
            
            const a = document.createElement('a')
            a.href = url
            a.download = `architecture-diagram-${Date.now()}.png`
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            
            setTimeout(() => URL.revokeObjectURL(url), 100)
        } catch (err) {
            console.error('Failed to download PNG', err)
        } finally {
            setIsDownloading(false)
        }
    }

    // Escape listener for fullscreen
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsFullscreen(false)
        }
        if (isFullscreen) window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isFullscreen])

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isFullscreen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isFullscreen])

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

    const inlineContentClass = `flex justify-center overflow-x-auto p-6 w-full`
    const modalContentClass = `p-6 flex items-center justify-center min-h-screen min-w-full [&>svg]:h-auto [&>svg]:w-max [&>svg]:max-w-max`

    const modalOverlay = isFullscreen && typeof document !== 'undefined' ? createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-0 sm:p-6 md:p-12">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-zinc-900/80 backdrop-blur-sm dark:bg-black/90" 
                onClick={() => setIsFullscreen(false)}
            />
            
            {/* Modal Content */}
            <div className="relative flex h-full w-full flex-col overflow-hidden rounded-none sm:rounded-2xl border-0 sm:border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-[#0f172a]">
                
                {/* 
                  Increased margin and padding for expanded buttons. 
                  Using top-8 right-8 to keep it comfortably clear of any mobile notches or tight corners. 
                */}
                <div className="absolute right-6 top-6 sm:right-8 sm:top-8 z-50 flex items-center gap-3 rounded-xl bg-white/70 p-1.5 shadow-md backdrop-blur-md dark:bg-zinc-900/70 border border-zinc-200/50 dark:border-zinc-700/50">
                    <button
                        onClick={handleCopyImage}
                        className="rounded-lg bg-zinc-100/90 p-3 text-zinc-600 transition-colors hover:bg-zinc-200 hover:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800/90 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-100"
                        title="Copy Image"
                    >
                        {isCopied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                    </button>
                    <button
                        onClick={handleDownloadPng}
                        disabled={isDownloading}
                        className="rounded-lg bg-zinc-100/90 p-3 text-zinc-600 transition-colors hover:bg-zinc-200 hover:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800/90 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-100 disabled:opacity-50"
                        title="Download PNG"
                    >
                        <Download className="h-5 w-5" />
                    </button>
                    <div className="h-8 w-px bg-zinc-300 dark:bg-zinc-700 mx-1" />
                    <button
                        onClick={() => setIsFullscreen(false)}
                        className="rounded-lg bg-red-50 p-3 text-red-500 transition-colors hover:bg-red-100 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40 dark:hover:text-red-300"
                        title="Close fullscreen"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Interactive diagram area (scrollable) */}
                <div className="flex-1 overflow-auto bg-zinc-50/50 dark:bg-zinc-950/20 cursor-grab active:cursor-grabbing">
                    <div
                        className={modalContentClass}
                        dangerouslySetInnerHTML={{ __html: svg }}
                    />
                </div>
            </div>
        </div>,
        document.body
    ) : null;

    return (
        <>
            <div className="group relative my-8 overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-card/50 dark:shadow-none bg-grid-zinc-100/50 dark:bg-grid-zinc-800/20">
                {/* Floating Action Bar (Inline) */}
                <div className="absolute right-3 top-3 z-10 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
                    <button
                        onClick={handleCopyImage}
                        className="rounded bg-white/90 p-2 text-zinc-600 shadow-sm transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-900/90 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 border border-zinc-200 dark:border-zinc-700"
                        title="Copy image to clipboard"
                        aria-label="Copy image to clipboard"
                    >
                        {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </button>
                    <button
                        onClick={handleDownloadPng}
                        disabled={isDownloading}
                        className="rounded bg-white/90 p-2 text-zinc-600 shadow-sm transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-900/90 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 border border-zinc-200 dark:border-zinc-700 disabled:opacity-50"
                        title="Download high-res PNG"
                        aria-label="Download high-res PNG"
                    >
                        <Download className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => setIsFullscreen(true)}
                        className="rounded bg-white/90 p-2 text-zinc-600 shadow-sm transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-900/90 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 border border-zinc-200 dark:border-zinc-700"
                        title="View fullscreen"
                        aria-label="View fullscreen"
                    >
                        <Maximize2 className="h-4 w-4" />
                    </button>
                </div>

                <div
                    ref={containerRef}
                    className={inlineContentClass}
                    dangerouslySetInnerHTML={{ __html: svg }}
                />
            </div>

            {/* the portaled modal overlay */}
            {modalOverlay}
        </>
    )
}
