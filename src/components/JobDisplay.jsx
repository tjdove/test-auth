export default function JobDisplay({ job }) {
  return (
    <>
      <div>JobDisplay</div>
      <div className="flex border border-yellow-600">
        <div className="flex-auto">{job.type}</div>
        <div className="flex-auto">{job.mileage}</div>
        <div className="flex-auto">{job.oilType}</div>
        <div className="flex-auto">{job.notes}</div>
      </div>
    </>
  );
}
