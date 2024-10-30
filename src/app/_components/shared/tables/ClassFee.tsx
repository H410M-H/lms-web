"use client";

import {
  type ColumnDef,
  type SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";
import Link from "next/link";
import { ClassDeletionDialog } from "~/app/_components/shared/forms/class/ClassDeletion";
import { StudentAllotmentDialog } from "~/app/_components/shared/forms/class/StudentAlotment";

const columns: ColumnDef<ClassStudentProps>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
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
    accessorKey: "className",
    header: "Class",
    cell: ({ row }) => <div>{row.getValue("className")}</div>,
  },
];

export const ClassFeeTable = ({classId}:{classId:string}) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState<ClassStudentProps[]>([]);

  const students = api.alotment.getStudentsInClass.useQuery({classId:classId});

  useMemo(() => {
    if (students.data) setData(students.data);
  }, [students.data]);

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
      <div className="flex items-center justify-between gap-2 py-4">
        <div className="flex items-center gap-2">
          <Button
            onClick={() => table.toggleAllRowsSelected()}
            variant="outline"
            className="bg-purple-500 text-white hover:bg-purple-600"
          >
            {table.getIsAllRowsSelected() ? "Deselect All" : "Select All"}
          </Button>
          <Input
            placeholder="Search name"
            value={
              (table.getColumn("className")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("className")?.setFilterValue(event.target.value)
            }
            className="max-w-sm border-blue-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <StudentAllotmentDialog classId={classId}  />
          <Button
            variant="outline"
            className="bg-blue-500 text-white hover:bg-blue-600"
            onClick={() => students.refetch()}
          >
            Refresh
          </Button>
          <ClassDeletionDialog
            classIds={table
              .getSelectedRowModel()
              .rows.map((row) => row.original.classId)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <div
              key={row.id}
              className="flex flex-col justify-between rounded-md border bg-gradient-to-r from-blue-200 to-purple-200 p-4 shadow-md transition-shadow hover:shadow-lg"
              data-state={row.getIsSelected() && "selected"}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                  />
                  <h3 className="text-lg font-semibold text-gray-800">
                    {row.original.student.studentName} | {row.original.student.fatherName}
                  </h3>
                </div>
                <span className="rounded-md bg-blue-500 px-2 py-1 text-xs text-white">
                  {row.original.class.className}
                </span>
              </div>
              <p className="text-sm text-gray-600">{row.original.session.sessionName}</p>
              <div className="mt-2 flex justify-between gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-green-500 text-white hover:bg-green-600"
                  asChild
                >
                  <Link href={`/admin/academics/classwiseDetail/${row.original.classId}`}>View Details</Link>
                </Button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-yellow-500 text-white hover:bg-yellow-600"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="bg-red-500 text-white hover:bg-red-600"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-4 text-center">No results.</div>
        )}
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-gray-600">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="bg-indigo-500 text-white hover:bg-indigo-600"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-indigo-500 text-white hover:bg-indigo-600"
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
