export default function Hero() {
    return (
        <section className="relative">
            <img
                src="/banner2.png"
                alt="banner"
                className="w-full h-[300px] md:h-[500px] object-cover"
            />

            <div className="absolute top-1/4 left-4 md:left-14 max-w-[90%] md:max-w-[700px] text-white drop-shadow-lg bg-black/60 px-4 py-2 rounded-3xl"> 
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight px-3 py-3 ">
                    Order Your Daily Groceries
                </h2>
                <p className="sm:text-sm md:text-md px-3 pb-1">Fresh picks delivered straight to your doorstep,
                   Get everything you need without  stepping  <br/> outside,
                    No crowds, no queues — just smooth, simple , On-touch shopping.</p>

                <div className="py-6 flex flex-col sm:flex-row gap-2 sm:gap-0">
                      
                      
                </div>
            </div>
        </section>
    );
}
