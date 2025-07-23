const StepIndicator = ({
  step,
  isSubmitted = false,
}: {
  step: number;
  isSubmitted: boolean;
}) => {
  return (
    <div className="flex flex-row justify-center items-center gap-1">
      <div
        className={`w-[30px] h-[30px] ${
          step === 1 ? "border-3" : "bg-black"
        } rounded-[50%] flex justify-center items-center`}
      >
        {step === 1 ? (
          <p
            className={`${
              step === 1 ? "text-black" : "text-white"
            } font-vazir font-bold text-[16px]`}
          >
            1
          </p>
        ) : (
          <span className="text-white font-bold">&#10003;</span>
        )}
      </div>
      <div
        className={`w-[50px] ${step === 1 ? "h-[0.5px]" : "h-[3px]"}  bg-black`}
      />
      <div
        className={`w-[30px] h-[30px] ${
          isSubmitted ? "bg-black" : "border-1"
        } rounded-[50%] flex justify-center items-center`}
      >
        {isSubmitted ? (
          <span className="text-white font-bold">&#10003;</span>
        ) : (
          <p className="text-black font-vazir font-bold text-[16px]">2</p>
        )}
      </div>
    </div>
  );
};

export default StepIndicator;
