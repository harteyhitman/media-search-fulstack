const MediaCard = ({ media }: { media: any }) => {
    return (
      <div className="border rounded shadow hover:shadow-lg transition">
        <img src={media.thumbnail} alt={media.title} className="w-full h-48 object-cover" />
        <div className="p-2">
          <p className="font-semibold">{media.title || 'Untitled'}</p>
          <a href={media.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm">
            View Source
          </a>
        </div>
      </div>
    );
  };
  
  export default MediaCard;
  