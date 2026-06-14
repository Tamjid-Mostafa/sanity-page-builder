import type {DataTableData} from '@/types/sanity'
import {cn} from '@/lib/utils'

export function DataTableContent({data}: {data: DataTableData}) {
  if (!data.headers || data.headers.length === 0) return null

  const cellPadding = data.compact ? 'px-3 py-2 sm:py-3' : 'px-4 py-3 sm:px-5 sm:py-4'

  return (
    <figure className="my-0">
      <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
        <table className="w-full min-w-[720px] text-left text-sm">
          {data.caption && (
            <caption className="bg-card px-4 py-3 text-left text-sm font-medium text-foreground">
              {data.caption}
            </caption>
          )}

          <thead>
            <tr className="border-b border-border bg-muted/50">
              {data.headers.map((header) => (
                <th
                  key={header._key}
                  scope="col"
                  className={cn(
                    cellPadding,
                    'font-semibold text-foreground',
                  )}
                >
                  {header.text}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.rows?.map((row, rowIndex) => (
              <tr
                key={row._key}
                className="border-b border-border last:border-0"
              >
                {data.headers.map((_, cellIndex) => {
                  const cell = row.cells?.[cellIndex]
                  const isFirstColumn = cellIndex === 0
                  return (
                    <td
                      key={cellIndex}
                      className={cn(
                        cellPadding,
                        'align-top font-light leading-relaxed text-foreground',
                        isFirstColumn &&
                          'max-w-40 text-xs font-semibold sm:text-sm',
                        cellIndex === 1 && 'max-w-xs',
                        cellIndex === 2 && 'max-w-32',
                        (cellIndex === 3 || cellIndex === 4) && 'max-w-md',
                        data.striped && rowIndex % 2 === 1 && 'bg-muted/30',
                      )}
                    >
                      {cell?.text ?? ''}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  )
}
