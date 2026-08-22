// Real reviews / testimonials only. Do NOT invent quotes. Add entries as real,
// attributable feedback is collected and permissioned, then set published: true.
// Each: { id, quote, name, role, org, rating (1-5), published }
export const reviews = [
  // Example shape (unpublished placeholder — replace with a real, approved quote):
  // {
  //   id: "school-bursar-1",
  //   quote: "Our firewood bill dropped and the kitchen is finally smoke-free.",
  //   name: "Full Name",
  //   role: "Bursar",
  //   org: "Institution name",
  //   rating: 5,
  //   published: false,
  // },
];

export const publishedReviews = reviews.filter((r) => r.published);
