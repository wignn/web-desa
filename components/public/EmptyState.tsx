import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export function EmptyState({ message, className }: { message: string; className?: string }) {
  return (
    <Card className={cn('border-emerald-900/10 bg-white/95 shadow-sm shadow-emerald-900/5 backdrop-blur-sm rounded-3xl', className)}>
      <CardContent className="flex flex-col items-center justify-center p-8 text-center min-h-48">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-800/60 ring-8 ring-emerald-500/5 mb-4 select-none">
          <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
          </svg>
        </div>
        <p className="max-w-md text-sm font-semibold leading-6 text-emerald-950/70">{message}</p>
      </CardContent>
    </Card>
  )
}
