export default function TextFieldError({ error }: { error: string }) {
  return <span className="text-xs text-red-600">{error}</span>;
}
