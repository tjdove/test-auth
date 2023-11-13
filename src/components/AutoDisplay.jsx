import { Auto, Job } from "@prisma/client";
import JobDisplay from "./JobDisplay";

export default function AutoDisplay({ auto }) {
  return (
    <>
      <div>AutoDisplay</div>
      <div className="flex border border-red-600">
        <div className="flex-auto">{auto.plate}</div>
        <div className="flex-auto">{auto.make}</div>
        <div className="flex-auto">{auto.model}</div>
        <div className="flex-auto">{auto.color}</div>
      </div>

      {auto && auto.jobs.map((job) => <JobDisplay job={job} />)}
    </>
  );
}
