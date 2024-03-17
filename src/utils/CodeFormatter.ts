// The problem statement retrieved from backend is like "Given an array\nExample:\n\nInput:a = 1, b = 1\n\nOutput:2\n"
// Separate the problem statements by '\n' character put them into comment format
const CommentSymbol: Map<string, string> = new Map([
  ["c", "//"],
  ["cpp", "//"],
  ["csharp", "//"],
  ["go", "//"],
  ["java", "//"],
  ["javascript", "//"],
  ["kotlin", "//"],
  ["python", "#"],
  ["rust", "//"],
  ["swift", "//"],
  ["typescript", "//"],
])
export function commentProblemStatement(problemStatement: string | undefined, language: string) {
  return problemStatement?.split("\n").map(content => CommentSymbol.get(language) + " " + content).join("\n")
}