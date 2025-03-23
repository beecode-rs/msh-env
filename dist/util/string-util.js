export class StringUtil {
    toSnakeCase(str) {
        return (str &&
            //eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
            (str.trim().match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g) || [])
                .map((x) => x.toLowerCase())
                .join('_'));
    }
    toSnakeUpperCase(str) {
        return this.toSnakeCase(str).toUpperCase();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLXV0aWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbC9zdHJpbmctdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLE9BQU8sVUFBVTtJQUN0QixXQUFXLENBQUMsR0FBVztRQUN0QixPQUFPLENBQ04sR0FBRztZQUNILHVFQUF1RTtZQUN2RSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsb0VBQW9FLENBQUMsSUFBSSxFQUFFLENBQUM7aUJBQzVGLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO2lCQUMzQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQ1gsQ0FBQTtJQUNGLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxHQUFXO1FBQzNCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQUMzQyxDQUFDO0NBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgU3RyaW5nVXRpbCB7XG5cdHRvU25ha2VDYXNlKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0c3RyICYmXG5cdFx0XHQvL2VzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvcHJlZmVyLW51bGxpc2gtY29hbGVzY2luZ1xuXHRcdFx0KHN0ci50cmltKCkubWF0Y2goL1tBLVpdezIsfSg/PVtBLVpdW2Etel0rWzAtOV0qfFxcYil8W0EtWl0/W2Etel0rWzAtOV0qfFtBLVpdfFswLTldKy9nKSB8fCBbXSlcblx0XHRcdFx0Lm1hcCgoeCkgPT4geC50b0xvd2VyQ2FzZSgpKVxuXHRcdFx0XHQuam9pbignXycpXG5cdFx0KVxuXHR9XG5cblx0dG9TbmFrZVVwcGVyQ2FzZShzdHI6IHN0cmluZyk6IHN0cmluZyB7XG5cdFx0cmV0dXJuIHRoaXMudG9TbmFrZUNhc2Uoc3RyKS50b1VwcGVyQ2FzZSgpXG5cdH1cbn1cbiJdfQ==