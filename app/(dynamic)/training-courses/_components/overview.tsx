export default function Overview({ category }: any) {
  return (
    <section className="bg-[#f8fafc] p-8 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] mt-15">
      <div className="overview-content">
        <h2 className="text-[28px] text-[#2d3748] mb-5 border-l-4 border-[#3e5ec0] pl-3 font-semibold">
          {category.title}
        </h2>
        <div className="overview-text">
          <div
            className="text-[#4a5568] text-base leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: category.additional_description,
            }}
          />
        </div>
      </div>
    </section>
  );
}
