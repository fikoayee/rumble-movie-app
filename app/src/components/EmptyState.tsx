interface Props {
  header: string;
  text: string;
  children?: React.ReactNode;
}

const EmptyState = ({ header, text, children }: Props) => {
  return (
    <div className="text-center flex flex-col space-y-2 max-w-[800px] h-screen">
      <div className="h-1/2 justify-end flex flex-col space-y-2">
        <p className="gradient-text text-3xl sm:text-4xl md:text-5xl">
          {header}
        </p>
        <p className="text-neutral-800 text-sm sm:text-lg md:text-xl">{text}</p>
      </div>
      <div className="flex-1 justify-end md:justify-start flex flex-col">{children}</div>
    </div>
  );
};
export default EmptyState;
