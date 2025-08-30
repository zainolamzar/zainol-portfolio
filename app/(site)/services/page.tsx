import ServicesCarousel from "@/components/main/ServicesCarousel"
import ContactForm from "@/components/main/ContactForm"

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-[rgb(25,26,28)] text-[#dfe4ed] p-3 sm:p-4 md:p-6 lg:p-8">
            {/* Page Header */}
            <div className="mb-2 sm:mb-4 md:mb-6">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-1 sm:mb-3 md:mb-5 tracking-wide px-2">
                    Services
                </h1>
                <p className="text-center text-[#dfe4ed]/70 text-sm sm:text-base px-4 max-w-2xl mx-auto">
                    Discover our comprehensive range of professional services tailored to meet your needs
                </p>
            </div>

            {/* Services Carousel Section */}
            <div className="mb-12 sm:mb-16 md:mb-20">
                <ServicesCarousel />
            </div>

            {/* Contact Form Section */}
            <div className="mt-8 sm:mt-12">
                <ContactForm />
            </div>
        </div>
    )
}