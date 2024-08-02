const ViewProfileSkeleton = () => {
    return (
        <div class="p-4 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto pt-24">
            {/* Header  */}
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center">
                    {/* Avatar Placeholder */}
                    <div class="rounded-full bg-gray-300 h-10 w-10 animate-pulse"></div>
                    {/* Name and Email Placeholder */}
                    <div class="ml-3">
                        <div class="bg-gray-300 h-4 w-32 mb-1 rounded animate-pulse"></div>
                        <div class="bg-gray-300 h-4 w-48 rounded animate-pulse"></div>
                    </div>
                </div>
                {/* Manage Button Placeholder */}
                <div class="bg-gray-300 h-8 w-20 rounded animate-pulse"></div>
            </div>

            {/* Tag Placeholder */}
            <div class="bg-gray-300 h-6 w-24 mb-4 rounded animate-pulse"></div>

            {/* Title Placeholder*/}
            <div class="bg-gray-300 h-6 w-3/4 mb-4 rounded animate-pulse"></div>

            {/*  Text Placeholder */}
            <div class="bg-gray-300 h-4 w-full mb-4 rounded animate-pulse"></div>
            <div class="bg-gray-300 h-4 w-5/6 mb-4 rounded animate-pulse"></div>
            <div class="bg-gray-300 h-4 w-3/4 mb-4 rounded animate-pulse"></div>

            {/* Reactions Placeholder */}
            <div class="flex items-center space-x-4 mb-4">
                <div class="bg-gray-300 h-6 w-6 rounded-full animate-pulse"></div>
                <div class="bg-gray-300 h-6 w-6 rounded-full animate-pulse"></div>
                <div class="bg-gray-300 h-6 w-6 rounded-full animate-pulse"></div>
            </div>

             {/* Comments Placeholder */}
            <div class="bg-gray-300 h-4 w-1/2 rounded animate-pulse"></div>
        </div>


    )
}
export default ViewProfileSkeleton