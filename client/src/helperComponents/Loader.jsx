const Loader = () => {
  return (
    <div className="w-screen flex h-screen flex-col items-center justify-center z-50 fixed top-0 left-0 loader">
      <img
        class="h-14 w-14 animate-spin duration-0"
        src="https://img.icons8.com/?size=100&id=JLC6RumDJVe7&format=png&color=000000"
        alt=""
        srcset=""
      />
      <h1 class="text-xl mt-2 font-bold">Loading...</h1>
    </div>
  );
};
export default Loader;
