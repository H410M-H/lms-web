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
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { FeeCreationDialog } from "../forms/fee/FeeCreation";
import { FeeDeletionDialog } from "../forms/fee/FeeDeletion";
import dayjs from "dayjs";

const columns: ColumnDef<FeeProps>[] = [
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
    accessorKey: "feeName",
    header: "Fee Name",
    cell: ({ row }) => (
      <div>{row.getValue("feeName")}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Fee Creation Date",
    cell: ({ row }) => <div>{row.getValue("createdAt")}</div>,
  },
  {
    accessorKey: "updatedAt",
    header: "Fee Modification Date",
    cell: ({ row }) => <div>{row.getValue("updatedAt")}</div>,
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href={`/dashboard/bicycle/product/${row.original.feeId}`}
              >
                Edit
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const FeeTable = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState<FeeProps[]>([]);

  const feesData = api.fee.getFees.useQuery();

  useMemo(() => {
    if (feesData.data) setData(feesData.data);
  }, [feesData.data]);

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
              (table.getColumn("feeName")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("feeName")?.setFilterValue(event.target.value)
            }
            className="max-w-sm border-blue-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <FeeCreationDialog />
          <Button
            variant="outline"
            className="bg-blue-500 text-white hover:bg-blue-600"
            onClick={() => feesData.refetch()}
          >
            Refresh
          </Button>
          <FeeDeletionDialog
            feeIds={table
              .getSelectedRowModel()
              .rows.map((row) => row.original.feeId)}
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
                    {row.original.feeName}
                  </h3>
                </div>
                <span className="rounded-md bg-pink-500 px-2 py-1 text-xs text-white">
                  {dayjs(row.original.createdAt).format('DD-MM-YYYY')}
                </span>
              </div>
              <p className="text-sm text-gray-600">{dayjs(row.original.updatedAt).format('DD-MM-YYYY')}</p>
              <div className="mt-2 flex justify-between gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-green-500 text-white hover:bg-green-600"
                >
                  View Details
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
