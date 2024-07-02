const Loader = () => {
    return (
        <div className="w-screen flex h-screen items-center justify-center z-50 fixed top-0 left-0 loader">
            <div className="h-16 w-16 animate-spin rounded-full border-b-4 border-r-4 border-blue-900 bg-transparent"></div>
        </div>
    )
}
export default Loader