import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import LikeButton from '../components/LikeButton';
import { fetchPhotos, likePhoto, unlikePhoto, signOut } from '../components/api';


function AllPhotos() {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['photos'],
    queryFn: fetchPhotos,
  });

  async function toggleLike(photoId: number, liked: boolean) {
    if (liked) {
      await unlikePhoto(photoId);
    } else {
      await likePhoto(photoId);
    }
  }

  const toggleLikeMutation = useMutation({
    mutationFn: ({ photoId, liked }: { photoId: number; liked: boolean }) => toggleLike(photoId, liked),
    onSettled() {
      queryClient.invalidateQueries({ queryKey: ['photos'] });
    },
  });

  if (isLoading || !data) {
    return <div className='min-h-screen flex items-center justify-center bg-white'><div>Loading photos...</div></div>;
  }

  if (isError) {
    return <div className='min-h-screen flex items-center justify-center bg-white'><div>Error loading photos.</div></div>;
  }

  return (
    <>
      <div className='text-xl font-bold text-gray-700 mb-4'>All photos</div>
      <div className='space-y-4'>
        {data.map(photo => (
          <div key={photo.id} className='flex gap-4 items-start'>
            <LikeButton
              liked={photo.liked_by_current_user}
              isPending={toggleLikeMutation.isPending && toggleLikeMutation.variables?.photoId === photo.id}
              onClick={() => {
                toggleLikeMutation.mutate({ photoId: photo.id, liked: photo.liked_by_current_user });
              }}
              photoId={photo.id}
            />

            <div className='flex-1 flex gap-2 '>
              <img
                src={photo.src_medium}
                alt={photo.alt || photo.photographer}
                className='w-20 h-20 object-cover rounded flex-shrink-0'
              />

              <div className='flex-1 flex flex-col gap-1'>
                <div className='font-semibold text-gray-700 text-sm'>{photo.photographer}</div>
                <div className='text-gray-700 text-sm'>{photo.alt}</div>
                <div className='flex items-center gap-2'>
                  <span className='text-sm' style={{ color: photo.avg_color }}>{photo.avg_color}</span>
                  <div className='w-4 h-4 rounded' style={{ backgroundColor: photo.avg_color }} />
                </div>
              </div>

            </div>
            <a
              href={photo.photographer_url}
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-600 text-xs hover:underline flex-shrink-0 flex items-center gap-1'
            >
              <img
                src='/links.svg'
                alt='Link icon'
                className='inline w-3 h-3 align-middle'
                style={{ display: 'inline', verticalAlign: 'middle' }}
              />
              Portfolio
            </a>
          </div>
        ))}
      </div>
    </>
  );
}

export default AllPhotos; 