import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

export const SessionDialog = () => {
  return (
<div className="flex items-center gap-4 p-4 bg-gray-100 rounded-md">
    <Dialog>
    <DialogTrigger asChild>
      <Button className="transition duration-300 transform hover:scale-105 bg-green-700 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600">
        Active Employee
      </Button>
    </DialogTrigger>
    <DialogContent className="max-w-md rounded-md bg-white p-6 shadow-lg animate-fade-in">
      <DialogHeader>
        <DialogTitle className="mb-4 text-2xl font-semibold text-gray-800">
          Active Employee Details
        </DialogTitle>
        {/* Add additional session details here */}
        <p className="text-gray-600">More information about the session can go here...</p>
      </DialogHeader>
    </DialogContent>
  </Dialog>

  <Dialog>
    <DialogTrigger asChild>
      <Button className="transition duration-300 transform hover:scale-105 bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600">
        View Classes
      </Button>
    </DialogTrigger>
    <DialogContent className="max-w-md rounded-md bg-white p-6 shadow-lg animate-fade-in">
      <DialogHeader>
        <DialogTitle className="mb-4 text-2xl font-semibold text-gray-800">
          Classwise Details
        </DialogTitle>
        {/* Add additional session details here */}
        <p className="text-gray-600">More information about the session can go here...</p>
      </DialogHeader>
    </DialogContent>
  </Dialog>
  
  <Dialog>
    <DialogTrigger asChild>
      <Button className="transition duration-300 transform hover:scale-105 bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600">
        Fee Collection
      </Button>
    </DialogTrigger>
    <DialogContent className="max-w-md rounded-md bg-white p-6 shadow-lg animate-fade-in">
      <DialogHeader>
        <DialogTitle className="mb-4 text-2xl font-semibold text-gray-800">
          Fee Details
        </DialogTitle>
        {/* Add additional session details here */}
        <p className="text-gray-600">More information about the session can go here...</p>
      </DialogHeader>
    </DialogContent>
  </Dialog>
</div>  
);
};
