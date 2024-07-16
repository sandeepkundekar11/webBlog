const ProfleBlog = ({ heading, content, viewBlog }) => {
  return (
    <div className="md:w-96 w-72 bg-slate-50 min-h-40 max-h-auto overflow-hidden border p-2 m-2">
      <h1 className="text-xl text-blue-500 font-medium">{heading}</h1>
      <p className="mt-2">{content?.substring(0, 100)}...</p>
      <button
        className="w-28 h-8 mt-1 hover:bg-blue-200 rounded-xl font-semibold float-end "
        onClick={viewBlog}
      >
        view
      </button>
    </div>
  );
};
export default ProfleBlog;
