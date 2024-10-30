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
import { ClassCreationDialog } from "~/app/_components/shared/forms/class/ClassCreation";
import { ClassDeletionDialog } from "~/app/_components/shared/forms/class/ClassDeletion";

const categoryColors: Record<string, string> = {
  Montessori: " text-red-800",
  Primary: "text-blue-800",
  Middle: "text-green-800",
  "SSC-I": "text-yellow-800",
  "SSC-II": "text-purple-800",
};

const columns: ColumnDef<ClassProps>[] = [
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
  {
    accessorKey: "section",
    header: "Section",
    cell: ({ row }) => <div>{row.getValue("section")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.getValue<string>("category");
      const colorClasses = categoryColors[category] ?? "bg-gray-200 text-gray-800";
      return (
        <span className={`rounded-full px-2 py-1 text-xs ${colorClasses}`}>
          {category}
        </span>
      );
    },
  },
  {
    accessorKey: "fee",
    header: "Fee",
    cell: ({ row }) => <div>{row.getValue<number>("fee").toFixed(2)}</div>,
  },
];

export const ClassTable = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState<ClassProps[]>([]);

  const classesData = api.class.getClasses.useQuery();

  useMemo(() => {
    if (classesData.data) setData(classesData.data as ClassProps[]); // Force-casting to the correct type
  }, [classesData.data]);

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
          <ClassCreationDialog />
          <Button
            variant="outline"
            className="bg-blue-500 text-white hover:bg-blue-600"
            onClick={() => classesData.refetch()}
          >
            Refresh
          </Button>
          <ClassDeletionDialog classIds={table.getSelectedRowModel().rows.map(
            (row) => row.original.classId
          )} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
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
                    {row.original.className}
                  </h3>
                </div>
                <span className="rounded-md bg-blue-500 px-2 py-1 text-xs text-white">
                  {row.original.section}
                </span>
              </div>
              <p className={`text-sm ${categoryColors[row.original.category] ?? "text-gray-800"}`}>
                {row.original.category}
              </p>
              <p className="text-sm text-gray-600">Fee: ${row.original.fee.toFixed(2)}</p>
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