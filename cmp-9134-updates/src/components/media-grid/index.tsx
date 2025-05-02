import MediaCard from "@/components/media-card";

const MediaGrid = ({ results }: { results: any }) => {
  if (!Array.isArray(results)) {
    console.warn("MediaGrid: 'results' is not an array:", results)
    return null // or a fallback UI like <p>No media found</p>
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
      {results.map((item) => (
        <MediaCard key={item.id} media={item} />
      ))}
    </div>
  );
};

export default MediaGrid;
