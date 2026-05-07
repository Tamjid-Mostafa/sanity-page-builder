export default function ImageGalleryBlock({ data }: { data: any }) {
  return (
    <section className="py-16 lg:py-24">
      <div className="container px-4 sm:px-6 lg:px-8">
        {data.title && <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">{data.title}</h2>}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Add image gallery implementation */}
        </div>
      </div>
    </section>
  )
}
