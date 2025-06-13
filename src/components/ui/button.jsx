
export function Button({ children, ...props }) {
  return (
    <button className="px-4 py-2 border border-white rounded hover:bg-white hover:text-black transition" {...props}>
      {children}
    </button>
  );
}
