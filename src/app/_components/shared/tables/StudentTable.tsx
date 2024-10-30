"use client";

import { useMemo, useState } from "react";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { api } from "~/trpc/react";
import Link from "next/link";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { type ColumnDef, type SortingState, useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel, flexRender } from "@tanstack/react-table";
import { CSVUploadDialog } from "../forms/student/FileInput";
import { StudentDeletionDialog } from "../forms/student/StudentDeletion";

type StudentProps = {
  studentId: string;
  registrationNumber: string;
  studentName: string;
  fatherName: string;
  gender: 'MALE' | 'FEMALE' | 'CUSTOM';
  dateOfBirth: string;
  studentCNIC: string;
  fatherCNIC: string;
  fatherMobile: string;
};

const columns: ColumnDef<StudentProps>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "registrationNumber",
    header: "Registration #",
    cell: ({ row }) => <div className="capitalize">{row.getValue("registrationNumber")}</div>,
  },
  {
    accessorKey: "studentName",
    header: "Student Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("studentName")}</div>,
  },
  {
    accessorKey: "fatherName",
    header: "Father Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("fatherName")}</div>,
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => <div>{row.getValue("gender")}</div>,
  },
  {
    accessorKey: "dateOfBirth",
    header: "Date of Birth",
    cell: ({ row }) => <div>{row.getValue("dateOfBirth")}</div>,
  },
  {
    accessorKey: "studentCNIC",
    header: "Student B-Form #",
    cell: ({ row }) => <div>{row.getValue("studentCNIC")}</div>,
  },
  {
    accessorKey: "fatherCNIC",
    header: "Father CNIC",
    cell: ({ row }) => <div>{row.getValue("fatherCNIC")}</div>,
  },
  {
    accessorKey: "fatherMobile",
    header: "Mobile No",
    cell: ({ row }) => <div>{row.getValue("fatherMobile")}</div>,
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-8 h-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/student/edit/${row.original.studentId}`}>
                Edit
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const StudentTable = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState<StudentProps[]>([]);

  const studentsData = api.student.getStudents.useQuery();

  useMemo(() => {
    if (studentsData.data) setData(studentsData.data);
  }, [studentsData.data]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between m-2">
        <Input
          placeholder="Search name"
          value={(table.getColumn("studentName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("studentName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex items-center gap-3">
          <Button variant={'outline'} type="button" onClick={() => studentsData.refetch()}>
            Refresh
          </Button>
          <StudentDeletionDialog studentIds={table.getSelectedRowModel().rows.map(
                    (row) => row.original.studentId
                  )} />
          <CSVUploadDialog />
          <Button type="button" asChild>
            <Link href={'/registration/student/create'}>Create</Link>
          </Button>
        </div>
      </div>
      <div className="m-2 border rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
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
                        cell.getContext(),
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end m-6 space-x-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
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
    </div>
  );
};