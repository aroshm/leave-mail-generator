import EmailForm from "./EmailForm";
import EmailOutput from "./EmailOutput";

const Content = () => {
  return (
    <div className="flex flex-1 gap-10 w-7xl mx-auto pb-5">
      <EmailForm />
      <EmailOutput />
    </div>
  );
};

export default Content;
