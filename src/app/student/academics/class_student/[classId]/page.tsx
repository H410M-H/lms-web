
type ParamProps = {
  classId: string;
};

/**
 * 
 * @deprecated
 * @param param
 * @returns 
 */
export default function Classes({ params }: { params: ParamProps }) {
  return (
    <section className="h-screen text-gray-800">
      <div className="container mx-auto p-4">
        <div className="relative overflow-hidden">
          <h1 className="p-2 text-center font-serif text-5xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-green-600 to-yellow-500 bg-clip-text text-transparent transition-all duration-300 hover:from-orange-400 hover:to-green-500">
              Section & Class Management
            </span>
          </h1>
          <div className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 transform bg-gradient-to-r from-green-600 to-yellow-500 transition-transform duration-300 group-hover:scale-x-100"></div>
        </div>
      </div>
      <p> heellP :{params.classId}</p>
    </section>
  );
}
