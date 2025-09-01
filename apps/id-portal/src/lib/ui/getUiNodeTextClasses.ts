export default function getUiNodeTextClasses(type: string): string {
  switch (type) {
    case "error":
      return "text-red-600 bg-red-50 border border-red-200 px-2 py-1 rounded";
    case "success":
      return "text-green-600 bg-green-50 border border-green-200 px-2 py-1 rounded";
    case "warning":
      return "text-yellow-700 bg-yellow-50 border border-yellow-200 px-2 py-1 rounded";
    case "info":
    default:
      return "text-blue-600 bg-blue-50 border border-blue-200 px-2 py-1 rounded";
  }
}
