export class ConvertStrategyToJson {
    convert(str) {
        if (str === undefined) {
            return undefined;
        }
        if (str.trim() === '') {
            return undefined;
        }
        try {
            return JSON.parse(str); // TODO validate if parsed value is of type T
        }
        catch (err) {
            if (err instanceof Error) {
                throw new Error(`"${str}" is not a json. Error: ${err.message}`);
            }
            throw err;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG8tanNvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb252ZXJ0LXN0cmF0ZWd5L3RvLWpzb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsTUFBTSxPQUFPLHFCQUFxQjtJQUNqQyxPQUFPLENBQUMsR0FBWTtRQUNuQixJQUFJLEdBQUcsS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUN2QixPQUFPLFNBQVMsQ0FBQTtRQUNqQixDQUFDO1FBQ0QsSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUM7WUFDdkIsT0FBTyxTQUFTLENBQUE7UUFDakIsQ0FBQztRQUNELElBQUksQ0FBQztZQUNKLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQU0sQ0FBQSxDQUFDLDZDQUE2QztRQUMxRSxDQUFDO1FBQUMsT0FBTyxHQUFZLEVBQUUsQ0FBQztZQUN2QixJQUFJLEdBQUcsWUFBWSxLQUFLLEVBQUUsQ0FBQztnQkFDMUIsTUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLEdBQUcsMkJBQTJCLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFBO1lBQ2pFLENBQUM7WUFDRCxNQUFNLEdBQUcsQ0FBQTtRQUNWLENBQUM7SUFDRixDQUFDO0NBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0eXBlIENvbnZlcnRTdHJhdGVneSB9IGZyb20gJyNzcmMvY29udmVydC1zdHJhdGVneSdcblxuZXhwb3J0IGNsYXNzIENvbnZlcnRTdHJhdGVneVRvSnNvbjxUPiBpbXBsZW1lbnRzIENvbnZlcnRTdHJhdGVneTxUPiB7XG5cdGNvbnZlcnQoc3RyPzogc3RyaW5nKTogVCB8IHVuZGVmaW5lZCB7XG5cdFx0aWYgKHN0ciA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRyZXR1cm4gdW5kZWZpbmVkXG5cdFx0fVxuXHRcdGlmIChzdHIudHJpbSgpID09PSAnJykge1xuXHRcdFx0cmV0dXJuIHVuZGVmaW5lZFxuXHRcdH1cblx0XHR0cnkge1xuXHRcdFx0cmV0dXJuIEpTT04ucGFyc2Uoc3RyKSBhcyBUIC8vIFRPRE8gdmFsaWRhdGUgaWYgcGFyc2VkIHZhbHVlIGlzIG9mIHR5cGUgVFxuXHRcdH0gY2F0Y2ggKGVycjogdW5rbm93bikge1xuXHRcdFx0aWYgKGVyciBpbnN0YW5jZW9mIEVycm9yKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihgXCIke3N0cn1cIiBpcyBub3QgYSBqc29uLiBFcnJvcjogJHtlcnIubWVzc2FnZX1gKVxuXHRcdFx0fVxuXHRcdFx0dGhyb3cgZXJyXG5cdFx0fVxuXHR9XG59XG4iXX0=