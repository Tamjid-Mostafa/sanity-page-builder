interface TableHeader {
  text?: string
}

interface TableCell {
  text?: string
}

interface TableRow {
  cells?: TableCell[]
}

interface DataTableData {
  caption?: string
  headers?: TableHeader[]
  rows?: TableRow[]
  striped?: boolean
  compact?: boolean
}

export function DataTableContent({data}: {data: Record<string, unknown>}) {
  const {caption, headers, rows, striped, compact} =
    data as unknown as DataTableData

  if (!headers || headers.length === 0) return null

  const cellPadding = compact ? 'px-3 py-1.5' : 'px-4 py-3'

  return (
    <figure className="my-4">
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-left text-sm">
          {caption && (
            <caption className="bg-card px-4 py-3 text-left text-sm font-medium text-foreground">
              {caption}
            </caption>
          )}

          <thead>
            <tr className="border-b border-border bg-foreground/5">
              {headers.map((header, index) => (
                <th
                  key={index}
                  scope="col"
                  className={`${cellPadding} text-xs font-semibold uppercase tracking-wider text-muted`}
                >
                  {header.text}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {rows?.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={
                  striped && rowIndex % 2 === 1
                    ? 'bg-foreground/[0.02]'
                    : 'bg-card'
                }
              >
                {headers.map((_, cellIndex) => {
                  const cell = row.cells?.[cellIndex]
                  return (
                    <td
                      key={cellIndex}
                      className={`${cellPadding} text-card-foreground`}
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
