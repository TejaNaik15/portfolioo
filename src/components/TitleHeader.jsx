const TitleHeader = ({ title, sub }) => {
  return (
    <div className="flex flex-col items-center gap-5 mb-12">
      <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent-blue/20 border border-accent-blue/30 backdrop-blur-sm">
        <p className="text-accent-blue font-medium text-sm">{sub}</p>
      </div>
      <div>
        <h1 className="font-semibold md:text-5xl text-3xl text-center text-white">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default TitleHeader;