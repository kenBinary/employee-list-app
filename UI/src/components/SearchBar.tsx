interface SearchBarProps {
  onSearch: (id: number | null) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <div className="w-1/2 p-5 flex">
      <div className="w-full">
        <div className="w-full">
          <label className="input validator w-full">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              onChange={(e) => {
                if (e.target.value === "") {
                  onSearch(null);
                  return;
                } else {
                  onSearch(parseInt(e.target.value));
                }
              }}
              type="number"
              placeholder="Search for an Employee by ther ID"
              required
            />
          </label>
          <div className="validator-hint hidden">Enter a valid ID</div>
        </div>
      </div>
    </div>
  );
}
