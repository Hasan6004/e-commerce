const Label = ({ htmlFor, content }: { htmlFor: string; content: string }) => {
  return (
    <label htmlFor={htmlFor} className="text-[16px] sm:text-[18px] font-vazir">
      {content}
    </label>
  );
};

export default Label;
