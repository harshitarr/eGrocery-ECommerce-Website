export default function Hero() {
    return (
        <section className="relative">
            <img
                src="/herobanner2.png"
                alt="banner"
                className="w-full h-[300px] md:h-[500px] object-cover"
            />

            <div className="absolute top-1/4 left-4 md:left-14 max-w-[90%] md:max-w-[700px]">
                <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold leading-tight text-black drop-shadow-lg">
                    Order Your Daily Groceries
                </h2>

                <div className="py-6 flex flex-col sm:flex-row gap-2 sm:gap-0">
                      
                      
                </div>
            </div>
        </section>
    );
}
