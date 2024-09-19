export default function BenefitCard({ title, description }) {
  return (
    <div className="rounded border border-[#f7ce4d] p-4">
      <h3 className="font-semibold">{title}</h3>
      <p>{description}</p>
    </div>
  );
}
