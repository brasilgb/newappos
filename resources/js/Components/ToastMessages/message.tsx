interface ToastProps {
  data: any;
}
const ToastMessage = ({data}: ToastProps) => {
  return (
    <div className="w-full">
      <div className="flex flex-col p-4">
        <h3 className="text-zinc-800 text-sm font-semibold">{data.title}</h3>
        <p className="text-sm">{data.message}</p>
      </div>
    </div>
  );
}

export default ToastMessage;