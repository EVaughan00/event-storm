

export function limitStringToSize(original: string, size: number): string {

    var result = original

    if (original.length > size) {
        result = original.substring(0, size) + "..."
    }

    return result
}