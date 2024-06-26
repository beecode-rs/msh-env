export class ConvertStrategyToBoolean {
    convert(str) {
        if (str === undefined) {
            return undefined;
        }
        const strLower = str.toLowerCase();
        if (strLower === 'true') {
            return true;
        }
        else if (strLower === 'false') {
            return false;
        }
        return undefined;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG8tYm9vbGVhbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb252ZXJ0LXN0cmF0ZWd5L3RvLWJvb2xlYW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsTUFBTSxPQUFPLHdCQUF3QjtJQUNwQyxPQUFPLENBQUMsR0FBWTtRQUNuQixJQUFJLEdBQUcsS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUN2QixPQUFPLFNBQVMsQ0FBQTtRQUNqQixDQUFDO1FBQ0QsTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFBO1FBQ2xDLElBQUksUUFBUSxLQUFLLE1BQU0sRUFBRSxDQUFDO1lBQ3pCLE9BQU8sSUFBSSxDQUFBO1FBQ1osQ0FBQzthQUFNLElBQUksUUFBUSxLQUFLLE9BQU8sRUFBRSxDQUFDO1lBQ2pDLE9BQU8sS0FBSyxDQUFBO1FBQ2IsQ0FBQztRQUVELE9BQU8sU0FBUyxDQUFBO0lBQ2pCLENBQUM7Q0FDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnZlcnRTdHJhdGVneSB9IGZyb20gJyNzcmMvY29udmVydC1zdHJhdGVneSdcblxuZXhwb3J0IGNsYXNzIENvbnZlcnRTdHJhdGVneVRvQm9vbGVhbiBpbXBsZW1lbnRzIENvbnZlcnRTdHJhdGVneTxib29sZWFuPiB7XG5cdGNvbnZlcnQoc3RyPzogc3RyaW5nKTogYm9vbGVhbiB8IHVuZGVmaW5lZCB7XG5cdFx0aWYgKHN0ciA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRyZXR1cm4gdW5kZWZpbmVkXG5cdFx0fVxuXHRcdGNvbnN0IHN0ckxvd2VyID0gc3RyLnRvTG93ZXJDYXNlKClcblx0XHRpZiAoc3RyTG93ZXIgPT09ICd0cnVlJykge1xuXHRcdFx0cmV0dXJuIHRydWVcblx0XHR9IGVsc2UgaWYgKHN0ckxvd2VyID09PSAnZmFsc2UnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2Vcblx0XHR9XG5cblx0XHRyZXR1cm4gdW5kZWZpbmVkXG5cdH1cbn1cbiJdfQ==