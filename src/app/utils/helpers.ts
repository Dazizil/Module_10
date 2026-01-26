export function formatTimeAgo(timestamp: string): string {
    let now = Date.now();
    let postTime = Date.parse(timestamp);
    let diffMs = now - postTime;

    if (diffMs < 0) return "just now";

    let seconds = Math.floor(diffMs / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    if (seconds < 60) return "just now";
    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} hours ago`;
    if (days < 7) return `${days} days ago`;
    return new Date(postTime).toLocaleDateString('en-US');
}

export function memberNumberConverter(numberOfMembers: number): string {
    if (numberOfMembers < 1000) return numberOfMembers.toString();
    if (numberOfMembers < 1_000_000) return `${numberOfMembers / 1000}k`;

    return `${numberOfMembers / 1_000_000}m`
}