export default function Loading() {
  return (
  <div className='flex gap-2'>
    <p>Загрузка...</p>
    <div className='animate-spin w-4 h-4 border-t-2 border-cyan-500 rounded-full self-center' />
  </div>
  );
}