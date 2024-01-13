type PasswordStrengthProps = {
  passStrength: number;
};

export default function PasswordStrength({
  passStrength,
}: PasswordStrengthProps) {
  return (
    <div className="flex flex-col justify-start w-[15rem] sm:w-[20rem]">
      <div
        className={
          "pb-0.5 text-xs animate-fade animate-once " +
          `${
            (passStrength === 0 && "text-red-500") ||
            (passStrength === 1 && "text-orange-500") ||
            (passStrength === 2 && "text-yellow-500") ||
            (passStrength === 3 && "text-green-500")
          }`
        }
      >
        {(passStrength === 0 && "Weak") ||
          (passStrength === 1 && "Fair") ||
          (passStrength === 2 && "Good") ||
          (passStrength === 3 && "Strong")}
      </div>
      <div className="flex flex-row gap-1 pb-0.5">
        {Array.from({ length: passStrength + 1 }).map((value, index) => (
          <div
            key={index}
            className={
              "h-0.5 w-[14%] rounded-sm animate-fade animate-once " +
              `${
                (passStrength === 0 && "bg-red-500") ||
                (passStrength === 1 && "bg-orange-500") ||
                (passStrength === 2 && "bg-yellow-500") ||
                (passStrength === 3 && "bg-green-500")
              }`
            }
          ></div>
        ))}
      </div>
    </div>
  );
}
