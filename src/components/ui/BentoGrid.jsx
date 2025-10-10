import { useState } from "react";
import { cn } from "../../utils/cn";
import { IoCopyOutline } from "react-icons/io5";
import MagicButton from "../MagicButton";
import { BackgroundGradientAnimation } from "./GradientBg";
import { GridGlobe } from "./GridGlobe";

export const BentoGrid = ({ className, children }) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-6 gap-4 mx-auto lg:grid-cols-5 md:grid-row-7 lg:gap-8",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  id,
  className,
  title,
  description,
  img,
  imgClassName,
  titleClassName,
  spareImg,
}) => {
  const [copied, setCopied] = useState(false);
  const leftLists = ["NextJs", "ReactJs", "Typescript"];
  const rightLists = ["Golang", "NodeJs", "Docker"];

  const handleCopy = () => {
    const text = "tinkuteja740@gmail.com";
    navigator.clipboard.writeText(text);
    setCopied(true);
  };

  return (
    <div
      className={cn(
        "row-span-1 relative overflow-hidden rounded-3xl border border-white/[0.1] group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none justify-between flex flex-col space-y-4",
        className
      )}
      style={{
        background: "rgb(4,7,29)",
        backgroundColor:
          "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
      }}
    >
      <div className={`${id === 6 && "flex justify-center"} h-full`}>
        <div className="absolute size-full">
          {img && (
            <img
              src={img}
              alt={img}
              className={cn(imgClassName, "object-cover object-center")}
            />
          )}
        </div>
        <div
          className={`absolute -bottom-5 right-0 ${id === 5 && "w-full opacity-80"}`}
        >
          {spareImg && (
            <img
              src={spareImg}
              alt={spareImg}
              className={"size-full object-cover object-center"}
            />
          )}
        </div>
        {id === 6 && (
          <BackgroundGradientAnimation>
            <div className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center px-4 text-center text-3xl font-bold text-white md:text-4xl lg:text-7xl"></div>
          </BackgroundGradientAnimation>
        )}
        <div
          className={cn(
            titleClassName,
            "group-hover/bento:scale-105 transition duration-300 relative md:h-full min-h-40 flex flex-col px-5 p-5 lg:p-10"
          )}
        >
          <div className="z-10 font-sans text-sm font-extralight text-[#c1c2d3] md:max-w-32 md:text-xs lg:text-base">
            {description}
          </div>
          <div className="z-10 max-w-96 font-sans text-lg font-bold lg:text-3xl text-white">
            {title}
          </div>
          {id === 2 && <GridGlobe />}
          {id === 3 && (
            <div className="absolute -right-0 flex w-fit gap-1 lg:-right-0 lg:gap-3">
              <div className="flex flex-col gap-2 md:gap-3 lg:gap-3">
                {leftLists.map((item, i) => (
                  <span
                    key={i}
                    className="rounded-lg bg-[#10132E] px-3 py-2 text-center text-xs opacity-80 lg:p-3 lg:text-base text-white"
                  >
                    {item}
                  </span>
                ))}
                <span className="rounded-lg bg-[#10132e] px-3 py-4 text-center lg:py-3" />
              </div>
              <div className="flex flex-col gap-2 md:gap-3 lg:gap-3">
                <span className="rounded-lg bg-[#10132e] px-3 py-4 text-center lg:py-3" />
                {rightLists.map((item, i) => (
                  <span
                    key={i}
                    className="rounded-lg bg-[#10132E] px-3 py-2 text-center text-xs opacity-80 lg:p-3 lg:text-base text-white"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
          {id === 6 && (
            <div className="relative mt-5">
              <MagicButton
                title={copied ? "Email is Copied!" : "Copy my email"}
                icon={<IoCopyOutline />}
                position="left"
                otherClasses="!bg-[#161a31]"
                handleClick={handleCopy}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};