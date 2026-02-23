export default function Loading() {
    return (
        <div className="min-h-screen bg-white pt-32 px-6">
            <div className="max-w-7xl mx-auto space-y-12 animate-pulse">
                <div className="h-20 w-2/3 bg-zinc-100 rounded-lg" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div className="space-y-6">
                        <div className="h-8 w-1/3 bg-zinc-100 rounded" />
                        <div className="h-32 w-full bg-zinc-100 rounded" />
                    </div>
                    <div className="h-[500px] w-full bg-zinc-50 rounded-3xl" />
                </div>
            </div>
        </div>
    )
}
