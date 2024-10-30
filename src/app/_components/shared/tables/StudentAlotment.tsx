"use client"

import { useState, useEffect } from "react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import { api } from "~/trpc/react"
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  type SortingState,
} from "@tanstack/react-table"
import { ChevronDown, ChevronUp } from "lucide-react"
import { StudentAllotmentDialog } from "../forms/class/StudentAlotment"

type StudentAllotmentProps = {
  studentId: string
  studentName: string
  fatherName: string
  className: string
  sessionName: string
}

const columns: ColumnDef<StudentAllotmentProps>[] = [
  {
    accessorKey: "studentName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Student Name
          {column.getIsSorted() === "asc" ? (
            <ChevronUp className="ml-2 h-4 w-4" />
          ) : (
            <ChevronDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      )
    },
  },
  {
    accessorKey: "fatherName",
    header: "Father Name",
  },
  {
    accessorKey: "className",
    header: "Class",
  },
  {
    accessorKey: "sessionName",
    header: "Session",
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <Button
        variant="destructive"
        size="sm"
        onClick={() => {
          // Implement remove functionality here
          console.log("Remove student", row.original.studentId)
        }}
      >
        Remove
      </Button>
    ),
  },
]

export function StudentAllotmentTable({ classId }: { classId: string }) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [data, setData] = useState<StudentAllotmentProps[]>([])
  const [globalFilter, setGlobalFilter] = useState("")

  const studentsInClass = api.alotment.getStudentsInClass.useQuery({ classId })

  useEffect(() => {
    if (studentsInClass.data) {
      const transformedData: StudentAllotmentProps[] = studentsInClass.data.map((item) => ({
        studentId: item.student.studentId,
        studentName: item.student.studentName,
        fatherName: item.student.fatherName,
        className: item.class.className,
        sessionName: item.session.sessionName,
      }))
      setData(transformedData)
    }
  }, [studentsInClass.data])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search students..."
          value={globalFilter ?? ""}
          onChange={(event) => setGlobalFilter(String(event.target.value))}
          className="max-w-sm"
        />
        <StudentAllotmentDialog classId={classId} />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No students allotted to this class.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}