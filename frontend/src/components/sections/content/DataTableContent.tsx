import {stegaClean} from 'next-sanity'
import type {DataTableData} from '@/types/sanity'
import {cn} from '@/lib/utils'

export function DataTableContent({data}: {data: DataTableData}) {
  if (!data.headers || data.headers.length === 0) return null

  const variant = stegaClean(data.variant) || 'default'
  const isFormats = variant === 'formats'
  const cellPadding = data.compact
    ? 'px-3 py-2 sm:py-3'
    : 'px-4 py-3 sm:px-5 sm:py-4'

  return (
    <figure className="my-0">
      <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
        <table
          className={cn(
            'w-full text-left text-sm',
            isFormats ? 'min-w-[640px]' : 'min-w-[720px]',
          )}
        >
          {!isFormats && data.caption && (
            <caption className="bg-card px-4 py-3 text-left text-sm font-medium text-foreground">
              {data.caption}
            </caption>
          )}

          <thead>
            <tr
              className={cn(
                'border-b border-border',
                isFormats ? 'bg-muted/60' : 'bg-muted/50',
              )}
            >
              {data.headers.map((header) => (
                <th
                  key={header._key}
                  scope="col"
                  className={cn(cellPadding, 'font-semibold text-foreground')}
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
                  const isMiddleColumn =
                    cellIndex > 0 &&
                    cellIndex < (data.headers?.length ?? 0) - 1
                  return (
                    <td
                      key={cellIndex}
                      className={cn(
                        cellPadding,
                        'align-top leading-relaxed',
                        isFormats
                          ? cn(
                              isFirstColumn &&
                                'text-xs font-semibold text-foreground sm:text-sm whitespace-nowrap sm:whitespace-normal',
                              !isFirstColumn &&
                                'font-light text-foreground',
                              isMiddleColumn && 'max-w-xs',
                            )
                          : cn(
                              isFirstColumn && 'font-medium text-foreground',
                              !isFirstColumn &&
                                cellIndex === (data.headers?.length ?? 0) - 1
                                ? 'font-semibold text-foreground'
                                : 'text-muted-foreground',
                              data.striped &&
                                rowIndex % 2 === 1 &&
                                'bg-muted/30',
                            ),
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
