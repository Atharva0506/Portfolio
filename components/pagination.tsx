import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'

type PaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null

  // Calculate sliding window like Google
  // Show up to 5 page numbers at a time
  const maxPagesToShow = 5

  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2))
  let endPage = startPage + maxPagesToShow - 1

  if (endPage > totalPages) {
    endPage = totalPages
    startPage = Math.max(1, endPage - maxPagesToShow + 1)
  }

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  )

  return (
    <div className='mt-12 flex items-center justify-center gap-1.5 sm:gap-2'>
      <Button
        variant='outline'
        size='sm'
        disabled={currentPage === 1}
        onClick={() => {
          onPageChange(currentPage - 1)
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
        className='h-8 w-8 p-0'
        aria-label='Previous page'
      >
        <ChevronLeft className='h-4 w-4' />
      </Button>

      {startPage > 1 && (
        <>
          <Button
            variant='outline'
            size='sm'
            onClick={() => {
              onPageChange(1)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className='hidden h-8 w-8 p-0 text-xs sm:inline-flex'
          >
            1
          </Button>
          {startPage > 2 && (
            <span className='hidden h-8 w-8 items-center justify-center text-muted-foreground sm:inline-flex'>
              <MoreHorizontal className='h-4 w-4' />
            </span>
          )}
        </>
      )}

      {pages.map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? 'default' : 'outline'}
          size='sm'
          onClick={() => {
            onPageChange(page)
            if (page !== currentPage) {
               window.scrollTo({ top: 0, behavior: 'smooth' })
            }
          }}
          className={`h-8 w-8 p-0 text-xs ${page === currentPage ? 'font-semibold' : ''}`}
          aria-label={
            page === currentPage ? `Page ${page}` : `Go to page ${page}`
          }
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </Button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className='hidden h-8 w-8 items-center justify-center text-muted-foreground sm:inline-flex'>
              <MoreHorizontal className='h-4 w-4' />
            </span>
          )}
          <Button
            variant='outline'
            size='sm'
            onClick={() => {
              onPageChange(totalPages)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className='hidden h-8 w-8 p-0 text-xs sm:inline-flex'
          >
            {totalPages}
          </Button>
        </>
      )}

      <Button
        variant='outline'
        size='sm'
        disabled={currentPage === totalPages}
        onClick={() => {
          onPageChange(currentPage + 1)
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
        className='h-8 w-8 p-0'
        aria-label='Next page'
      >
        <ChevronRight className='h-4 w-4' />
      </Button>
    </div>
  )
}
