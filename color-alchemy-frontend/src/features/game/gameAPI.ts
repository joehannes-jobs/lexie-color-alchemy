export function fetchGame(userID: string | null) {
  return fetch(`http://localhost:9876/init${userID ? "user/" + userID : ""}`);
}
