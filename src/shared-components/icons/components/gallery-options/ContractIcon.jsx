export default function ContractIcon({ className="", onClick=null }) {
  return (
    <>
      <svg className={className} onClick={onClick} viewBox="0 0 12 15" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#contract-icon)">
          <path d="m11.754 4.0192-3.8409-3.7849c-0.15013-0.14795-0.36073-0.23425-0.57342-0.23425h-6.5411c-0.43996 0-0.79861 0.35342-0.79861 0.78699v13.426c0 0.4336 0.35864 0.787 0.79861 0.787h10.403c0.44 0 0.7986-0.3534 0.7986-0.787v-9.6082c0-0.2178-0.0897-0.4315-0.246-0.58561zm-4.0181-2.7986 2.8921 2.85h-2.8921v-2.85zm-6.9018 12.958v-13.356l6.0678-0.006165v3.2568c0 0.45411 0.37324 0.82192 0.83406 0.82192h3.43v9.2836h-10.332z"/>
        </g>

        <defs>
          <clipPath id="contract-icon">
            <rect width="12" height="15" fill="#fff"/>
          </clipPath>
        </defs>
      </svg>
    </>
  );
}