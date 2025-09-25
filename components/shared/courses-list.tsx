import CourseCard from "@/components/cards/course";

export default function CoursesList({ filteredCourses, citySlug }: any) {
  return (
    <div className="flex flex-col gap-4">
      {filteredCourses.length > 0 ? (
        filteredCourses.map((course: any) => (
          <CourseCard key={course.slug} course={course} citySlug={citySlug} />
        ))
      ) : (
        <div>
          <p>No courses found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
}
